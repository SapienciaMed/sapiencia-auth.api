declare module "@ioc:core.AccessElementProvider" {
  import { IAccessElementService } from "App/Services/AccessElementService";

  const AccessElementProvider: IAccessElementService;
  export default AccessElementProvider;
}
