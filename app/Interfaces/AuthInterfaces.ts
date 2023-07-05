import { IUser } from "./UserInterfaces";

export interface IUserPermissions {
  actions: string[];
  urls: string[];
}

export interface IRequestSignIn {
  numberDocument: string;
  password: string;
}

export interface IResponseSignIn {
  authorization: IAuthorization;
  token: string;
}

export interface IRequestToken {
  token: string;
}

export interface IResponseRefreshToken {
  numberDocument: string;
  accessToken: string;
}

export interface IDecodedToken {
  id: number;
}

export interface IAuthorization {
  user: IUser;
  allowedActions: Array<string>;
  allowedUrls: Array<string>;
  allowedApplications: Array<{
    aplicationId: number;
    dateValidity: Date;
  }>;
  encryptedAccess: string;
}

export interface IRequestRecoveryPassword {
  numberDocument: string;
  email: string;
}
