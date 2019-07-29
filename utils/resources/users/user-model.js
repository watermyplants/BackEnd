
const db = require('../../data/dbConfig')
const bcrypt = require('bcryptjs');
const generateToken = require('../../auth/generate-token')


module.exports = {
    register,
    login,
    getUserBy,
    getUsers,
    getPlants
}


function register(data){
    const {password} = data;
    const hash = bcrypt.hashSync(password, 12);
    data.password = hash;
    return db('users').insert(data);
}

function login(data){
    const {username,password} = data;

    return getUserBy({username}).then(user =>{
        if(user && bcrypt.compareSync(password, user.password)){
            const token = generateToken(user);
            return {
                id:user.id,
                username:username,
                token:token
            }
        }
    });
    ;
}


function getUserBy(filter){
   return db('users').first()
        .where(filter).then( user =>{
            if (user){
                return user;
            }else{
                return null
            }
        })
}

function getPlants(){
    return db('plants')
 }

function getUsers(){
    return db('users');
}