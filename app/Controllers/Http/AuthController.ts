import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import AuthProvider from "@ioc:core.AuthProvider";

import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";

import AuthValidator from "App/Validators/AuthValidator";
import RecoveryPaswordValidator from "App/Validators/RecoveryPaswordValidator";
import TokenValidator from "App/Validators/TokenValidator";

export default class AuthController {
  public async signIn({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate(AuthValidator);
      return response.send(await AuthProvider.signIn(data));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async refreshToken({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate(TokenValidator);
      return response.send(await AuthProvider.refreshToken(data));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getAuthorizationByToken({
    request,
    response,
  }: HttpContextContract) {
    try {
      const { token } = request.params();
      return response.send(await AuthProvider.getAuthorizationByToken(token));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async emailRecoveryPassword({
    request,
    response,
  }: HttpContextContract) {
    try {
      const data = await request.validate(RecoveryPaswordValidator);
      return response.send(await AuthProvider.emailRecoveryPassword(data));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async validateTokenRecoveryPassword({
    request,
    response,
  }: HttpContextContract) {
    try {
      const data = await request.validate(TokenValidator);
      return response.send(
        await AuthProvider.validateTokenRecoveryPassword(data)
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }
}
