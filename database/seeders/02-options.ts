import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Option from "App/Models/Option";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Option.createMany([
      {
        id: 1,
        aplicationId: 1,
        name: "Roles",
        order: 10,
      },
    ]);
  }
}
