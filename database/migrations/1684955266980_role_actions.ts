import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "RAC_ROLES_ACCIONES";

  public async up() {
     this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que asocia los roles con las acciones");
      table.increments("RAC_CODIGO").primary().comment("Llave primaria");
      table
        .integer("RAC_CODROL_ROL").references('ROL_CODIGO').inTable('ROL_ROLES')
        .comment("Codigo del rol (FK ROL_ROLES)")
        .notNullable();
      table
        .integer("RAC_CODACC_ACCION").references('ACC_CODIGO').inTable('ACC_ACCIONES')
        .comment("Codigo de la accion (FK ACC_ACCIONES)")
        .notNullable();
    });
  }

  public async down() {
     this.schema.dropTable(this.tableName);
  }
}
