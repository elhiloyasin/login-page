const express = require('express');
const router = express.Router();
const User = require('../models/User');
const PORT = 5000;

router.post('/register', async (req, res) => {
   const user = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
   });

   if (!user.email || !user.username || !user.password)
      res.send('Form is incomplete');
   try {
      const response = await user.save();
      res.status(201).redirect(`http://localhost:${PORT}`);
   } catch (err) {
      res.status(400).send({ message: err.msg });
   }
})

router.post('/login', async (req, res) => {
   if (req.body.username == null || req.body.password == null) {
      res.send('Wrong Login Details!');
   }
   
   let user;
   try {
      user = await User.findOne({ username: req.body.username });
      if (req.body.password != user.password) {
				return res.status(400).send('Password is invalid');
      }
      
      res.status(200).redirect(`http://localhost:${PORT}/home`);
   } catch (err) {
         res.status(400).send('Username is invalid!' + " " + err.msg);
   }
});

module.exports = router;