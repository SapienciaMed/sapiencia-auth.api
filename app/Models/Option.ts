import { BaseModel, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";

import Action from "App/Models/Action";

export default class Option extends BaseModel {
  public static table = "OPC_OPCIONES";

  @column({ isPrimary: true, columnName: "OPC_CODIGO", serializeAs: "id" })
  public id: number;

  @column({
    columnName: "OPC_CODAPP_APLICACION",
    serializeAs: "aplicationId",
  })
  public aplicationId: number;

  @column({
    columnName: "OPC_NOMBRE",
    serializeAs: "name",
  })
  public name: string;

  @column({
    columnName: "OPC_ORDEN",
    serializeAs: "order",
  })
  public order: number;

  @hasMany(() => Action, {
    localKey: "id",
    foreignKey: "optionId",
    serializeAs: "actions",
  })
  public actions: HasMany<typeof Action>;
}
