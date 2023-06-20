import { IRole, IRoleFilters } from "App/Interfaces/RoleInterfaces";
import { IPagingData } from "App/Utils/ApiResponses";
import Role from "../Models/Role";

export interface IRoleRepository {
  createRole(role: IRole): Promise<IRole>;
  updateRole(role: IRole, id: number): Promise<IRole | null>;
  deleteRole(id: number): Promise<boolean>;
  getRoleById(id: number): Promise<IRole | null>;
  getRolePaginated(filters: IRoleFilters): Promise<IPagingData<IRole>>;
}

export default class RoleRepository implements IRoleRepository {
  constructor() {}

  async getRoleById(id: number): Promise<IRole | null> {
    const res = await Role.find(id);

    return res ? (res.serialize() as IRole) : null;
  }

  async getRolePaginated(filters: IRoleFilters): Promise<IPagingData<IRole>> {
    const query = Role.query();

    if (filters.name) {
      query.whereLike("name", `%${filters.name}%`);
    }

    const res = await query.paginate(filters.page, filters.perPage);

    const { data, meta } = res.serialize();

    return {
      array: data as IRole[],
      meta,
    };
  }

  async createRole(role: IRole): Promise<IRole> {
    const toCreate = new Role();

    toCreate.fill({ ...role });
    await toCreate.save();
    return toCreate.serialize() as IRole;
  }

  async updateRole(role: IRole, id: number): Promise<IRole | null> {
    const toUpdate = await Role.find(id);

    if (!toUpdate) {
      return null;
    }

    toUpdate.fill({ ...role });
    await toUpdate.save();
    return toUpdate.serialize() as IRole;
  }

  async deleteRole(id: number): Promise<boolean> {
    const toDelete = await Role.find(id);

    if (!toDelete) {
      return false;
    }

    await toDelete.delete();
    return true;
  }
}
