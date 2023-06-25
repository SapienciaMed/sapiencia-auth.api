import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import RoleProvider from "@ioc:core.RoleProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IRoleFilters } from "App/Interfaces/RoleInterfaces";
import { ApiResponse } from "App/Utils/ApiResponses";
import RoleValidator from "App/Validators/RoleValidator";

export default class RoleController {
  public async getRolesPaginated({ request, response }: HttpContextContract) {
    try {
      const data = request.body() as IRoleFilters;
      return response.send(await RoleProvider.getRolesPaginated(data));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getRoleById({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params();
      return response.send(await RoleProvider.getRoleById(id));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async deleteRole({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params();
      return response.send(await RoleProvider.deleteRole(id));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async updateRole({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params();
      const data = await request.validate(RoleValidator);
      return response.send(await RoleProvider.updateRole(data, id));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async createRole({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate(RoleValidator);
      return response.send(await RoleProvider.createRole(data));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }
}
