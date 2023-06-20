import { BaseModel, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";

import RoleAction from "App/Models/RoleAction";
import RoleProfile from "App/Models/RoleProfile";

export default class Role extends BaseModel {
  public static table = "ROL_ROLES";

  @column({ isPrimary: true, columnName: "ROL_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "ROL_NOMBRE", serializeAs: "name" })
  public name: string;

  @column({ columnName: "ROL_DESCRIPCION", serializeAs: "description" })
  public description: string;

  @column({ columnName: "ROL_CODAPP_APLICACION", serializeAs: "aplicationId" })
  public aplicationId: number;

  @column({ columnName: "ROL_USUARIO_MODIFICO", serializeAs: "userModify" })
  public userModify: string;

  @column({ columnName: "ROL_FECHA_MODIFICO", serializeAs: "dateModify" })
  public dateModify: Date;

  @column({ columnName: "ROL_USUARIO_CREO", serializeAs: "userCreate" })
  public userCreate: string;

  @column.dateTime({
    autoCreate: true,
    columnName: "ROL_FECHA_CREO",
    serializeAs: "dateCreate",
  })
  public dateCreate: DateTime;

  @hasMany(() => RoleAction, {
    localKey: "id",
    foreignKey: "roleId",
    serializeAs: "rolesActions",
  })
  public rolesActions: HasMany<typeof RoleAction>;

  @hasMany(() => RoleProfile, {
    localKey: "id",
    foreignKey: "roleId",
    serializeAs: "rolesProfiles",
  })
  public rolesProfiles: HasMany<typeof RoleProfile>;
}
