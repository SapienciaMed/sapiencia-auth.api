import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IChangePassword, IUser } from "App/Interfaces/UserInterfaces";
import IUserRepository from "App/Repositories/UserRepository";
import { ApiResponse } from "App/Utils/ApiResponses";
import { IUserFilters } from "App/Interfaces/FilterInterfaces";
import { IPagingData } from "App/Utils/ApiResponses";

export interface IUserService {
  getUserById(id: number): Promise<ApiResponse<IUser | null>>;
  createUser(user: IUser): Promise<ApiResponse<IUser>>;
  updateUser(user: IUser, id: number): Promise<ApiResponse<IUser>>;
  changePassword(
    passwords: IChangePassword,
    id: number
  ): Promise<ApiResponse<IUser>>;
  searchUser(elementsFilter: IUserFilters): Promise<ApiResponse<IPagingData<IUser | null>>>;
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

  async searchUser(filter: IUserFilters): Promise<ApiResponse<IPagingData<IUser | null>>> {
    const res = await this.userRepository.searchUser(filter);
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

  async changePassword(
    passwords: IChangePassword,
    id: number
  ): Promise<ApiResponse<IUser>> {
    const { password, confirmPassword } = passwords;

    if (password !== confirmPassword) {
      return new ApiResponse(
        {} as IUser,
        EResponseCodes.FAIL,
        "Las contraseñas no son identicas"
      );
    }

    const res = await this.userRepository.changePasswordUser(password, id);

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
