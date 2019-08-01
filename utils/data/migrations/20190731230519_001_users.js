
exports.up = function(knex) {
    return knex.schema
    .dropTableIfExists('users').createTable('users', tbl =>{
        tbl.increments();
  
        tbl.string('username', 255).unique().notNullable();
  
        tbl.string('password', 255).notNullable();
  
        tbl.string('phone', 255)
          .notNullable();
  
  
    })
    .dropTableIfExists('plants').createTable('plants', tbl =>{
      tbl.increments();
  
      tbl.string('name', 255).notNullable();
      tbl.string('type', 255).notNullable();
      tbl.string('location', 255).notNullable();
  
      tbl.integer('user_id', 255).notNullable()
          .references('id').inTable('users')
          .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
  
    .dropTableIfExists('schedule').createTable('schedule', tbl =>{
      tbl.increments();
  
      tbl.integer('plant_id')
        .notNullable()
        .references('id')
        .inTable('plants')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
        
      tbl.integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
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
