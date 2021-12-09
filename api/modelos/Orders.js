// Creacion del modelo

const mongoose = require ('mongoose');
const esquema = mongoose.Schema;

const Orders = mongoose.model('Order', new esquema({
     meal_id:{type: esquema.Types.ObjectId, ref:'Meal'},
     user_id:String
}));

module.exports = Orders;