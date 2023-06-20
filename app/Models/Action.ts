import { BaseModel, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";

import RoleAction from "App/Models/RoleAction";

export default class Action extends BaseModel {
  public static table = "ACC_ACCIONES";

  @column({
    isPrimary: true,
    columnName: "ACC_CODIGO",
    serializeAs: "id",
  })
  public id: number;

  @column({ columnName: "ACC_CODOPC_OPCION", serializeAs: "optionId" })
  public optionId: number;

  @column({ columnName: "ACC_NOMBRE", serializeAs: "name" })
  public name: string;

  @column({ columnName: "ACC_ORDEN", serializeAs: "order" })
  public order: number;

  @column({ columnName: "ACC_INDICADOR", serializeAs: "indicator" })
  public indicator: string;

  @column({ columnName: "ACC_URL", serializeAs: "url" })
  public url: string | null;

  @hasMany(() => RoleAction, {
    localKey: "id",
    foreignKey: "actionId",
    serializeAs: "rolesActions",
  })
  public rolesActions: HasMany<typeof RoleAction>;
}
