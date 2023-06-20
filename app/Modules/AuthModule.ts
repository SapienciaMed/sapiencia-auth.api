declare module "@ioc:core.AuthProvider" {
  import { IAuthService } from "App/Services/AuthService";

  const AuthProvider: IAuthService;
  export default AuthProvider;
}
