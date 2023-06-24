import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IActions } from "App/Interfaces/OptionInterface";
import { IRole, IRoleFilters } from "App/Interfaces/RoleInterfaces";
import { IRoleRepository } from "App/Repositories/RoleRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";

export interface IRoleService {
  createRole(role: IRole): Promise<ApiResponse<IRole>>;
  updateRole(role: IRole, id: number): Promise<ApiResponse<IRole>>;
  deleteRole(id: number): Promise<ApiResponse<boolean>>;
  getRoleById(id: number): Promise<ApiResponse<IRole>>;
  getRolesPaginated(
    filters: IRoleFilters
  ): Promise<ApiResponse<IPagingData<IRole>>>;
}

export default class RoleService implements IRoleService {
  constructor(private roleRepository: IRoleRepository) {}

  async getRoleById(id: number): Promise<ApiResponse<IRole>> {
    const res = await this.roleRepository.getRoleById(id);

    if (!res) {
      return new ApiResponse(
        {} as IRole,
        EResponseCodes.WARN,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getRolesPaginated(
    filters: IRoleFilters
  ): Promise<ApiResponse<IPagingData<IRole>>> {
    const res = await this.roleRepository.getRolePaginated(filters);

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async createRole(role: IRole): Promise<ApiResponse<IRole>> {
    const res = await this.roleRepository.createRole(role);
    return new ApiResponse(res, EResponseCodes.OK);
  }

  async updateRole(role: IRole, id: number): Promise<ApiResponse<IRole>> {
    const res = await this.roleRepository.updateRole(role, id);

    if (!res) {
      return new ApiResponse(
        {} as IRole,
        EResponseCodes.FAIL,
        "El registro indicado no existe"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async deleteRole(id: number): Promise<ApiResponse<boolean>> {
    const res = await this.roleRepository.deleteRole(id);

    if (!res) {
      return new ApiResponse(
        false,
        EResponseCodes.FAIL,
        "El registro indicado no existe"
      );
    }

    return new ApiResponse(true, EResponseCodes.OK);
  }
}
