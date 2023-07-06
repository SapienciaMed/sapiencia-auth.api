import { IUserPermissions } from "App/Interfaces/AuthInterfaces";
import { IUser } from "App/Interfaces/UserInterfaces";
import { IUFilters } from "App/Interfaces/FilterInterfaces";
import { IPagingData } from "App/Utils/ApiResponses";
import User from "App/Models/User";

export interface IUserRepository {
  getUserById(id: number): Promise<IUser | null>;
  createUser(user: IUser): Promise<IUser>;
  updateUser(user: IUser, id: number): Promise<IUser | null>;
  getUserByNumberDocument(document: string): Promise<IUser | null>;
  getUserPermissions(userId: number): Promise<IUserPermissions>;
  changePasswordUser(password: string, id: number): Promise<IUser | null>;
  searchUser(elementsFilter: IUFilters): Promise<IPagingData<IUser | null>>
}

export default class UserRepository implements IUserRepository {
  constructor() {}

  async getUserById(id: number): Promise<IUser | null> {
    const res = await User.query().preload("profiles").where("id", id);

    return res.length > 0 ? (res[0].serialize() as IUser) : null;
  }

  async createUser(user: IUser): Promise<IUser> {
    const toCreate = new User();

    toCreate.fill({ ...user });
    await toCreate.save();
    return toCreate.serialize() as IUser;
  }

  async searchUser(filter: IUFilters): Promise<IPagingData<IUser | null>> {
    try {
      const { numberDocument, email, names, lastNames, page, perPage } = filter;

      const query = User.query().preload("profiles");
      
      if (numberDocument) { 
        query.whereLike("numberDocument", `%${numberDocument}%`);
      }

      if (email) { 
        query.where(`email`,`${email}`);
      }

      if (names) { 
        query.whereLike('names',`%${names}%`)
      }

      if (lastNames) {
        query.whereLike('lastNames',`%${lastNames}%`)
      }

      const res = await query.paginate(page, perPage)
      
      const { data, meta } = res.serialize()

      return {
        array: data as IUser[],
        meta,
      }

    } catch (error) {
      throw new Error(error);
    }

  }

  async updateUser(user: IUser, id: number): Promise<IUser | null> {
    const toUpdate = await User.find(id);

    if (!toUpdate) {
      return null;
    }

    toUpdate.fill({ ...user });
    await toUpdate.save();
    return toUpdate.serialize() as IUser;
  }

  async getUserByNumberDocument(numberDocument: string): Promise<IUser | null> {
    const user = await User.query()
      .preload("profiles")
      .where("numberDocument", numberDocument);

    if (user.length == 0) {
      return null;
    }

    const newUser = {
      ...user[0].serialize(),
      password: user[0]?.$getAttribute("password"),
    };

    return newUser as IUser;
  }

  public async getUserPermissions(userId: number): Promise<IUserPermissions> {
    const res = await User.query()
      .select("ACC_INDICADOR as action")
      .join("PAC_PERFILES_ACCESO", "PAC_CODUSR_USUARIO", "USR_CODIGO")
      .join("PRO_PERFILES_ROLES", "PRO_CODPAC_PERFIL", "PAC_CODIGO")
      .join("RAC_ROLES_ACCIONES", "RAC_CODROL_ROL", "PRO_CODROL_ROL")
      .join("ACC_ACCIONES", "ACC_CODIGO", "RAC_CODACC_ACCION")
      .where("USR_CODIGO", "=", userId)
      .where("PAC_FECHA_VIGENCIA", ">=", new Date(Date.now()).toDateString());

    return {
      actions: res
        .filter((i) => String(i.$extras.action || "").length > 0)
        .map((i) => i.$extras.action)
    };
  }

  public async changePasswordUser(
    password: string,
    id: number
  ): Promise<IUser | null> {
    const toUpdate = await User.find(id);

    if (!toUpdate) {
      return null;
    }

    toUpdate.password = password;

    await toUpdate.save();

    return toUpdate.serialize() as IUser;
  }
}
