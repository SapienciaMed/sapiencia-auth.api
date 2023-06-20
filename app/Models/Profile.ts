import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  ManyToMany,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";


import Role from "./Role";

export default class Option extends BaseModel {
  public static table = "PAC_PERFILES_ACCESO";

  @column({ isPrimary: true, columnName: "PAC_CODIGO", serializeAs: "id" })
  public id: number;

  @column({
    columnName: "PAC_CODUSR_USUARIO",
    serializeAs: "userId",
  })
  public userId: number;

  @column({
    columnName: "PAC_CODAPP_APLICACION",
    serializeAs: "aplicationId",
  })
  public aplicationId: number;

  @column({
    columnName: "PAC_FECHA_VIGENCIA",
    serializeAs: "dateValidity",
  })
  public dateValidity: Date;

  @column({
    columnName: "PAC_USUARIO_MODIFICO",
    serializeAs: "userModify",
  })
  public userModify: number;

  @column({
    columnName: "PAC_FECHA_MODIFICO",
    serializeAs: "dateModify",
  })
  public modifyDate: Date;

  @column({
    columnName: "PAC_USUARIO_CREO",
    serializeAs: "userCreate",
  })
  public userCreate: string;

  @column.dateTime({
    autoCreate: true,
    columnName: "PAC_FECHA_CREO",
    serializeAs: "dateCreate",
  })
  public dateCreate: DateTime;

  @manyToMany(() => Role, {
    pivotTable: "PRO_PERFILES_ROLES",
    localKey: "id",
    pivotForeignKey: "PRO_CODPAC_PERFIL",
    relatedKey: "id",
    pivotRelatedForeignKey: "PRO_CODROL_ROL",
    serializeAs: "roles",
  })
  public roles: ManyToMany<typeof Role>;
}
