import { DateTime } from "luxon";

export interface IUserFilters {
  numberDocument?: number;
  email?: string;
  names?: string;
  lastNames?: string;
  page: number;
  perPage: number;  
  dateCreate?: DateTime;
}
