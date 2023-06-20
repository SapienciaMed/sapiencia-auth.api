import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "MAC_MENU_ACCESOS";

  public async up() {
     this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que contiene el menu tranversal del sistema");
      table.increments("MAC_CODIGO").primary().comment("Llave primaria");
      table
        .integer("MAC_CODAPP_APLICACION")
        .notNullable().references('APP_CODIGO').inTable('APP_APLICACIONES')
        .comment("Codigo de la aplicacion (FK APP_APLICACIONES)");
      table
        .string("MAC_NOMBRE", 100)
        .notNullable()
        .comment("Nomrbre de la opcion del menu");

      table
        .string("MAC_URL", 50)
        .comment("URL interna del sitio donde se redirigira");

      table
        .integer("MAC_CODMAC_SUPERIOR")
        .comment("Codigo de la opcion del menu padre (FK MAC_MENU_ACCESOS)");
      table
        .string("MAC_ORDEN", 50)
        .notNullable()
        .comment("Numero de ordenamiento de las opciones del menu");
      table
        .string("MAC_INDICADOR_ACCION", 50)
        .comment("Indicador de la accion para validar la seguridad");
    });
  }

  public async down() {
     this.schema.dropTable(this.tableName);
  }
}
