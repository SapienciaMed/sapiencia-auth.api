import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import User from "App/Models/User";
import { DateTime } from "luxon";
import Profile from "App/Models/Profile";
import RoleProfile from "App/Models/RoleProfile";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await User.createMany([
      {
        id: 1,
        names: "Usuario",
        lastNames: "Prueba",
        typeDocument: "CC",
        numberDocument: "797940",
        password: "",
        userModify: "",
        dateModify: DateTime.now(),
        userCreate: "",
        dateCreate: DateTime.now(),
      },
    ]);

    await Profile.createMany([
      {
        id: 1,
        aplicationId: 1,
        userId: 1,
        dateValidity: new Date(Date.now()),
        dateCreate: DateTime.now(),
        userCreate: "",
      },
    ]);

    await RoleProfile.createMany([
      {
        id: 1,
        profileId: 1,
        roleId: 1,
      },
    ]);
  }
}
