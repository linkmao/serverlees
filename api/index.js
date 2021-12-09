// Declaraciones de las dependencias necesarias
const express = require ('express');
const mongoose = require ('mongoose');
const cors = require('cors');
const body = require('body-parser');
const meals = require ('./rutas/meals');
const orders = require ('./rutas/orders');
const auth = require ('./rutas/auth');

// Declaracion de la app y el uso de las dependencias
const app = express();
app.use(body.json());
app.use(cors());

mongoose.connect(process.env.VARIABLE_ENTORNO,{useNewUrlParser:true, useUnifiedTopology:true});
app.use('/api/meals', meals);
app.use('/api/orders', orders);
app.use('/api/auth', auth);

module.exports = app;

/* Este codigo debe ir en vercel.json directorio raiz
{
    "rewrites":[{"source": "/(.*)", "destination":"api/index"}]
}
*/