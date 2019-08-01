const express = require('express');
const router = express.Router();
const Users = require('./user-model');
const db = require('../../data/dbConfig')

const {authenticate, UserOwnsPlant, duplicateCheck} = require('../../auth/authenticate')



router.use(express.json());



router.get('/', (req, res) =>{
    res.send('<h1>Water my plants</h1>')
})



router.get('/dashboard/:id', authenticate, async (req,res) =>{

    const {id} = req.params

    if(!id){
        res.status(404).json({message:"Please provide an id"})
    }else{
        try{
            
            const plants = await Users.getPlants(id);
            
           // const schedules = await Users.getScedules()
            res.status(200).json(plants)
        }catch(error){
            res.status(500).json(error)
        }
    }
    
});

router.get('/dashboard/:id/my_plant/:plant_id', authenticate, UserOwnsPlant, async (req,res) =>{
    const {plant_id}= req.params;
    try{
            const plant = await Users.getPlant(plant_id);
            res.status(200).json(plant)

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
            console.log('try')
            const user = await Users.login(req.body);
            if(user){
                res.status(200).json(user)
            }else{

                res.status(200).json({message:"incorrect username or password"})
            }
            
            
        }catch(error){
            res.status(500).json({error:"could not login"})
        }
    }
})


router.post('/dashboard/:id/plants/add', authenticate, duplicateCheck, async (req, res)=>{
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


router.post('/dashboard/:id/my_plant/:plant_id/add_schedule', authenticate, UserOwnsPlant, async (req, res)=>{
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

router.put('/dashboard/:id/my_plant/:plant_id/update',authenticate, UserOwnsPlant, async (req,res) =>{
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


router.delete('/dashboard/:id/my_plant/:plant_id/remove', authenticate, UserOwnsPlant, async (req,res) =>{
    const {plant_id} =  req.params;
    try{
        const remove = await Users.deletePlant(plant_id);
        res.status(200).end()
        
    }catch(error){
        res.status(500).json({error:"could not delete plant"})
    }
})

router.post('/dashboard/:id/my_plant/:plant_id/delete/:sch_id', authenticate, UserOwnsPlant, async (req,res) =>{
    const schedule_id =  req.params.sch_id;
    try{
        const remove = await Users.deleteSchedule(schedule_id);
        res.status(200).end()
        
    }catch(error){
        res.status(500).json({error:"could not schedule"})
    }
})



router.get('/trial', (req, res) =>{

//     console.log(new Date())
//     console.log(new Date().getDay())
//     console.log(new Date().getFullYear())
//     console.log(new Date().getMonth())
//     console.log(new Date().getDate())
//     console.log(new Date().getTime()) /// retuns long interger
//     console.log(Date.now()) /// retuns long interger
//     //console.log(Date().getTime())



//     const monthNames = ["January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December"
// ];

//     console.log(monthNames[new Date().getMonth()])
    
//     const nextMonth = new Date().getMonth() + 1;
//     console.log(monthNames[nextMonth])


//     const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "June",
//   "Friday", "Saturday"];


//   const tryAgainst = 9;
//   //if(tryAgainst > )

//   const currentDay = dayNames[new Date().getDay() + 7]
//   console.log(currentDay);


//   let d = new Date("August 8, 2019 00:00:00");
//   let n = d.getTime();
//   console.log(n)

//   const milsec= 86400000
//   const intval = 3 ;
//   const schedule = milsec * intval;
//   console.log(schedule)

//   const waterOn = new Date( new Date().getTime() + schedule);
//   console.log(waterOn)

// //   let newf = {...dayNames, name:'GerDay'};
//   dayNames.push('Gerday');

//   console.log(dayNames);



//   var dated = new Date();
// dated.setDate(d.getDate() + ((5 + 7 - d.getDay()) % 7) -7 );
// console.log(dated);


// let daySelected0

//////////////////////////////////////////////////////
////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
// const check = 'string, more, gas';
// const newCheck = check.split(',')

// console.log(newCheck.length)
// console.log(newCheck)

// // for(i=0; i<newCheck.length; i++){
// //     console.log(newCheck[i].replace(',', '').trim())
// // }

// newCheck.map(day =>{
//     console.log(day.trim())
// })

// console.log(newCheck.toString())
// ///////////////////////////////////////////////////
// ////////////////////////////////////////////////////
// /////////////////////////////////////////////////////
// ////////////////////////////////////////////////////

// console.log(new Date('December 16, 1976 00:00:00'))
// console.log(new Date().getTime())
// console.log(new Date('August 01, 2019').getTime())

// console.log(new Date('December 15, 1976').getTime())
// console.log(Date.parse(new Date('December 16, 1976')))
// console.log(Date.parse(new Date('December 16, 1976 00:00:01')))

// console.log('/////////////////////////////')
// const dayInMi = 86400000;
// const days = 1;
// const date = 'December 16, 1976';
// console.log(date)
// console.log(new Date(date));
// console.log(new Date(date).getTime());
// const nextday = new Date(date).getTime() + (dayInMi * days)
// console.log(nextday)
// console.log(new Date(nextday))


// const chosen = []

// const milisec = 86400000;
// const intervals = 3;
// let startDate = 'January 01, 2019';

// console.log('///////////////////////')
// console.log(startDate)
// console.log('///////////////////////')

// for(i=0; i<intervals; i++){

//     let daySelected = new Date(startDate);
    
//     var nextDay = new Date(daySelected);
//     nextDay.setDate(daySelected.getDate() + i);
//     console.log(nextDay); // May 01 2000 
// }




//     res.status(200).json({mesage:"trial"})
})





module.exports = router;




  