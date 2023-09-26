const router = require('express').Router();

const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
  try {
    const user = new User({
      firstName: req.body.first,
      lastName: req.body.last,
      email: req.body.mail,
      password: bcrypt.hashSync(req.body.password, 13)
    })

    const newUser = await user.save()
    const token = jwt.sign({id: newUser._id}, 
      process.env.JWT, {expiresIn: '1 day'})
      res.status(200).json({
        user: newUser,
        message: 'Success',
        token
      })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})

module.exports = router;