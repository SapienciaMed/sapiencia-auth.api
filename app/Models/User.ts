import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  HasMany,
  hasMany,
  beforeSave,
} from "@ioc:Adonis/Lucid/Orm";
import Profile from "App/Models/Profile";
import Database from "@ioc:Adonis/Lucid/Database";
import Hash from "@ioc:Adonis/Core/Hash";

export default class User extends BaseModel {
  public static table = "USR_USUARIOS";

  @column({ isPrimary: true, columnName: "USR_CODIGO", serializeAs: "id" })
  public id: number;

  @column({
    columnName: "USR_NOMBRES",
    serializeAs: "names",
  })
  public names: string;

  @column({ columnName: "USR_APELLIDOS", serializeAs: "lastNames" })
  public lastNames: string;

  @column({ columnName: "USR_TIPO_DOCUMENTO", serializeAs: "typeDocument" })
  public typeDocument: string;

  @column({ columnName: "USR_NUMERO_DOCUMENTO", serializeAs: "numberDocument" })
  public numberDocument: string;

  @column({ columnName: "USR_CORREO", serializeAs: "email" })
  public email: string;

  @column({ columnName: "USR_CONTRASENA", serializeAs: null })
  public password: string;

  @column({ columnName: "USR_USUARIO_MODIFICO", serializeAs: "userModify" })
  public userModify: string;

  @column.dateTime({
    autoUpdate: true,
    columnName: "USR_FECHA_MODIFICO",
    serializeAs: "dateModify",
    prepare: () => Database.rawQuery("current_timestamp"),
  })
  public dateModify: DateTime;

  @column({ columnName: "USR_USUARIO_CREO", serializeAs: "userCreate" })
  public userCreate: string;

  @column.dateTime({
    autoCreate: true,
    columnName: "USR_FECHA_CREO",
    serializeAs: "dateCreate",
    prepare: () => Database.rawQuery("current_timestamp"),
  })
  public dateCreate: DateTime;

  @hasMany(() => Profile, {
    localKey: "id",
    foreignKey: "userId",
    serializeAs: "profiles",
  })
  public profiles: HasMany<typeof Profile>;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }
}
