const {Router} = require('express');
const router = Router();
const bcryptjs = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const ModelUser = require('../models/ModelUser');

//sign UP
router.post('/signup',
    [ 
      check('firstName', 'Inputted wrong name').isEmpty(),
      check('lastName', 'Inputted wrong name').isEmpty(),
      check('email', 'Wrong email').isEmail(),
      check('password', 'Password is short').isLength({min: 8})
    ], 
    async (req, res) => {
  
      try {
        //validation
        const err = validationResult(req)
        if(!err.isEmpty()) {
          return res.status(200).json({err: err.array(), message: 'Incorrect data'})
        }
        
        
        const {firstName, lastName, email, password} = req.body   //gets data at react

        //check by email unique user
        const candidate = await ModelUser.findOne({email})
        if(candidate) {
          return res.status(400).json({message: 'User with such email is exist'})
        }

        //hash password
        const hashPassword = await bcryptjs.hash(password, 12)

        //new user
        const user = new ModelUser({firstName, lastName, email, password: hashPassword})
        await user.save()

        res.status(201).json({message: 'User was created'})

      } catch (e) {
        res.status(500).json({"message": "Something was wrong at sign up. Try again"})
  }
})


// //sign IN
// router.post('/signin', async (req, res) => {

// })

module.exports = router;