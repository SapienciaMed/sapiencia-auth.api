import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "APP_APLICACIONES";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que contiene los diferentes aplicativos del sitio");
      table
        .increments("APP_CODIGO")
        .unsigned()
        .primary()
        .comment("llave primaria");
      table
        .string("APP_NOMBRE", 50)
        .notNullable()
        .comment("Nombre del aplicativo");
      table
        .string("APP_URL", 50)
        .notNullable()
        .comment("Ruta donde se encuentra el aplicativo");
      table
        .boolean("APP_MOSTRAR_EN_INICIO")
        .notNullable()
        .comment(
          "Indicador de que este aplicativo se mostrara en el menu de incio"
        );
      table
        .integer("APP_ORDEN")
        .notNullable()
        .comment(
          "Orden en el que apareceran las opciones en el menu de inicio"
        );
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
