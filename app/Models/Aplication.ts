import { BaseModel, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";

import Option from "App/Models/Option";
import Role from "App/Models/Role";
import MenuAccess from "App/Models/MenuAccess";
import Profile from "App/Models/Profile";

export default class Aplication extends BaseModel {
  public static table = "APP_APLICACIONES";

  @column({
    isPrimary: true,
    columnName: "APP_CODIGO",
    serializeAs: "id",
  })
  public id: number;

  @column({ columnName: "APP_NOMBRE", serializeAs: "name" })
  public name: string;

  @column({ columnName: "APP_URL", serializeAs: "url" })
  public url: string;

  @column({ columnName: "APP_MOSTRAR_EN_INICIO", serializeAs: "showInHome" })
  public showInHome: boolean;

  @column({ columnName: "APP_ORDEN", serializeAs: "order" })
  public order: number;

  @hasMany(() => Option, {
    localKey: "id",
    foreignKey: "aplicationId",
    serializeAs: "options",
  })
  public options: HasMany<typeof Option>;

  @hasMany(() => Role, {
    localKey: "id",
    foreignKey: "aplicationId",
    serializeAs: "roles",
  })
  public roles: HasMany<typeof Role>;

  @hasMany(() => MenuAccess, {
    localKey: "id",
    foreignKey: "aplicationId",
    serializeAs: "accessMenu",
  })
  public accessMenu: HasMany<typeof MenuAccess>;

  @hasMany(() => Profile, {
    localKey: "id",
    foreignKey: "aplicationId",
    serializeAs: "profiles",
  })
  public profiles: HasMany<typeof Profile>;
}
