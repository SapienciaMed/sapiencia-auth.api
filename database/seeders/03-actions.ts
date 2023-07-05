import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Action from "App/Models/Action";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Action.createMany([
      {
        id: 1,
        optionId: 1,
        name: "Consultar Roles",
        indicator: "ROLES_CONSULTAR",
        order: 10,
      },
      {
        id: 2,
        optionId: 1,
        name: "Crear Rol",
        indicator: "ROLES_CREAR",
        order: 20,
      },
      {
        id: 3,
        optionId: 1,
        name: "Consultar Roles",
        indicator: "ROLES_EDITAR",
        order: 30,
      },
      {
        id: 4,
        optionId: 1,
        name: "Consultar Roles",
        indicator: "ROLES_ELIMINAR",
        order: 40,
      },
    ]);
  }
}
