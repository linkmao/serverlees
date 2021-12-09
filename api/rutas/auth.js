const express = require ('express');
const router = express.Router();
const Users = require ('../modelos/Users');
const {isAutenticado} = require('../auth/index');
const crypto = require ('crypto'); // Viene por defecto en la libreria de express
const jwt = require('jsonwebtoken');

const singToken = (id)=>{
    return jwt.sign({id}, 'mi-secreto', {
        expiresIn: 60*60*24*365, 
    })
}

router.post('/register', (req,res)=>{
  const {email, password} = req.body
  crypto.randomBytes(16,(err,salt)=>{
      const newSalt= salt.toString('base64')
     // crypto.pbkdf2(pass, salt, iterations, keylen, digest, callback) argumentos de pbkdf2
     crypto.pbkdf2(password, newSalt, 1000, 64, 'sha1', (err,key)=>{
         const encryptedPassword = key.toString('base64')
         Users.findOne({email}).exec()
         .then(user=>{
             if (user) {
                 return res.send('Usuario ya registrado')
             }
             Users.create({
                 email,
                 password: encryptedPassword,
                 salt: newSalt
             }).then(()=>{
                 res.send('Usuario creado con exito')
             })
         })
     })
  })
})

router.post('/login', (req,res)=>{
   const {email, password} = req.body
   Users.findOne({email}).exec()
   .then(user=>{
       if (!user){
           return res.send('Usuario y/o contraseña no validos')
       }
       crypto.pbkdf2(password, user.salt, 1000, 64, 'sha1', (err,key)=>{
           const encryptedPassword = key.toString('base64')
           if(user.password === encryptedPassword){
               const token = singToken(user._id) 
             //  const token = "Mi-token"      
               return res.send({token})
           }
           return res.send('Usuario y/o contraseña no validos')
       })
   })
})

router.get('/me', isAutenticado, (req, res)=>{
    res.send(req.user)
})

module.exports = router;