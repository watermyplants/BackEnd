
const db = require('../../data/dbConfig')
const bcrypt = require('bcryptjs');
const hash = require('../../auth/hash')
const generateToken = require('../../auth/generate-token')


module.exports = {
    register,
    login,
    getUserBy,
    getUsers,
    getPlants,
    addPlant
}



async function register(data){
    const {password} = data;
    data.password = hash(password);

    const [id] = await  db('users').insert(data, 'id')
    const user = await getUserBy({id});
    
    return user;
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

function getPlants(id){
    return db('plants as p')
    .innerJoin('users as u', 'u.id', 'p.user_id')
    .leftJoin('schedule as s', 's.plant_id', 'p.id' )
    .select('p.name', 's.water_schedule')
    .where({user_id: id})
 }

function getUsers(){
    return db('users');
}

function addPlant(data){
    return db('plants').insert(data);
}