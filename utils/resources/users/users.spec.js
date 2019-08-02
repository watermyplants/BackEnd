
const request = require('supertest')
const server = require('../../server')


describe('server', () =>{
      it('env set to server', () =>{
           expect(process.env.DB_ENV).toBe('testing') 
      });



      describe('GET /', () =>{
           it('should return 200 status', () =>{
               return request(server)
                .get('/')
                .then(res =>{

                    expect(res.status).toBe(200) 
                })
           }); 
      });
});







