import { IAplication } from "App/Interfaces/AplicationInterface";
import Aplication from "App/Models/Aplication";

export interface IAplicationRepository {
  getAplications(): Promise<IAplication[]>;
}

export default class AplicationRepository implements IAplicationRepository {
  constructor() {}

  async getAplications(): Promise<IAplication[]> {
    const res = await Aplication.query();

    return res.map((i) => i.serialize() as IAplication);
  }
}
