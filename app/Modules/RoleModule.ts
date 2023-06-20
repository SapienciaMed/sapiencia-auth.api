declare module "@ioc:core.RoleProvider" {
  import { IRoleService } from "App/Services/RoleService";

  const RoleProvider: IRoleService;
  export default RoleProvider;
}
