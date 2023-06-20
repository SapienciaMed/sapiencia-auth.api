import { ApiResponse } from "App/Utils/ApiResponses";
import { IAplication } from "App/Interfaces/AplicationInterface";
import { IOption } from "App/Interfaces/OptionInterface";
import { IMenuAccess } from "App/Interfaces/MenuAccessInterface";
import { IAplicationRepository } from "App/Repositories/AplicationRepository";
import { IOptionRepository } from "App/Repositories/OptionRepository";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IMenuAccessRepository } from "App/Repositories/MenuAccessRepository";

export interface IAccessElementService {
  getAplications(): Promise<ApiResponse<IAplication[]>>;
  getOptionsByAplicationId(
    aplicationId: number
  ): Promise<ApiResponse<IOption[]>>;
  getMenuAccess(): Promise<ApiResponse<IMenuAccess[]>>;
}

export default class AccessElementService implements IAccessElementService {
  constructor(
    private aplicationRepository: IAplicationRepository,
    private optionRepository: IOptionRepository,
    private menuAccessRepository: IMenuAccessRepository
  ) {}

  async getAplications(): Promise<ApiResponse<IAplication[]>> {
    const res = await this.aplicationRepository.getAplications();
    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getOptionsByAplicationId(
    aplicationId: number
  ): Promise<ApiResponse<IOption[]>> {
    const res = await this.optionRepository.getOptionsByAplicationId(
      aplicationId
    );
    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getMenuAccess(): Promise<ApiResponse<IMenuAccess[]>> {
    const res = await this.menuAccessRepository.getMenuAccess();
    return new ApiResponse(res, EResponseCodes.OK);
  }
}
