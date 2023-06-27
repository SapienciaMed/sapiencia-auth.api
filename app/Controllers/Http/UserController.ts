import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import UserProvider from "@ioc:core.UserProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";

import ChangePasswordValidator from "App/Validators/ChangePasswordValidator";
import UserValidator from "App/Validators/UserValidator";

export default class UserController {
  public async getUserById({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params();
      return response.send(await UserProvider.getUserById(id));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async createUser({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate(UserValidator);

      console.log(request["idUser"]);

      return response.send(await UserProvider.createUser(data));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async updateUser({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params();

      const data = await request.validate(UserValidator);

      return response.send(await UserProvider.updateUser(data, id));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async changePassword({ request, response }: HttpContextContract) {
    try {
      
      const data = await request.validate(ChangePasswordValidator);
      const id = request["idUser"];
      return response.send(await UserProvider.changePassword(data, id));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }
}
