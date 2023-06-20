import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class RoleAction extends BaseModel {
  public static table = "RAC_ROLES_ACCIONES";

  @column({
    isPrimary: true,
    columnName: "RAC_CODIGO",
    serializeAs: "id",
  })
  public id: number;

  @column({ columnName: "RAC_CODROL_ROL", serializeAs: "roleId" })
  public roleId: number;

  @column({ columnName: "RAC_CODACC_ACCION", serializeAs: "actionId" })
  public actionId: number;
}
