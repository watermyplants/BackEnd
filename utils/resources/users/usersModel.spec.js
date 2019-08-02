const Users = require('./user-model');
const db = require('../../data/dbConfig');
const request = require('supertest');
const server = require('../../server');


describe('Router', () =>{

    describe('/REGISTER /POST', () =>{ 
         
        beforeEach(async () =>{
            await db('users').truncate()
        })

        it('post to register should haev length of 2', async() =>{
            const data = {
                username:'Henry',
                password:'pass',
                phone:'5555555555'
            }
  
            await Users.register(data)
  
            const users = await db('users');
                expect(users).toHaveLength(1) 
            
        });
    });
}); 

