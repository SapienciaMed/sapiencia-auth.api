import { IOption } from "App/Interfaces/OptionInterface";
import Option from "App/Models/Option";

export interface IOptionRepository {
  getOptionsByAplicationId(aplicacionId: number): Promise<IOption[]>;
}

export default class OptionRepository implements IOptionRepository {
  constructor() {}

  async getOptionsByAplicationId(aplicacionId: number): Promise<IOption[]> {
    const res = await Option.query()
      .preload("actions")
      .where("aplicationId", aplicacionId);

    return res.map((i) => i.serialize() as IOption);
  }
}
