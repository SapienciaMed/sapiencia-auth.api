import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import AccessElementProvider from "@ioc:core.AccessElementProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";


export default class AccessElementsController {
  public async getAplications({ response }: HttpContextContract) {
    try {
      return response.send(await AccessElementProvider.getAplications());
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getMenuAccess({ response }: HttpContextContract) {
    try {
      return response.send(await AccessElementProvider.getMenuAccess());
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getOptionsByAplicationId({
    request,
    response,
  }: HttpContextContract) {
    try {
      const { id } = request.params();
      return response.send(
        await AccessElementProvider.getOptionsByAplicationId(id)
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }
}
