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
    return new Promise((res) => {
      res(roleFake);
    });
  }

  getRolePaginated(_filters: IRoleFilters): Promise<IPagingData<IRole>> {
    return new Promise((res) => {
      res({ array: [roleFake], meta: { total: 100 } });
    });
  }

  deleteRole(_id: number): Promise<boolean> {
    return new Promise((res) => {
      res(true);
    });
  }

  createRole(_role: IRole): Promise<IRole> {
    return new Promise((res) => {
      res(roleFake);
    });
  }

  updateRole(_role: IRole, _id: number): Promise<IRole | null> {
    return new Promise((res) => {
      res(roleFake);
    });
  }
}
