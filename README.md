# BackEnd


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