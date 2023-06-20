import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "ACC_ACCIONES";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que almacena las acciones de acceso al sistema");
      table.increments("ACC_CODIGO").primary().comment("LLave primaria");
      table
        .integer("ACC_CODOPC_OPCION")
        .comment("Codigo de la opcion (FK OPC_OPCIONES)")
        .notNullable()
        .references("OPC_CODIGO")
        .inTable("OPC_OPCIONES");
      table
        .string("ACC_NOMBRE", 100)
        .comment("Nombre de la accion de acceso")
        .notNullable();
      table
        .string("ACC_ORDEN")
        .comment("Numero de ordenamiento de las acciones")
        .notNullable();
      table
        .string("ACC_INDICADOR", 50)
        .comment(
          "Codigo indicador de referencia al acceso (texto mayusculas separada por guion bajo)"
        )
        .notNullable();
      table
        .string("ACC_URL", 50)
        .comment("url de la ruta para asegurar el acceso");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
