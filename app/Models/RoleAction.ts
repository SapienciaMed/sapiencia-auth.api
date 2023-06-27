import { BaseModel, HasMany, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Action from "./Action";

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

  @hasMany(() => Action, {
    localKey: "actionId",
    foreignKey: "id",
    serializeAs: "action",
  })
  public action: HasMany<typeof Action>;
}
