import { IMenuAccess } from "App/Interfaces/MenuAccessInterface";
import MenuAccess from "App/Models/MenuAccess";

export interface IMenuAccessRepository {
  getMenuAccess(): Promise<IMenuAccess[]>;
}

export default class MenuAccessRepository implements IMenuAccessRepository {
  constructor() {}

  async getMenuAccess(): Promise<IMenuAccess[]> {
    const res = await MenuAccess.query();

    return res.map((i) => i.serialize() as IMenuAccess);
  }
}
