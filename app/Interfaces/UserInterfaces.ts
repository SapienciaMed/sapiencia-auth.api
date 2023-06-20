import { DateTime } from "luxon";
import { IProfile } from "./ProfileInterfaces";

export interface IUser {
  id?: number;
  names: string;
  lastNames: string;
  typeDocument: string;
  numberDocument: string;
  email: string;
  password?: string;
  userModify: string;
  dateModify?: DateTime;
  userCreate: string;
  dateCreate?: DateTime;

  profiles?: IProfile[];
}
