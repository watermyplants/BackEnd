
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl =>{
      tbl.increments();

      tbl.string('username', 255).unique().notNullable();

      tbl.string('password', 255).notNullable();

      tbl.float('phone' , 64)
        .notNullable();


  })
  .createTable('plants', tbl =>{
    tbl.increments();

    tbl.string('name', 255).notNullable();

    tbl.float('user_id', 255).notNullable()
        .references('id').inTable('users')
        .onUpdate('CASCADE')
      .onDelete('CASCADE');
  })

  .createTable('schedule', tbl =>{
    tbl.increments();

    tbl.float('plant_id')
      .notNullable()
      .references('id')
      .inTable('plants')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    tbl.string('water_schedule')
      .notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('users')
  .dropTableIfExists('plants')
  .dropTableIfExists('schedule');
};
