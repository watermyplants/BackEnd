const jwt = require('jsonwebtoken');
const secret = require('./secrets')
const db = require('../data/dbConfig')

const jwtKey = secret.jwtSecret;



module.exports = {
  authenticate,
  UserOwnsPlant
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