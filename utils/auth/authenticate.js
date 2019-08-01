const jwt = require('jsonwebtoken');
const secret = require('./secrets')
const db = require('../data/dbConfig')

const jwtKey = secret.jwtSecret;



module.exports = {
  authenticate,
  UserOwnsPlant,
  duplicateCheck
}


function authenticate(req, res, next) {
   const token = req.get('Authorization');
  
    if (token) {
      jwt.verify(token, jwtKey, (err, decoded) => {

        if (err) return res.status(401).json(err);
  
        req.decoded = decoded;
  
        next();
      });
    } else {
      return res.status(401).json({
        error: 'No token provided, must be set on the Authorization Header',
      });
    }
  }


  function UserOwnsPlant(req, res, next){
    const { id, plant_id} = req.params;

    if(!id){
        res.status(404).json({message:"Please provide a valid id"})
    }else{
        try{
            db('plants').first()
                .where({id:plant_id}).then(data =>{
                    if(data.user_id === id){
                        next();
                    }
                })
        }catch(error){
            res.status(404).json({error:"access denied not your plant"})
        }
        next()
    }
}



async function duplicateCheck (req, res, next) {
  const {type} = req.body;
  const {id} = req.params;

  
  try{
      const plants = await db('plants').where({user_id:id})
      const found =  plants.filter(plant => plant.type === type);
    

      if(found.length === 0){

          next()
      }else{
          
          res.status(400).json(`type ${type} already exists`)
      }

     
  }catch(error){
      res.status(500).json({error:"could not delete plantsssss"})
  }
}