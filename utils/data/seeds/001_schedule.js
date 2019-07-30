
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('schedule').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('schedule').insert([
        {plant_id:1, water_schedule:'Thursday'},
        {plant_id:1, water_schedule:'Saturday'},
     
      ]);
    });
};
