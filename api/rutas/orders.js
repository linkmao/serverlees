const express = require ('express');
const router = express.Router();
const Orders = require ('../modelos/Orders');
const {isAutenticado, hasRoles} = require ('../auth/index');

router.get('/', (req,res)=>{
    Orders.find().exec().then(x=>res.status(200).send(x));
    // res.send('GET Maolink');
})

router.get('/:id',(req,res)=>{
    Orders.findById(req.params.id)
    .exec()
    .then (x=>res.status(200).send(x));
})

router.post('/',isAutenticado, (req,res)=>{
    const {_id} = req.user
    Orders.create({...req.body, userId:_id}).then(x=>res.status(201).send(x));
    // res.send('POST Maolink');
})

//router.put('/:id', isAutenticado, hasRoles(['admin','user']), (req,res)=>{
router.put('/:id', isAutenticado,  (req,res)=>{
    Orders.findOneAndUpdate(req.params.id, req.body)
    .then (()=>res.sendStatus(204));
})

router.delete('/:id', isAutenticado, (req,res)=>{
    Orders.findOneAndDelete(req.params.id).exec().then(()=>res.sendStatus(204));
})

module.exports = router;