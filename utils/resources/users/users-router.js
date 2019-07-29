const express = require('express');
const router = express.Router();
const Users = require('./user-model');

const {authenticate} = require('../../auth/authenticate')



router.use(express.json());

router.get('/', (req, res) =>{
    res.send('<h1>Water my plants</h1>')
})



//router.get('/dashboard/:id', authenticate, async (req,res) =>{
router.get('/dashboard/:id',  async (req,res) =>{

    const {id} = req.params
    
    try{
        const user = await Users.getPlants()
        res.status(200).json(user)
    }catch(error){
        res.status(500).json(error)
    }
});

router.post('/register', async (req,res) =>{
    const {username, password} = req.body;
    if(!username || !password){
        res.status(400).json({error:"require username and password"})
    }else{
        try{
            const [id] = await Users.register(req.body);
            const newRegister = await Users.getUserBy({id});
            res.status(200).json(newRegister)
            
        }catch(error){
            res.status(500).json({error:"could not register"})
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






module.exports = router;