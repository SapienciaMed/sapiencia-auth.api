import { DateTime } from "luxon";
import { IActions } from "./OptionInterface";

export interface IRole {
  id?: number;
  name: string;
  description: string;
  aplicationId: number;
  userModify?: string;
  dateModify?: Date;
  userCreate?: string;
  dateCreate?: DateTime;

  actions?: IActions[];
}

export interface IRoleFilters {
  page: number;
  perPage: number;
  name?: string;
  aplicationId: number;
}
