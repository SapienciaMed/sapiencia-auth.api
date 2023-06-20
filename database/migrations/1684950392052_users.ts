import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "USR_USUARIOS";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que contiene los usuarios del sistema");
      table.increments("USR_CODIGO").primary().comment("Llave primaria");
      table
        .string("USR_NOMBRES", 100)
        .notNullable()
        .comment("Nombres del usuario");
      table
        .string("USR_APELLIDOS", 100)
        .notNullable()
        .comment("Apellidos del usuario");
      table
        .string("USR_TIPO_DOCUMENTO", 4)
        .notNullable()
        .comment("Tipo de documento del usuario (Categorias de maestros)");
      table
        .string("USR_NUMERO_DOCUMENTO", 15)
        .notNullable()
        .unique()
        .comment("Numero de documento de identidad");
      table
        .string("USR_CORREO", 100)
        .notNullable()
        .unique()
        .comment("Correo electronico del usuario");
      table
        .string("USR_CONTRASENA", 100)
        .notNullable()
        .comment("Contraseña del usuario");
      table
        .string("USR_USUARIO_MODIFICO", 15)
        .comment(
          "Numero del documento del ultimo usuario que hizo una modificacion"
        );
      table
        .timestamp("USR_FECHA_MODIFICO")
        .comment("Fecha y hora de la ultima modificacion del usuario");
      table
        .string("USR_USUARIO_CREO", 15)
        .comment("Numero del documento del usuario que creo el registro");
      table
        .timestamp("USR_FECHA_CREO")
        .comment("Fecha y hora de la creacion del usuario");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
