import test from "japa";
import { UserRepositoryFake } from "./FakeClass/UserRepositoryFake";
import UserService from "App/Services/UserService";
import { ApiResponse } from "App/Utils/ApiResponses";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IUser } from "../app/Interfaces/UserInterfaces";
import { DateTime } from "luxon";

const service = new UserService(new UserRepositoryFake());

test.group("UserService TEST for getUserById", () => {
  test("class service must have a method getUserById with a return", async (assert) => {
    const result = service.getUserById(1);
    assert.isNotNull(result);
  });

  test("the method getUserById must be a promise", async (assert) => {
    const result = service.getUserById(1);
    assert.typeOf(result, "Promise");
  });

  test("the method getUserById must return a ApiResponse", async (assert) => {
    const result = await service.getUserById(1);
    assert.instanceOf(result, ApiResponse);
  });

  test("the method getUserById must return a WARN code, if user is not located ", async (assert) => {
    const result = await service.getUserById(2);
    assert.isTrue(result.operation.code === EResponseCodes.WARN);
  });

  test("the method getUserById must return a OK code ", async (assert) => {
    const result = await service.getUserById(1);
    assert.isTrue(result.operation.code === EResponseCodes.OK);
  });

  test("the method getUserById must return a instance of IUser", async (assert) => {
    const result = await service.getUserById(1);

    const expectedItems: IUser = {
      id: 0,
      names: "",
      lastNames: "",
      typeDocument: "",
      numberDocument: "",
      password: "",
      userModify: "",
      dateModify: DateTime.now(),
      userCreate: "",
      dateCreate: DateTime.now(),
      email: "",
    };

    assert.containsAllKeys(expectedItems, result.data || {});
  });
});

test.group("UserService TEST for createUser", () => {
  const user = {
    id: 1,
    names: "Jose",
    lastNames: "Paredes",
    typeDocument: "CC",
    numberDocument: "1234567890",
    password: "1234567890",
    userModify: "test",
    dateModify: DateTime.now(),
    userCreate: "test",
    dateCreate: DateTime.now(),
    email: "JoseParedes@example.com",
  };

  test("class service must have a method createUser with a return", async (assert) => {
    const result = service.createUser(user);
    assert.isNotNull(result);
  });

  test("the method createUser must be a promise", async (assert) => {
    const result = service.createUser(user);
    assert.typeOf(result, "Promise");
  });

  test("the method createUser must return a ApiResponse", async (assert) => {
    const result = await service.createUser(user);
    assert.instanceOf(result, ApiResponse);
  });

  test("the method createUser must return a Fail code if the email is already registered", async (assert) => {
    await service.createUser(user);
    const result = await service.createUser(user);
    assert.isFalse(result.operation.code === EResponseCodes.FAIL);
  });

  test("the method createUser must return a OK code ", async (assert) => {
    const result = await service.createUser(user);
    assert.isTrue(result.operation.code === EResponseCodes.OK);
  });

});
