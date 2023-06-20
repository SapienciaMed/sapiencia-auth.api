declare module "@ioc:core.UserProvider" {
    import { IUserService } from "App/Services/UserService";
  
    const UserProvider: IUserService;
    export default UserProvider;
  }
  