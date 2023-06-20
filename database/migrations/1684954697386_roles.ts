import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "ROL_ROLES";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que almacena los roles de acceso");
      table.increments("ROL_CODIGO").primary().comment("Llave primaria");
      table.string("ROL_NOMBRE", 100).comment("Nombre del rol").notNullable();
      table
        .string("ROL_DESCRIPCION", 300)
        .comment("Descripcion del rol")
        .notNullable();
      table
        .integer("ROL_CODAPP_APLICACION")
        .references("APP_CODIGO")
        .inTable("APP_APLICACIONES")
        .comment("Codigo de la aplicacion (FK APP_APLICACIONES)")
        .notNullable();
      table
        .string("ROL_USUARIO_MODIFICO", 15)
        .comment(
          "Numero del documento del ultimo usuario que hizo una modificacion"
        );
      table
        .timestamp("ROL_FECHA_MODIFICO")
        .comment("Fecha y hora de la ultima modificacion");
      table
        .string("ROL_USUARIO_CREO", 15)
        .notNullable()
        .comment("Numero del documento del usuario que creo el registro");
      table
        .timestamp("ROL_FECHA_CREO")
        .notNullable()
        .comment("Fecha y hora de la ultima modificacion");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
