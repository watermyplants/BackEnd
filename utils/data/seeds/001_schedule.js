
exports.seed = function(knex) {
      return knex('schedule').insert([
        {plant_id:1, water_schedule:'1565240400000', user_id:1},
      ]);
};
