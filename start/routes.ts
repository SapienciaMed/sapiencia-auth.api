/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return "Api de Autenticacion de SAPIENCIA";
});

// *************************************************************************
// ************************* RUOTES ROLES ***********************************
// *************************************************************************

Route.group(() => {
  Route.post("/get-paginated", "RoleController.getRolesPaginated");
  Route.delete("/delete/:id", "RoleController.deleteRole");
  Route.get("/get-by-id/:id", "RoleController.getRoleById");
  Route.post("/create", "RoleController.createRole");
  Route.put("/update/:id", "RoleController.updateRole");
}).prefix("/api/v1/role");
// .middleware("auth");

// *************************************************************************
// ************************* RUOTES USER ***********************************
// *************************************************************************

Route.group(() => {
  Route.get("/get-by-id/:id", "UserController.getUserById");
  Route.get("/search", "UserController.searchUser");
  Route.post("/create", "UserController.createUser");
  Route.put("/update/:id", "UserController.updateUser");
  Route.post("/changePassword","UserController.changePassword");
}).prefix("/api/v1/user")
 .middleware("auth");

// *************************************************************************
// ************************* RUOTES Profile ***********************************
// *************************************************************************

Route.group(() => {
  Route.post("/create", "UserController.createProfile");
  Route.put("/update/:id", "UserController.updateProfile");
})
  .prefix("/api/v1/profile")
  .middleware("auth");

// *************************************************************************
// ************************* RUOTES Auth ***********************************
// *************************************************************************

Route.group(() => {
  Route.post("/signin", "AuthController.signIn");
  Route.post("/refreshtoken", "AuthController.refreshToken");
  Route.post("/recoverypassword", "AuthController.emailRecoveryPassword");
  Route.post(
    "/validateTokenRecovery",
    "AuthController.validateTokenRecoveryPassword"
  );

  Route.post(
    "/changePasswordRecovery",
    "UserController.changePassword"
  ).middleware("recoveryPassword");

  Route.get(
    "/authorization/get-by-token/:token",
    "AuthController.getAuthorizationByToken"
  );
}).prefix("/api/v1/auth");
// .middleware("auth");

// *************************************************************************
// **************** RUOTES Access Elements *********************************
// *************************************************************************

Route.group(() => {
  Route.get("/aplication/get-all", "AccessElementsController.getAplications");
  Route.get("/menu-access/get-all", "AccessElementsController.getMenuAccess");
  Route.get(
    "/option/get-by-aplication/:id",
    "AccessElementsController.getOptionsByAplicationId"
  );
}).prefix("/api/v1/access-elements");
