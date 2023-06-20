import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class RoleProfile extends BaseModel {
  public static table = "PRO_PERFILES_ROLES";

  @column({ isPrimary: true, columnName: "PRO_CODIGO", serializeAs: "id" })
  public id: number;

  @column({
    columnName: "PRO_CODPAC_PERFIL",
    serializeAs: "profileId",
  })
  public profileId: number;

  @column({
    columnName: "PRO_CODROL_ROL",
    serializeAs: "roleId",
  })
  public roleId: number;
}
