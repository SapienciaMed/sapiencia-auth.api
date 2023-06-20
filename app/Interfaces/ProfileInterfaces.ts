import { DateTime } from "luxon";
import { IRole } from "./RoleInterfaces";

export interface IProfile {
  id?: number;
  userId: number;
  aplicationId: number;
  dateValidity: Date;
  userModify?: number;
  modifyDate?: Date;
  userCreate?: string;
  dateCreate?: DateTime;

  roles?: IRole[];
}
