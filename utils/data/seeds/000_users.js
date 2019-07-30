
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'New User',
          phone:5551235555,
          password:'$2a$12$A4TJVa2ehngu8.hv7VyIM.jqdYi6rdNo4dq5TE3XwcANbvxmjFdD2'
        }
      ]);
    });
};
