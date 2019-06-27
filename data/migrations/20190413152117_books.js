exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("users", table => {
      table.increments();
      table.timestamps(true, true);
      table.string("name", 40).notNullable();
      table
        .string("email", 30)
        .notNullable()
        .unique();
      table.string("password", 100).notNullable();
      table
        .string("thumbnail_url", 256)
        .defaultTo("https://pbs.twimg.com/media/C8QsNInXUAAyjZQ.jpg");
    })
    .createTable("restaurants", table => {
      table.increments();
      table.timestamps(true, true);
      table.integer("rating");
      table.string("name", 40).notNullable();
      table.string("location", 40).notNullable();
      table.string("description", 600);
      table.string("image_url", 256);
    })
    .createTable("servers", table => {
      table.increments();
      table.timestamps(true, true);
      table.string("name", 40).notNullable();
      table.integer("rating");
      table.string("job_title", 40).notNullable();
      table.string("time_worked", 30).notNullable();
      table
        .string("email", 30)
        .notNullable()
        .unique();
      table.string("password", 100).notNullable();
      table
        .string("thumbnail_url", 256)
        .defaultTo("https://pbs.twimg.com/media/C8QsNInXUAAyjZQ.jpg");
      table
        .integer("restaurant_id")
        .unsigned()
        .references("restaurants.id")
        .notNullable()
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("transactions", table => {
      table.increments();
      table.timestamps(true, true);
      table
        .integer("tipper_id")
        .unsigned()
        .references("users.id")
        .notNullable()
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .integer("server_id")
        .unsigned()
        .references("servers.id")
        .notNullable()
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .float("tip_paid")
        .unsigned()
        .notNullable();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("transactions")
    .dropTableIfExists("servers")
    .dropTableIfExists("restaurants")
    .dropTableIfExists("users");
};
