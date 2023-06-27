import test from "japa";
import AuthService from "App/Services/AuthService";
import { UserRepositoryFake } from "./FakeClass/UserRepositoryFake";
import { ApiResponse } from "App/Utils/ApiResponses";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";

const service = new AuthService(new UserRepositoryFake());

test.group("AuthService TEST for SignIn", () => {
  test("the method signIn must return a WARN code, if number document is incorrect", async (assert) => {
    const result = await service.signIn({
      numberDocument: "121323",
      password: "1234567890",
    });

    assert.isTrue(result.operation.code === EResponseCodes.WARN);
  });

  test("the method signIn must return a WARN code, if password is incorrect", async (assert) => {
    const result = await service.signIn({
      numberDocument: "1234567890",
      password: "232323",
    });

    assert.isTrue(result.operation.code === EResponseCodes.WARN);
  });

  test("the method signIn must return a OK code, if credentials is correct", async (assert) => {
    const result = await service.signIn({
      numberDocument: "1234567890",
      password: "123qwerty",
    });

    assert.isTrue(result.operation.code === EResponseCodes.OK);
  });

  test("the method signIn must return a ApiResponse", async (assert) => {
    const result = await service.signIn({
      numberDocument: "121323",
      password: "1234567890",
    });

    assert.instanceOf(result, ApiResponse);
  });
});

// test.group("AuthService TEST for getAuthorizationByToken", () => {
//   test("the method getAuthorizationByToken must return a FAIL code, if token is invalid", async (assert) => {
//     const result = await service.getAuthorizationByToken(
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg3ODaaaAxMDA0LCJleHAiOjE2ODc4MDQ2MDR9.glHVSCump23xfaFqWWdp_BCFwZHbhKHBNpU1oJGxifc"
//     );

//     assert.isTrue(result.operation.code === EResponseCodes.FAIL);
//   });

//   test("the method getAuthorizationByToken must return a WARN code, if token is valid but user no exist", async (assert) => {
//     const result = await service.getAuthorizationByToken(
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg3ODaaaAxMDA0LCJleHAiOjE2ODc4MDQ2MDR9.glHVSCump23xfaFqWWdp_BCFwZHbhKHBNpU1oJGxifc"
//     );

//     assert.isTrue(result.operation.code === EResponseCodes.WARN);
//   });

//   test("the method getAuthorizationByToken must return a OK code, if token is valid and user exist", async (assert) => {
//     const result = await service.getAuthorizationByToken(
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg3ODkxMjUwLCJleHAiOjE2ODc4OTQ4NTB9.0ANVb5LDwgIWMvRv2T2GRMSkmUryd7diXGl7xQJLWDc"
//     );

//     assert.isTrue(result.operation.code === EResponseCodes.OK);
//   });

//   test("the method getAuthorizationByToken must return a ApiResponse", async (assert) => {
//     const result = await service.getAuthorizationByToken(
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg3ODaaaAxMDA0LCJleHAiOjE2ODc4MDQ2MDR9.glHVSCump23xfaFqWWdp_BCFwZHbhKHBNpU1oJGxifc"
//     );

//     assert.instanceOf(result, ApiResponse);
//   });
// });

test.group("AuthService TEST for emailRecoveryPassword", () => {
  test("the method emailRecoveryPassword must return a WARN code, if number document is incorrect", async (assert) => {
    const result = await service.emailRecoveryPassword({
      numberDocument: "4754754",
      email: "jmbetancur@i4digital.com",
    });

    assert.isTrue(result.operation.code === EResponseCodes.WARN);
  });

  test("the method emailRecoveryPassword must return a WARN code, if email is incorrect", async (assert) => {
    const result = await service.emailRecoveryPassword({
      numberDocument: "1234567890",
      email: "jmbetancurrtrr@i4digital.com",
    });

    assert.isTrue(result.operation.code === EResponseCodes.WARN);
  });

  test("the method emailRecoveryPassword must return a OK code and send email, if credentials is valid", async (assert) => {
    const result = await service.emailRecoveryPassword({
      numberDocument: "1234567890",
      email: "jmbetancur@i4digital.com",
    });

    assert.isTrue(result.operation.code === EResponseCodes.OK);
  });

  test("the method emailRecoveryPassword must return a ApiResponse", async (assert) => {
    const result = await service.emailRecoveryPassword({
      numberDocument: "12345t467890",
      email: "jmbetancur@i4digital.com",
    });

    assert.instanceOf(result, ApiResponse);
  });
});
