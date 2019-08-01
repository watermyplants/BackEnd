const express = require('express');
const router = express.Router();
const Users = require('./user-model');

const {authenticate} = require('../../auth/authenticate')



router.use(express.json());




//write middleware to check id user exist
//write middleware to check id user exist
//write middleware to check id user exist
//write middleware to check id user exist
//write middleware to check id user exist
//write middleware to check id user exist
//write middleware to check id user exist
//write middleware to check id user exist
//write middleware to check id user exist


router.get('/', (req, res) =>{
    res.send('<h1>Water my plants</h1>')
})



router.get('/dashboard/:id', authenticate, async (req,res) =>{
    const {id} = req.params

    if(!id){
        res.status(404).json({message:"Please provide an id"})
    }else{
        try{
            const user = await Users.getPlants(id)
            res.status(200).json(user)
        }catch(error){
            res.status(500).json(error)
        }
    }
    
});

router.get('/dashboard/:id/my_plant/:plant_id', authenticate, async (req,res) =>{
    const {plant_id}= req.params;
    try{
        if(!plant_id){
            res.status(404).json({error:"plant id missing"})
        }else{
            const plant = await Users.getPlant(plant_id);
            res.status(200).json(plant)
        }

    }catch(error){
        res.status(500).json({error:"could not retreive plant"})
    }
})

router.post('/register', async (req,res) =>{
    const {username, password, phone} = req.body;
    if(!username || !password || !phone){
        res.status(400).json({error:"require username, password, and phone number"})
    }else{
        try{
            const user =  await Users.register(req.body);
            res.status(200).json(user)
            
        }catch(error){
            res.status(500).json(error)
        }
    }
});

router.post('/login', async (req, res)=>{
    const {username, password} = req.body;
    if(!username || !password){
        res.status(400).json({error:"require username and password"})
    }else{
        try{
            const user = await Users.login(req.body);
            if(user){
                res.status(200).json(user)
            }
            
        }catch(error){
            res.status(500).json({error:"could not login"})
        }
    }
})


router.post('/dashboard/:id/plants/add', authenticate, async (req, res)=>{
    const {id} = req.params;
    const {name, location, type} = req.body;
    if(!name, !location, !type){
        res.status(400).json({error:"require plant name, type, and location"})
    }else{
        try{
            const plant = await Users.addPlant(req.body, id);
            res.status(200).json(plant)
            
            
        }catch(error){
            res.status(500).json({error:"could not add plant"})
        }
    }
});


router.post('/dashboard/:id/my_plant/:plant_id/add_schedule', async (req, res)=>{
    const {water_schedule} = req.body;
    const {id,plant_id} = req.params;

    console.log(water_schedule)
    if(!water_schedule){
        res.status(400).json({error:"please add a water schedule"})
    }else{
        try{
            const schedule = await Users.addSchedule(req.body, id, plant_id);
            if(schedule){
                res.status(200).json(schedule)
            }
            
        }catch(error){
            res.status(500).json({error:"could not add schedule"})
        }
    }
})

router.put('/dashboard/:id/my_plant/:plant_id/update',authenticate, async (req,res) =>{
    const {plant_id} = req.params;
    try{
        const updated = await Users.updatePlant(req.body, plant_id);
        res.status(201).json(updated)
    }catch(error){
        res.status(500).json({error:"could not update plant"})
    }
})

router.put('/dashboard/:id/user_settings',authenticate, async (req,res) =>{
    const {phone} = req.body;
    const {id} = req.params;
    if(!phone){
        res.status(400).json({error:"please add a phone number"})
    }else{

        try{
            const updated = await Users.updateUser(req.body,id);
            res.status(201).json(updated)
        }catch(error){
            res.status(500).json({error:"could not update phone number"})
        }
    }
})


router.delete('/dashboard/:id/my_plant/:plant_id/remove', authenticate, async (req,res) =>{
    const {plant_id} =  req.params;
    console.log(plant_id)
    try{
        const remove = await Users.deletePlant(plant_id);
        res.status(200).end()
        
    }catch(error){
        res.status(500).json({error:"could not delete plant"})
    }
})

router.delete('/dashboard/:id/my_plant/:plant_id/add_schedule', authenticate, async (req,res) =>{
    const {plant_id} =  req.params;
    console.log(plant_id)
    try{
        const remove = await Users.deletePlant(plant_id);
        res.status(200).end()
        
    }catch(error){
        res.status(500).json({error:"could not delete plant"})
    }
})

router.get('/trial', (req, res) =>{

    console.log(new Date())
    console.log(new Date().getDay())
    console.log(new Date().getFullYear())
    console.log(new Date().getMonth())
    console.log(new Date().getDate())
    console.log(new Date().getTime()) /// retuns long interger
    console.log(Date.now()) /// retuns long interger
    //console.log(Date().getTime())



    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

    console.log(monthNames[new Date().getMonth()])
    
    const nextMonth = new Date().getMonth() + 1;
    console.log(monthNames[nextMonth])


    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "June",
  "Friday", "Saturday"];


  const tryAgainst = 9;
  //if(tryAgainst > )

  const currentDay = dayNames[new Date().getDay() + 7]
  console.log(currentDay);


  let d = new Date("August 8, 2019 00:00:00");
  let n = d.getTime();
  console.log(n)

  const milsec= 86400000
  const intval = 3 ;
  const schedule = milsec * intval;
  console.log(schedule)

  const waterOn = new Date( new Date().getTime() + schedule);
  console.log(waterOn)

//   let newf = {...dayNames, name:'GerDay'};
  dayNames.push('Gerday');

  console.log(dayNames);



  var dated = new Date();
dated.setDate(d.getDate() + ((5 + 7 - d.getDay()) % 7) -7 );
console.log(dated);


let daySelected0

    res.status(200).json({mesage:"trial"})
})





module.exports = router;





// exports.up = function(knex) {
//     return knex.schema
//     .dropTableIfExists('users').createTable('users', tbl =>{
//         tbl.increments();
  
//         tbl.string('username', 255).unique().notNullable();
  
//         tbl.string('password', 255).notNullable();
  
//         tbl.string('phone', 255)
//           .notNullable();
  
  
//     })
//     .dropTableIfExists('plants').createTable('plants', tbl =>{
//       tbl.increments();
  
//       tbl.string('name', 255).notNullable();
//       tbl.string('type', 255).unique().notNullable();
//       tbl.string('location', 255).notNullable();
  
//       tbl.integer('user_id', 255).notNullable()
//           .references('id').inTable('users')
//           .onUpdate('CASCADE')
//         .onDelete('CASCADE');
//     })
  
//     .dropTableIfExists('schedule').createTable('schedule', tbl =>{
//       tbl.increments();
  
//       tbl.integer('plant_id')
//         .notNullable()
//         .references('id')
//         .inTable('plants')
//         .onUpdate('CASCADE')
//         .onDelete('CASCADE');
        
//       tbl.integer('user_id')
//         .notNullable()
//         .references('id')
//         .inTable('users')
//         .onUpdate('CASCADE')
//         .onDelete('CASCADE');
  
//       tbl.string('water_schedule')
//         .notNullable();
//     })
//   };
  
//   exports.down = function(knex) {
//     return knex.schema
//     .dropTableIfExists('users')
//     .dropTableIfExists('plants')
//     .dropTableIfExists('schedule');
//   };
  