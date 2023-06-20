import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "OPC_OPCIONES";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.comment(
        "Tabla que almacena las opciones que agrupan las acciones de seguridad"
      );
      table.increments("OPC_CODIGO").primary().comment("Llave primaria");
      table
        .integer("OPC_CODAPP_APLICACION")
        .notNullable()
        .references("APP_CODIGO")
        .inTable("APP_APLICACIONES")
        .comment("Codigo de la aplicacion (FK APP_APLICACIONES)");
      table
        .string("OPC_NOMBRE", 100)
        .notNullable()
        .comment("Nombre de la opcion agrupadora de acceso");
      table
        .integer("OPC_ORDEN")
        .notNullable()
        .comment("Numero de ordenamiento de las opciones");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
