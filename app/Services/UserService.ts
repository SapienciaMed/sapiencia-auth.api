import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IUser } from "App/Interfaces/UserInterfaces";
import IUserRepository from "App/Repositories/UserRepository";
import { ApiResponse } from "App/Utils/ApiResponses";

export interface IUserService {
  getUserById(id: number): Promise<ApiResponse<IUser | null>>;
  createUser(user: IUser): Promise<ApiResponse<IUser>>;
  updateUser(user: IUser, id: number): Promise<ApiResponse<IUser>>;
}

export default class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  async getUserById(id: number): Promise<ApiResponse<IUser | null>> {
    const res = await this.userRepository.getUserById(id);
    if (!res) {
      return new ApiResponse(res, EResponseCodes.WARN, "Recurso no encontrado");
    } else {
      return new ApiResponse(res, EResponseCodes.OK);
    }
  }

  async createUser(user: IUser): Promise<ApiResponse<IUser>> {
    const res = await this.userRepository.createUser(user);
    return new ApiResponse(res, EResponseCodes.OK);
  }

  async updateUser(user: IUser, id: number): Promise<ApiResponse<IUser>> {
    const res = await this.userRepository.updateUser(user, id);

    if (!res) {
      return new ApiResponse(
        {} as IUser,
        EResponseCodes.FAIL,
        "El registro indicado no existe"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }
}
