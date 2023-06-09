const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const app = express()
const flash = require('connect-flash')
const routes = require('./routes')
// 載入設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')
const { bindAuthVariablesMiddleware } = require('./middleware/auth')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const PORT = process.env.PORT || 3000
/*
 * 根據 models/index.js 裡的流程，Sequelize 會先進入 models 資料夾，
 * 再透過 file system 去讀取資料夾內的特定 model，記得第一行要先載入資料夾。
 */
// const db = require('./models')
// const Todo = db.Todo
// const User = db.User

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
//adding session setting
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)
// setting body-parser
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)
app.use(flash())
//使用解構函數使用的方法，跟router當中使用的方式一樣，都是使用use添加
app.use(bindAuthVariablesMiddleware)
app.use(routes)
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
