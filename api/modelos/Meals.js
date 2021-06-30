// Creacion del modelo
const mongoose = require ('mongoose');
const esquema = mongoose.Schema;

const Meals = mongoose.model('Meal', new esquema({
    name: String,
    desc: String
}));

module.exports = Meals;