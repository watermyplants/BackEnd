
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('plants').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('plants').insert([
        {name: 'weed'},
        {name: 'rose'},
        {name: 'tulip'}
      ]);
    });
};
