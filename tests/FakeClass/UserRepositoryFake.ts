import { IUser } from "App/Interfaces/UserInterfaces";
import { IUserRepository } from "App/Repositories/UserRepository";
import { DateTime } from "luxon";

const userFake: IUser = {
  id: 1,
  names: "Jose",
  lastNames: "Paredes",
  typeDocument: "CC",
  numberDocument: "1234567890",
  password: "",
  userModify: "",
  dateModify: DateTime.now(),
  userCreate: "",
  dateCreate: DateTime.now(),
};

export class UserRepositoryFake implements IUserRepository {
  getUserAllowedActions(_userId: number): Promise<string[]> {
    return new Promise((res) => {
      res([]);
    });
  }

  createUser(_user: IUser): Promise<IUser> {
    return new Promise((res) => {
      res(userFake);
    });
  }
  updateUser(_user: IUser, _id: number): Promise<IUser | null> {
    return new Promise((res) => {
      res(userFake);
    });
  }
  getUserByNumberDocument(_document: string): Promise<IUser | null> {
    return new Promise((res) => {
      res(userFake);
    });
  }

  getUserById(id: number): Promise<IUser | null> {
    const list = [userFake];

    return new Promise((res) => {
      res(list.find((i) => i.id == id) || null);
    });
  }
}
