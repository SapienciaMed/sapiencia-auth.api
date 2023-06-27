import test from "japa";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import RoleService from "App/Services/RoleService";
import { RoleRepositoryFake } from "./FakeClass/RoleRepositoryFake";
import { IRole, IRoleFilters } from "App/Interfaces/RoleInterfaces";
import { ApiResponse } from "App/Utils/ApiResponses";

const service = new RoleService(new RoleRepositoryFake());

test.group("RoleService TEST for getRolesPaginated", () => {
  const filter: IRoleFilters = {
    page: 1,
    perPage: 10,
    name: "Role",
    aplicationId: 1
  };

  test("class service must have a method getRolesPaginated with a return", async (assert) => {
    const result = service.getRolesPaginated(filter);
    assert.isNotNull(result);
  });

  test("the method getRolesPaginated must be a promise", async (assert) => {
    const result = service.getRolesPaginated(filter);
    assert.typeOf(result, "Promise");
  });

  test("the method getRolesPaginated must return a ApiResponse", async (assert) => {
    const result = await service.getRolesPaginated(filter);
    assert.instanceOf(result, ApiResponse);
  });

  test("the method getRolesPaginated must return a OK code ", async (assert) => {
    const result = await service.getRolesPaginated(filter);
    assert.isTrue(result.operation.code === EResponseCodes.OK);
  });

  test("the method getRolesPaginated must return a array", async (assert) => {
    const result = await service.getRolesPaginated(filter);

    assert.isArray(result.data.array);
  });

  test("the method getRolesPaginated must return a instance of IRole", async (assert) => {
    const result = await service.getRolesPaginated(filter);

    const expectedItems: IRole = {
      id: 0,
      name: "",
      description: "",
      aplicationId: 0,
    };

    assert.containsAllKeys(expectedItems, result.data.array[0] || {});
  });
});

test.group("RoleService TEST for getRoleById", () =>{
  const roleId = 1;
  test("class service must have a method getRoleById with a return", async (assert) => {
    const result = service.getRoleById(roleId);
    assert.isNotNull(result);
  });

  test("the method getRoleById must be a promise", async (assert) => {
    const result = service.getRoleById(roleId);
    assert.typeOf(result, "Promise");
  });

  test("the method getRoleById must return a ApiResponse", async (assert) => {
    const result = await service.getRoleById(roleId);
    assert.instanceOf(result, ApiResponse);
  });

  test("the method getRoleById must return a WARN code, if role is not located ", async (assert) => {
    const result = await service.getRoleById(2);
    assert.isTrue(result.operation.code === EResponseCodes.WARN);
  });

  test("the method getRoleById must return a OK code ", async (assert) => {
    const result = await service.getRoleById(roleId);
    assert.isTrue(result.operation.code === EResponseCodes.OK);
  });

  test("the method getRoleById must return a instance of IRole", async (assert) => {
    const result = await service.getRoleById(roleId);

    const expectedItems: IRole = {
      id: 0,
      name: "",
      description: "",
      aplicationId: 0,
    };

    assert.containsAllKeys(expectedItems, result.data || {});
  });
});

test.group("RoleService TEST for createRole", () =>{
  const roleFake: IRole = {
    "name": "Usuario swagger",
    "description": "Usuario creado desde swagger",
    "aplicationId": 1,
    "userCreate": "swagger",
    "actions": [
      {
        "id": 1,
        "optionId": 1,
        "name": "Consultar Roles",
        "order": 10,
        "indicator": "ROLES_CONSULTAR",
        "url": "/core/roles"
      },
      {
        "id": 2,
        "optionId": 1,
        "name": "Crear Rol",
        "order": 20,
        "indicator": "ROLES_CREAR",
        "url": "/core/roles/crear"
      }
    ]
  };

  test("the method createRole must be a promise", async (assert) => {
    const result = service.createRole(roleFake);
    assert.typeOf(result, "Promise");
  });

  test("the method createRole must return a ApiResponse", async (assert) => {
    const result = await service.createRole(roleFake);
    assert.instanceOf(result, ApiResponse);
  });

  test("the method createRole must return a OK code ", async (assert) => {
    const result = await service.createRole(roleFake);
    assert.isTrue(result.operation.code === EResponseCodes.OK);
  });

  test("the method createRole must return a instance of IRole", async (assert) => {
    const result = await service.createRole(roleFake);

    const expectedItems: IRole = {
      id: 0,
      name: "",
      description: "",
      aplicationId: 0,
    };

    assert.containsAllKeys(expectedItems, result.data || {});
  });
});

test.group("RoleService TEST for updateRole", () =>{
  const roleFakeEdit: IRole = {
    "name": "Usuario swagger",
    "description": "Usuario creado desde swagger",
    "aplicationId": 1,
    "userModify": "swagger",
    "actions": [
      {
        "id": 1,
        "optionId": 1,
        "name": "Consultar Roles",
        "order": 10,
        "indicator": "ROLES_CONSULTAR",
        "url": "/core/roles"
      },
      {
        "id": 2,
        "optionId": 1,
        "name": "Crear Rol",
        "order": 20,
        "indicator": "ROLES_CREAR",
        "url": "/core/roles/crear"
      }
    ]
  };

  test("the method updateRole must be a promise", async (assert) => {
    const result = service.updateRole(roleFakeEdit, 1);
    assert.typeOf(result, "Promise");
  });

  test("the method updateRole must return a ApiResponse", async (assert) => {
    const result = await service.updateRole(roleFakeEdit, 1);
    assert.instanceOf(result, ApiResponse);
  });

  test("the method updateRole must return a FAIL code, if role is not located ", async (assert) => {
    const result = await service.updateRole(roleFakeEdit, 999);
    assert.isTrue(result.operation.code === EResponseCodes.FAIL);
  });

  test("the method updateRole must return a OK code ", async (assert) => {
    const result = await service.updateRole(roleFakeEdit, 1);
    assert.isTrue(result.operation.code === EResponseCodes.OK);
  });

  test("the method updateRole must return a instance of IRole", async (assert) => {
    const result = await service.updateRole(roleFakeEdit, 1);

    const expectedItems: IRole = {
      id: 0,
      name: "",
      description: "",
      aplicationId: 0,
    };

    assert.containsAllKeys(expectedItems, result.data || {});
  });
});

test.group("RoleService TEST for deleteRole", () =>{
  const roleId = 1;

  test("the method deleteRole must be a promise", async (assert) => {
    const result = service.deleteRole(roleId);
    assert.typeOf(result, "Promise");
  });

  test("the method deleteRole must return a ApiResponse", async (assert) => {
    const result = await service.deleteRole(roleId);
    assert.instanceOf(result, ApiResponse);
  });

  test("the method deleteRole must return a FAIL code, if role is not located ", async (assert) => {
    const result = await service.deleteRole(999);
    assert.isTrue(result.operation.code === EResponseCodes.FAIL);
  });

  test("the method deleteRole must return a OK code ", async (assert) => {
    const result = await service.deleteRole(roleId);
    assert.isTrue(result.operation.code === EResponseCodes.OK);
  });
});