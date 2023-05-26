const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')
const app = express()
const PORT = 3000
/*
 * 根據 models/index.js 裡的流程，Sequelize 會先進入 models 資料夾，
 * 再透過 file system 去讀取資料夾內的特定 model，記得第一行要先載入資料夾。
 */
const db = require('./models')
const Todo = db.Todo
const User = db.User

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
// setting body-parser
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/users/login', (req, res) => {
  res.render('login')
})

app.post('/users/login', (req, res) => {
  res.send('login')
})

app.get('/users/register', (req, res) => {
  res.render('register')
})

app.post('/users/register', (req, res) => {
  const { name, email, password } = req.body
  User.create({ name, email, password }).then((user) => res.render('register'))
})

app.get('/users/logout', (req, res) => {
  res.send('logout')
})
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
