module.exports = {
    development:{
        client:"sqlite3",
        useNullAsDefault:true,
        connection:{
            filename:'./utils/data/users.db3'
        },
        migrations:{
            directory:"./utils/data/migrations"
        },
        seeds:{
            directory:"./utils/data/seeds"
        },

        pool: {
            afterCreate: (conn, done) => {
              conn.run("PRAGMA foreign_keys = ON", done); // enforce FK
            }
          }
    },

     production: {
        client: "pg",
        connection: process.env.DATABASE_URL || {
        database: "my_db",
        user: "username",
        password: "password"
        },
        migrations: {
        directory: "./utils/data/migrations"
        },
        seeds: {
        directory: "./utils/data/seeds"
        }
  }
}