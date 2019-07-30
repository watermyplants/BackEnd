exports.seed = function(knex) {
      return knex('plants').insert([
        {name: 'weed', user_id:1 },

      ]);
};
