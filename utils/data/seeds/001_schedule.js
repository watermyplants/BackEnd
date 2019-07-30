
exports.seed = function(knex) {
      return knex('schedule').insert([
        {plant_id:1, water_schedule:'Thursday'},
        {plant_id:1, water_schedule:'Saturday'},
      ]);
};
