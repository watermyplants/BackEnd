const secretWord = require('./secrets')
const jwt = require('jsonwebtoken')



module.exports = function generateToken(user){
    const jwtPayload = {
        subject: user.id,
        username:user.username,
    }

    const jwtOptions = {
        expiresIn:"1d"
    }
    return jwt.sign(jwtPayload, secretWord.jwtSecret, jwtOptions)
}