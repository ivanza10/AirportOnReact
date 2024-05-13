/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable("Users", function (table) {
      table.increments("idUser").primary();
      table.string("name").notNullable();
      table.string("email").notNullable().unique();
      table.string("password").notNullable();
      table.enu("user_type", ['user', 'admin']).defaultTo('user');
    }),
    knex.schema.createTable("Flights", function (table) {
      table.increments("id").primary();
      table.time("time");
      table.string("direction").notNullable();
      table.string("aviaComp");
      table.string("terminal", 1).notNullable().checkIn(["А", "Б", "В"]);
      table.string("type").notNullable().checkIn(["прилет", "вылет"]);
    }),
    knex.schema.createTable("VIP_users", function (table) {
      table.increments("idRoom").primary();
      table.integer("idUser").references("idUser").inTable("Users");
      table.string("passportNumber", 10).notNullable();
      table.timestamp("time").defaultTo(knex.fn.now());
      table.string("phone", 11).notNullable();
    }),

    knex.schema.createTable("VIP_room", function (table) {
      table.increments("idRoom").primary();
      table.decimal("price", 10, 2).notNullable();
      table.string("name").notNullable();
      table.binary("photo", "longblob");
    }),

    knex.schema.createTable("Kafe_or_Shop", function (table) {
      table.increments("id").primary();
      table.binary("photo", "longblob");
      table.string("name").notNullable();
      table.text("signature");
      table.integer("floor");
      table.string("type").notNullable().checkIn(["магазин", "кафе"]);
    }),
  ]);
};

exports.down = function (knex) {
  return Promise.all([
    knex.schema.dropTableIfExists("Kafe_or_Shop"),
    knex.schema.dropTableIfExists("VIP_room"),
    knex.schema.dropTableIfExists("VIP_users"),
    knex.schema.dropTableIfExists("Users"),
    knex.schema.dropTableIfExists("Flights"), // Добавлено удаление таблицы "Flights"
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
