exports.seed = function(knex) {
    return knex('plants')
    .then(function () {
      // Inserts seed entries
      return knex('plants').insert([
        {name: 'weed', user_id:1 },

      ]);
    });
};
