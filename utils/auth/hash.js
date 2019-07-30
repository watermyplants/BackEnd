const bcrypt = require('bcryptjs');


module.exports =function hash(password){
    const hash = bcrypt.hashSync(password, 12);
    return hash;
}