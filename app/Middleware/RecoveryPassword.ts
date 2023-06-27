import jwt from "jsonwebtoken";

import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import Env from "@ioc:Adonis/Core/Env";

import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";

import { IDecodedToken } from "App/Interfaces/AuthInterfaces";

export default class RecoveryPassword {
  public async handle(
    { request, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    try {
      const { tokenRecovery } = request.only(["tokenRecovery"]);

      if (!tokenRecovery) {
        return response.forbidden(
          new ApiResponse(
            null,
            EResponseCodes.FAIL,
            "No existe el token de seguridad para cambiar contraseña"
          )
        );
      }

      const { id } = jwt.verify(
        tokenRecovery,
        Env.get("SECRET_RECOVERY")
      ) as IDecodedToken;

      request["idUser"] = id;

      await next();
    } catch (error) {
      return response.forbidden(
        new ApiResponse(null, EResponseCodes.FAIL, String(error))
      );
    }
  }
}

// import jwt from "jsonwebtoken";
// import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
// import { DomainCodes } from "App/Constants/DomainCodes";
// import EncryptionAES from "App/Utils/EncryptionAES";
// import ApiResponse from "../../contracts/globlas/ApiResponse";
// import { IAuthUser } from "Contracts/interfaces/models/IUser";

// export default class Auth {
//   public async handle(
//     ctx: HttpContextContract,
//     next: () => Promise<void>,
//     guards: string[]
//   ) {
//     const { authorization, dataaccess } = ctx.request.headers();
//     const key = process.env.APP_KEY?.toString() || "";
//     let user: IAuthUser | null;

//     try {
//       user = authorization
//         ? (jwt.verify(authorization.replace("Bearer ", ""), key) as IAuthUser)
//         : null;

//       if (!user || !user.id) {
//         return ctx.response
//           .status(401)
//           .send(
//             new ApiResponse(
//               null,
//               DomainCodes.BUSINESS,
//               "Usuario no autenticado"
//             )
//           );
//       }

//       process.env.APP_AUTH = authorization;
//       process.env.APP_AUTH_ACCESS = String(dataaccess);

//       if (ctx.params) {
//         ctx.request.updateParams({ ...ctx.params, authUser: user });
//       } else ctx.request.updateParams({ authUser: user });

//       if (guards.length > 0) {
//         const encryption = new EncryptionAES(process.env.APP_KEY || "");
//         const access: Array<string> | null = dataaccess
//           ? JSON.parse(
//               encryption.DecryptAES(
//                 dataaccess.toString(),
//                 authorization?.split(".")[2]
//               )
//             )
//           : null;
//         if (!access?.find((i) => i === guards.find((g) => g === i))) {
//           return ctx.response
//             .status(403)
//             .send(
//               new ApiResponse(
//                 null,
//                 DomainCodes.BUSINESS,
//                 "Acceso no autorizado"
//               )
//             );
//         }
//       }
//     } catch (error) {
//       return ctx.response
//         .status(401)
//         .send(new ApiResponse(null, DomainCodes.FAIL, "Token no valido!"));
//     }

//     await next();
//   }
// }
