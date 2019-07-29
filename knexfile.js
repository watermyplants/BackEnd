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
        }
    }
}