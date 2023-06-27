import { IRole, IRoleFilters } from "App/Interfaces/RoleInterfaces";
import { IPagingData } from "App/Utils/ApiResponses";
import Role from "../Models/Role";
import RoleAction from "App/Models/RoleAction";
import { IActions } from "App/Interfaces/OptionInterface";
import { DateTime } from "luxon";

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
    await res?.load('actions', (query) => {
      query.preload('action')
    })

    if (res) {
      const actions: IActions[] = res.actions.map(action =>  {
        return {
          id: action.action[0].id,
          optionId: action.action[0].optionId,
          name: action.action[0].name,
          order: action.action[0].order,
          indicator: action.action[0].indicator,
          url: action.action[0].url
        } as IActions
      })

      const role: IRole = {
        id: res.id,
        name: res.name,
        description: res.description,
        aplicationId: res.aplicationId,
        userModify: res.userModify,
        dateModify: res.dateModify,
        userCreate: res.userCreate,
        dateCreate: res.dateCreate,
        actions: actions
      }
      return role;
    } else {
      return null;
    }
  }

  async getRolePaginated(filters: IRoleFilters): Promise<IPagingData<IRole>> {
    const query = Role.query();

    if (filters.name) {
      query.whereLike("name", `%${filters.name}%`);
    }

    if (filters.aplicationId) {
      query.where("aplicationId", filters.aplicationId);
    }

    const res = await query.paginate(filters.page, filters.perPage);

    const { data, meta } = res.serialize();

    return {
      array: data as IRole[],
      meta,
    };
  }

  async createRole(role: IRole): Promise<IRole> {
    const toCreateRole = new Role();
    toCreateRole.fill({ ...role });
    await toCreateRole.save();

    if(role.actions) {
      for (const action of role.actions) {
        const roleAction = new RoleAction();
        roleAction.actionId = action.id;
        roleAction.roleId = toCreateRole.id;
        await roleAction.save();
      }
    }

    return toCreateRole.serialize() as IRole;
  }

  async updateRole(role: IRole, id: number): Promise<IRole | null> {
    const toUpdate = await Role.find(id);
    if (!toUpdate) {
      return null;
    }

    toUpdate.name = role.name;
    toUpdate.description = role.description;
    toUpdate.aplicationId = role.aplicationId;
    toUpdate.dateModify = DateTime.local().toJSDate();
    if(role.userModify) {
      toUpdate.userModify = role.userModify;
    }

    const toDelete = await RoleAction.query().where("roleId", id);
    if (toDelete.length > 0) {
      await RoleAction.query().where("roleId", id).delete();
    }

    if(role.actions) {
      for (const action of role.actions) {
        const roleAction = new RoleAction();
        roleAction.actionId = action.id;
        roleAction.roleId = id;
        await roleAction.save();
      }
    }
    
    await toUpdate.save();
    return toUpdate.serialize() as IRole;
  }

  async deleteRole(id: number): Promise<boolean> {
    const toDelete = await Role.find(id);

    if (!toDelete) {
      return false;
    }

    const toDeleteActions = await RoleAction.query().where("roleId", id);
    if (toDeleteActions.length > 0) {
      await RoleAction.query().where("roleId", id).delete();
    }

    await toDelete.delete();
    return true;
  }
}
