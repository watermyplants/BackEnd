exports.seed = function(knex) {
      return knex('plants').insert([
        {name: 'Dandelion', type:'Common Dandelion', location:'backyard',  user_id:1 },
        {name: 'Dandelion', type:'Taraxacum officinale', location:'backyard',  user_id:1 },
        {name: 'Dandelion', type:'Taraxacum erythrospermum', location:'backyard',  user_id:1 },
        {name: 'Dandelion', type:'Taraxacum japonicum', location:'backyard',  user_id:1 }
      ]);
};
