import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "PRO_PERFILES_ROLES";

  public async up() {
     this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que asocia los perfiles con los roles");
      table.increments("PRO_CODIGO").primary().comment("Llave primaria");
      table
        .integer("PRO_CODPAC_PERFIL")
        .unsigned()
        .references("PAC_CODIGO")
        .inTable("PAC_PERFILES_ACCESO")
        .comment("Codigo del perfil (FK PAC_PERFILES_ACCESO)")
        .notNullable();
      table
        .integer("PRO_CODROL_ROL")
        .unsigned()
        .references("ROL_CODIGO")
        .inTable("ROL_ROLES")
        .comment("Codigo del rol (FK ROL_ROLES)")
        .notNullable();
    });
  }

  public async down() {
     this.schema.dropTable(this.tableName);
  }
}
