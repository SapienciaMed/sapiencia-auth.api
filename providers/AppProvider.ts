import type { ApplicationContract } from "@ioc:Adonis/Core/Application";

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public async register() {
    // Register your own bindings

    /**************************************************************************/
    /******************************** SERVICES ********************************/
    /**************************************************************************/
    const UserService = await import("App/Services/UserService");
    const RoleService = await import("App/Services/RoleService");
    const AuthService = await import("App/Services/AuthService");
    const AccessElementService = await import(
      "App/Services/AccessElementService"
    );

    /**************************************************************************/
    /************************ EXTERNAL SERVICES ********************************/
    /**************************************************************************/

    /**************************************************************************/
    /******************************** REPOSITORIES ****************************/
    /**************************************************************************/

    const UserRepository = await import("App/Repositories/UserRepository");
    const RoleRepository = await import("App/Repositories/RoleRepository");
    const AplicationRepository = await import(
      "App/Repositories/AplicationRepository"
    );
    const MenuAccessRepository = await import(
      "App/Repositories/MenuAccessRepository"
    );
    const OptionRepository = await import("App/Repositories/OptionRepository");

    /**************************************************************************/
    /******************************** CORE  ***********************************/
    /**************************************************************************/

    this.app.container.singleton(
      "core.UserProvider",
      () => new UserService.default(new UserRepository.default())
    );

    this.app.container.singleton(
      "core.RoleProvider",
      () => new RoleService.default(new RoleRepository.default())
    );

    this.app.container.singleton(
      "core.AuthProvider",
      () => new AuthService.default(new UserRepository.default())
    );

    this.app.container.singleton(
      "core.AccessElementProvider",
      () =>
        new AccessElementService.default(
          new AplicationRepository.default(),
          new OptionRepository.default(),
          new MenuAccessRepository.default()
        )
    );
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
