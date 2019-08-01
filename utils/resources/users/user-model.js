
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
    addPlant,
    updatePlant,
    getPlant,
    updatePlant,
    deletePlant,
    updateUser,
    addSchedule,
    getScedules,
    findPlantBy,
    deleteSchedule
}




////////GETS
////////GETS
////////GETS
////////GETS
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



async function getPlants(id){
    return db('plants').where({user_id: id});
    // return db('users as u')
    //   .innerJoin('plants as p', 'p.user_id', 'u.id')
    // //  .select('p.name', 'p.type','p.location','s.water_schedule')
    // .where({user_id: id})
    // // return db('schedule as s')
    // //  .innerJoin('users as u', 'u.id', 's.user_id')
    // //  .innerJoin('plants as p', 'p.id', 's.plant_id' )
    // //  .select('s.water_schedule')
    // // .where({plant_id: id})
 }


 function getScedules(plantId){
     return db('schedule').where({plant_id: plantId})
 }

function getUsers(){
    return db('users');
}

function findPlantBy(filter){
    return db('plants').first()
        .where(filter).then( plant =>{
            if(plant){
                return plant;
            }else{
                return null
            }
        });
}



function getPlant(id){
   return db('plants').first()
        .where({id}).then(plant =>{
            if(plant){
                return plant
            }else{
                return null;
            }
        })
}

function findSchedule(filter){
    return db('schedule').first()
        .where(filter).then(schedule =>{
            if(schedule){
                return schedule;
            }else{
                return null;
            }
        })
}

////////POSTS
////////POSTS
////////POSTS
////////POSTS


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



async function addPlant(data, user){
    const addedPlant = {
        ...data,
        user_id:user
    }
    const [id] =  await db('plants').insert(addedPlant, 'id');
    const plant = await findPlantBy({id})
    return plant;
   
}

async function addSchedule(data, user, plant){

    const scheduleData = {
        ...data,
        plant_id:plant,
        user_id:user
    }

    const [id] = await db('schedule').insert(scheduleData, 'id');
    const schedule = await findSchedule({id});
    return schedule;
}

//////UPDATES
//////UPDATES
//////UPDATES
//////UPDATES
//////UPDATES
//////UPDATES
async function updatePlant(data, id){
    await db('plants').update(data, 'id')
        .where({id});
    const plant = await getPlant(id)
    return plant
}


async function updateUser(data, id){
    await db('users').update(data, 'id').where({id});
    const user = await getUserBy({id});
    return user;
}


// DELETES
// DELETES
// DELETES
// DELETES
// DELETES
// DELETES
// DELETES
async function deletePlant(id){
    return await db('plants').where({id}).del();
}


async function deleteSchedule(id){
    return await db('schedule').where({id}).del();
}
