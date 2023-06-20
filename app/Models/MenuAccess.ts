import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class MenuAccess extends BaseModel {
  public static table = "MAC_MENU_ACCESOS";

  @column({ isPrimary: true, columnName: "MAC_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "MAC_CODAPP_APLICACION", serializeAs: "aplicationId" })
  public aplicationId: number;

  @column({ columnName: "MAC_NOMBRE", serializeAs: "name" })
  public name: string;

  @column({ columnName: "MAC_URL", serializeAs: "url" })
  public url: string | null;

  @column({
    columnName: "MAC_CODMAC_SUPERIOR",
    serializeAs: "topMenuAccessId",
  })
  public topMenuAccessId: number | null;

  @column({ columnName: "MAC_ORDEN", serializeAs: "order" })
  public order: number;

  @column({
    columnName: "MAC_INDICADOR_ACCION",
    serializeAs: "actionIndicator",
  })
  public actionIndicator: string | null;
}
