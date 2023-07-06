import { IUserPermissions } from "App/Interfaces/AuthInterfaces";
import { IUFilters } from "App/Interfaces/FilterInterfaces";
import { IUser } from "App/Interfaces/UserInterfaces";
import { IUserRepository } from "App/Repositories/UserRepository";
import { IPagingData } from "App/Utils/ApiResponses";
import { DateTime } from "luxon";

const userFake: IUser = {
  id: 1,
  names: "Jose",
  lastNames: "Paredes",
  typeDocument: "CC",
  numberDocument: "1234567890",
  password:
    "$argon2id$v=19$t=3,m=4096,p=1$ncu1UWkGyCct9xY5AbZoEw$2sOHZRIeqkwgdEH1ZBS1oGLhqwjPTw5YKdz04CDZhAE",
  userModify: "test",
  dateModify: DateTime.now(),
  userCreate: "test",
  dateCreate: DateTime.now(),
  email: "jmbetancur@i4digital.com",
};

export class UserRepositoryFake implements IUserRepository {
  searchUser(_filter: IUFilters): Promise<IPagingData<IUser | null>> {
    throw new Error("Method not implemented.");
  }
  changePasswordUser(password: string, id: number): Promise<IUser | null> {
    const list = [{ ...userFake }];

    return new Promise((res) => {
      const user = list.find((user) => user.id === id);

      if (!user) {
        return res(null);
      }

      user.password = password;

      return res(user);
    });
  }

  getUserByNumberDocument(numberDocument: string): Promise<IUser | null> {
    const list = [{ ...userFake }];

    return new Promise((res) => {
      const user = list.find((user) => user.numberDocument === numberDocument);

      if (!user) {
        return res(null);
      }

      return res(user);
    });
  }

  getUserPermissions(_userId: number): Promise<IUserPermissions> {
    return new Promise((res) => {
      res({
        actions: [],
      });
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

  getUserById(id: number): Promise<IUser | null> {
    const list = [{ ...userFake }];

    return new Promise((res) => {
      const user = list.find((user) => user.id === id);

      if (!user) {
        return res(null);
      }

      return res(user);
    });
  }
}
