import jwt from "jsonwebtoken";

import Env from "@ioc:Adonis/Core/Env";
import Hash from "@ioc:Adonis/Core/Hash";
import Mail from "@ioc:Adonis/Addons/Mail";

import IUserRepository from "App/Repositories/UserRepository";

import { ApiResponse } from "App/Utils/ApiResponses";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";

import {
  IRequestSignIn,
  IResponseSignIn,
  IRequestToken,
  IResponseRefreshToken,
  IDecodedToken,
  IAuthorization,
  IRequestRecoveryPassword,
} from "App/Interfaces/AuthInterfaces";

export interface IAuthService {
  signIn(
    signInData: IRequestSignIn
  ): Promise<ApiResponse<IResponseSignIn | null>>;
  refreshToken(
    dataRefreshToken: IRequestToken
  ): Promise<ApiResponse<IResponseRefreshToken | null>>;
  generateTokens(
    payload: object,
    secretKey: string,
    expires: string
  ): Promise<string>;
  getAuthorizationByToken(
    token: string
  ): Promise<ApiResponse<IAuthorization | null>>;
  emailRecoveryPassword(
    recoveryPasswordData: IRequestRecoveryPassword
  ): Promise<ApiResponse<boolean | null>>;
  validateTokenRecoveryPassword(
    dataTokenRecovery: IRequestToken
  ): Promise<ApiResponse<IDecodedToken>>;
}

export default class AuthService implements IAuthService {
  constructor(private userRepository: IUserRepository) {}

  async signIn(
    signInData: IRequestSignIn
  ): Promise<ApiResponse<IResponseSignIn | null>> {
    const { numberDocument, password } = signInData;

    const user = await this.userRepository.getUserByNumberDocument(
      numberDocument
    );

    if (!user?.id) {
      return new ApiResponse(null, EResponseCodes.WARN, "Usuario no existe");
    }

    const verifyPasswords = await Hash.verify(user?.password || "", password);

    if (!verifyPasswords) {
      return new ApiResponse(
        null,
        EResponseCodes.WARN,
        "Credenciales invalidas"
      );
    }

    const allowedActions = await this.userRepository.getUserAllowedActions(
      user.id
    );

    const allowedApplications =
      user.profiles?.map((i) => {
        return {
          aplicationId: i.aplicationId,
          dateValidity: i.dateValidity,
        };
      }) || [];

    delete user.profiles;
    delete user.password;

    const token = await this.generateTokens({
      id: user.id,
    });

    const auth: IResponseSignIn = {
      authorization: {
        allowedActions,
        allowedApplications,
        encryptedAccess: "",
        user,
      },
      token,
    };

    return new ApiResponse(auth, EResponseCodes.OK);
  }

  async refreshToken(
    dataRefreshToken: IRequestToken
  ): Promise<ApiResponse<IResponseRefreshToken | null>> {
    const { token: refreshToken } = dataRefreshToken;

    const { id } = jwt.verify(
      refreshToken,
      Env.get("SECRET_REFRESH")
    ) as IDecodedToken;

    const user = await this.userRepository.getUserById(id);

    if (!user) {
      return new ApiResponse(null, EResponseCodes.WARN, "Usuario no existe");
    }

    const accessToken = await this.generateTokens({
      id: user.id,
    });

    const responseRefreshToken: IResponseRefreshToken = {
      numberDocument: user.numberDocument,
      accessToken,
    };

    return new ApiResponse(responseRefreshToken, EResponseCodes.OK);
  }

  async generateTokens(payload: object): Promise<string> {
    const secretKey = Env.get("APP_KEY");
    const expires = Env.get("TOKEN_LIFETIME");
    const token = jwt.sign(payload, secretKey, { expiresIn: expires });

    return token;
  }

  async getAuthorizationByToken(
    token: string
  ): Promise<ApiResponse<IAuthorization | null>> {
    console.log(token);

    const { id } = jwt.verify(token, Env.get("APP_KEY")) as IDecodedToken;

    const user = await this.userRepository.getUserById(id);

    if (!user?.id) {
      return new ApiResponse(null, EResponseCodes.WARN, "Usuario no existe");
    }

    const allowedActions = await this.userRepository.getUserAllowedActions(
      user.id
    );

    const allowedApplications =
      user.profiles?.map((i) => {
        return {
          aplicationId: i.aplicationId,
          dateValidity: i.dateValidity,
        };
      }) || [];

    delete user.profiles;

    const toSend: IAuthorization = {
      allowedActions,
      allowedApplications,
      encryptedAccess: "",
      user,
    };

    return new ApiResponse(toSend, EResponseCodes.OK);
  }

  async emailRecoveryPassword(
    recoveryPasswordData: IRequestRecoveryPassword
  ): Promise<ApiResponse<boolean | null>> {
    const { numberDocument, email } = recoveryPasswordData;

    const user = await this.userRepository.getUserByNumberDocument(
      numberDocument
    );

    if (!user) {
      return new ApiResponse(
        null,
        EResponseCodes.WARN,
        "El documento de identidad no se encuentra registrada en el sistema"
      );
    }

    if (user.email !== email) {
      return new ApiResponse(
        null,
        EResponseCodes.WARN,
        "Su correo no coincide con el registrado en el sistema"
      );
    }

    const token = jwt.sign({ id: user.id }, Env.get("SECRET_RECOVERY"), {
      expiresIn: Env.get("TOKEN_RECOVERY_LIFETIME"),
    });

    await Mail.send((message) => {
      message
        .from("sapiencia@example.com")
        .to(user.email)
        .subject("Recupera tu contraseña")
        .html(
          `<h1>Has solicitado tu recuperación de contraseña, presiona el link para recuperarla recuerda que solo tienes 15 minutos para hacerlo <a href="http://localhost:9000/change-password?token=${token}" target="_blank">Recuperar contrasena</a></h1> `
        );
    });

    return new ApiResponse(true, EResponseCodes.OK);
  }

  async validateTokenRecoveryPassword(
    dataTokenRecovery: IRequestToken
  ): Promise<ApiResponse<IDecodedToken>> {
    const { token: tokenRecoveryPassword } = dataTokenRecovery;

    const { id } = jwt.verify(
      tokenRecoveryPassword,
      Env.get("SECRET_RECOVERY")
    ) as IDecodedToken;

    return new ApiResponse({ id } as IDecodedToken, EResponseCodes.OK);
  }
}
