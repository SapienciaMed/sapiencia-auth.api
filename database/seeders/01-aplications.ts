import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Aplication from "App/Models/Aplication";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Aplication.createMany([
      {
        id: 1,
        name: "General",
        showInHome: false,
        url: "core",
        order: 0,
      },
      {
        id: 2,
        name: "Fondos",
        showInHome: true,
        url: "/fondos",
        order: 10,
      },
      {
        id: 3,
        name: "Gestion Financiera",
        showInHome: true,
        url: "/financiera",
        order: 20,
      },
    ]);
  }
}
