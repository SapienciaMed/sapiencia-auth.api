import test from "japa";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import RoleService from "App/Services/RoleService";
import { RoleRepositoryFake } from "./FakeClass/RoleRepositoryFake";
import { IRole, IRoleFilters } from "App/Interfaces/RoleInterfaces";
import { ApiResponse } from "App/Utils/ApiResponses";

const service = new RoleService(new RoleRepositoryFake());

test.group("RolService TEST for getRolesPaginated", () => {
  const filter: IRoleFilters = {
    page: 1,
    perPage: 10,
    name: "Role",
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

    assert.isArray(result.data);
  });

  test("the method getRolesPaginated must return a instance of IRole", async (assert) => {
    const result = await service.getRolesPaginated(filter);

    const expectedItems: IRole = {
      id: 0,
      name: "",
      description: "",
      aplicationId: 0,
    };

    assert.containsAllKeys(expectedItems, result.data[0] || {});
  });
});
