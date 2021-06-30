const express = require ('express');
const router = express.Router();
const Orders = require ('../modelos/Orders');

router.get('/', (req,res)=>{
    Orders.find().exec().then(x=>res.status(200).send(x));
    // res.send('GET Maolink');
})

router.get('/:id',(req,res)=>{
    Orders.findById(req.params.id)
    .exec()
    .then (x=>res.status(200).send(x));
})

router.post('/', (req,res)=>{
    Orders.create(req.body).then(x=>res.status(201).send(x));
    // res.send('POST Maolink');
})

router.put('/:id', (req,res)=>{
    Orders.findOneAndUpdate(req.params.id, req.body)
    .then (()=>res.sendStatus(204));
})

router.delete('/:id', (req,res)=>{
    Orders.findOneAndDelete(req.params.id).exec().then(()=>res.sendStatus(204));
})

module.exports = router;