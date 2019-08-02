# BackEnd Water My Plants





##Description


#Instructions

**Project Steps**

- [ ] Create a forked copy of this project

- [ ] Submit a pull request to merge <firstName-lastName> branch into master.

# Yarn or NPM

- [ ] cd into projects root directory npm i or yarn intall to retreive  dependencies.

- [ ] RUN `npm run server` or `yarn start` to run your React application


- [ ] GIT commit your first initial git to your repository. **commit often**


# Deploy to Heroku


# Testing
Usee Jest to unit test your end points



## Minimum Viable Product
- [ ] CRUD create , read, update, and destroy endpoints and functionality

## end points
| POST   | /register | Creates a `user` using the information sent inside the `body` of the request. **Hashing the password** before saving the user to the database.
`https://watermp.herokuapp.com/register`
**Requirements** `username, password, phone number`


| POST   | /login | Logs in  a `user` using the information sent inside the `body` of the request. **Hash the password** before saving the user to the database.
`https://watermp.herokuapp.com/login`
**Requirements** `username , password`

| GET   | /dashboard/:id | authenticates  `user credentials` via header token before saving the user to the database.
`https://watermp.herokuapp.com/dashboard/:id`

**Requirements** `url id, token`


| POST | REGISTER | 
```'https://watermp.herokuapp.com/register'```


| POST | LOGIN | 
```'https://watermp.herokuapp.com/login'```



| GET | DASHBOARD |  
```'https://watermp.herokuapp.com/dashboard/:id'```


| POST | ADD PLANT |  
```'https://watermp.herokuapp.com/dashboard/:id/plants/add'```


| POST | ADD A SCHEDULE |  
```'https://watermp.herokuapp.com/dashboard/:id/my_plant/:plant_id/add_schedule'```

| GET | USER SINGLE PLANT | 
```'https://watermp.herokuapp.com/dashboard/:id/my_plant/:plant_id'```


| GET | ALL SCHEDULES FOR A PLANT |  
```'https://watermp.herokuapp.com/dashboard/:id/my_plant/:plant_id/schedules'```

| PUT | UPDATE PLANT |   
```'https://watermp.herokuapp.com/dashboard/:id/my_plant/:plant_id/update'```

| PUT | UPDATE USER |  
```'https://watermp.herokuapp.com/dashboard/:id/user_settings'```

| PUT | UPDATE A SCHEDULE | 
```'https://watermp.herokuapp.com/dashboard/:id/my_plant/:plant_id/update/:sch_id'```

| DEETE | PLANT | 
```'https://watermp.herokuapp.com/dashboard/:id/my_plant/:plant_id/remove'```


| DELETE | SCHEDULE |   
```'https://watermp.herokuapp.com/dashboard/:id/my_plant/:plant_id/remove/:sch_id'```