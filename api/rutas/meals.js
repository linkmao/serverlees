const express = require ('express');
const router = express.Router();
const Meals = require ('../modelos/Meals');

router.get('/', (req,res)=>{
    Meals.find().exec().then(x=>res.status(200).send(x));
    // res.send('GET Hola hija mia');
})

router.get('/:id',(req,res)=>{
    Meals.findById(req.params.id)
    .exec()
    .then (x=>res.status(200).send(x));
})

router.post('/', (req,res)=>{
    Meals.create(req.body).then(x=>res.status(201).send(x));
    // res.send('POST Hola hija mia');
})

router.put('/:id', (req,res)=>{
    Meals.findOneAndUpdate(req.params.id, req.body)
    .then (()=>res.sendStatus(204));
})

router.delete('/:id', (req,res)=>{
    Meals.findOneAndDelete(req.params.id).exec().then(()=>res.sendStatus(204));
})

module.exports = router;