import { IRole, IRoleFilters } from "App/Interfaces/RoleInterfaces";
import { IRoleRepository } from "App/Repositories/RoleRepository";
import { IPagingData } from "App/Utils/ApiResponses";

const roleFake: IRole = {
  id: 1,
  name: "",
  description: "",
  aplicationId: 1,
};

export class RoleRepositoryFake implements IRoleRepository {
  getRoleById(_id: number): Promise<IRole | null> {
    const list = [roleFake];

    return new Promise((res) => {
      res(list.find((i) => i.id == _id) || null);
    });
  }

  getRolePaginated(_filters: IRoleFilters): Promise<IPagingData<IRole>> {
    return new Promise((res) => {
      res({ array: [roleFake], meta: { total: 100 } });
    });
  }

  deleteRole(_id: number): Promise<boolean> {
    const list = [roleFake];
    return new Promise((res) => {
      const role = list.find((i) => i.id == _id);
      if(!role) {
        res(false);
      } else {
        res(true);
      }
    });
  }

  createRole(_role: IRole): Promise<IRole> {
    return new Promise((res) => {
      res(roleFake);
    });
  }

  updateRole(_role: IRole, _id: number): Promise<IRole | null> {
    const list = [roleFake];

    return new Promise((res) => {
      res(list.find((i) => i.id == _id) || null);
    });
  }
}
