import { IUser } from "App/Interfaces/UserInterfaces";
import { IUserRepository } from "App/Repositories/UserRepository";
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
