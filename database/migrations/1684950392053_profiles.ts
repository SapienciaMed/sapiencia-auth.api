import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "PAC_PERFILES_ACCESO";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.comment(
        "Tabla que contiene los perfiles de acceso de los usuarios a las diferentes aplicaciones"
      );
      table.increments("PAC_CODIGO").primary().comment("Llave primaria");
      table
        .integer("PAC_CODUSR_USUARIO")
        .references("USR_CODIGO")
        .inTable("USR_USUARIOS")
        .comment("Codigo del usuario (FK USR_USUARIOS)")
        .notNullable();
      table
        .integer("PAC_CODAPP_APLICACION")
        .references("APP_CODIGO")
        .inTable("APP_APLICACIONES")
        .comment("Codigo de la aplicacion (FK APP_APLICACIONES)")
        .notNullable();
      table.timestamp("PAC_FECHA_VIGENCIA").notNullable().comment("");

      table
        .string("PAC_USUARIO_MODIFICO", 15)
        .comment(
          "Numero del documento del ultimo usuario que hizo una modificacion"
        );
      table
        .timestamp("PAC_FECHA_MODIFICO")
        .comment("Fecha y hora de la ultima modificacion");
      table
        .string("PAC_USUARIO_CREO", 15)
        .comment("Numero del documento del usuario que creo el registro");

      table
        .timestamp("PAC_FECHA_CREO")
        .comment("Fecha y hora de creacion del perfil");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
