// Creacion del modelo

const mongoose = require ('mongoose');
const esquema = mongoose.Schema;

const Users = mongoose.model('User', new esquema({
    email: String ,
    password: String,
    salt: String,
    role: {type: String, default: 'user'} //pero tambien podrá se admin
}));

module.exports = Users;