import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import MenuAccess from "App/Models/MenuAccess";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await MenuAccess.createMany([
      {
        id: 1,
        name: "Administración",
        topMenuAccessId: null,
        order: 1,
        url: null,
        actionIndicator: null,
        aplicationId: 1,
      },
      {
        id: 2,
        name: "Roles",
        topMenuAccessId: 1,
        order: 10,
        url: "/core/roles",
        actionIndicator: "ROLES_CONSULTAR",
        aplicationId: 1,
      },
    ]);
  }
}
