
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl =>{
      tbl.increments();

      tbl.string('username', 255).unique().notNullable();

      tbl.string('password', 255).notNullable();
  })

  .createTable('plants', tbl =>{
    tbl.increments();
    tbl.string('name')
      .unique()
      .notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('users')
  .dropTableIfExists('plants');
};
