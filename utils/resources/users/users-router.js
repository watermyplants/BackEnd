const express = require('express');
const router = express.Router();
const Users = require('./user-model');

const {authenticate} = require('../../auth/authenticate')



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

router.put('/dashboard/:id/my_plant/:plant_id/update',authenticate, async (req,res) =>{
    const {plant_id} = req.params;
    try{
        const updated = await Users.updatePlant(req.body, plant_id);
        res.status(201).json(updated)
    }catch(error){
        res.status(500).json({error:"could not update plant"})
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





module.exports = router;