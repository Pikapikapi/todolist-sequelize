const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
  res.render('login')
})

// 加入 middleware，驗證 reqest 登入狀態
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  })
)

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmpassword } = req.body

  User.findOne({ where: { email } }).then((user) => {
    if (user) {
      console.log('user already exists')
      return res.render('register', {
        name,
        email,
        password,
        confirmpassword,
      })
    }
    return bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hash) => User.create({ name, email, password: hash }))
      .then(() => res.redirect('/'))
      .catch((error) => console.log(error))
  })
})

router.get('/logout', (req, res) => {
  res.send('logout')
})

module.exports = router
