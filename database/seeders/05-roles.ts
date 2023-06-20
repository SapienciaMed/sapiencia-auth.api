import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Role from "App/Models/Role";
import RoleAction from "App/Models/RoleAction";
import { DateTime } from "luxon";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Role.createMany([
      {
        id: 1,
        name: "Administrador",
        aplicationId: 1,
        description: "Administador del sistema",
        userCreate: "Default",
        dateCreate: DateTime.now(),
      },
    ]);

    await RoleAction.createMany([
      {
        id: 1,
        actionId: 1,
        roleId: 1,
      },
      {
        id: 2,
        actionId: 2,
        roleId: 1,
      },
      {
        id: 3,
        actionId: 3,
        roleId: 1,
      },
      {
        id: 4,
        actionId: 4,
        roleId: 1,
      },
    ]);
  }
}
