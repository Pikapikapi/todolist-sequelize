const express = require('express')
const router = express.Router()
//先導入db才能使用
const db = require('../../models')
const Todo = db.Todo

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then((todo) => res.render('detail', { todo: todo.toJSON() }))
    .catch((error) => console.log(error))
})

//todos/new
//導向到todos頁面
router.get('/new', (req, res) => {
  return res.render('new')
})
//設定todos路由
//新增完成後，導回首頁
router.post('/', (req, res) => {
  const userId = req.user.id
  //從req.body中 拿出表單裡的name資料
  const name = req.body.name
  //存入資料庫，新增完成後導回首頁
  return Todo.create({ name, userId })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

//edit功能
//抓取todos內容
router.get('/:id/edit', (req, res) => {
  const userId = req.user.id
  const id = req.params.id
  return Todo.findOne({
    where: {
      id: id,
      userId: userId,
    },
  })
    .then((todo) => res.render('edit', { todo: todo.toJSON() }))
    .catch((error) => console.log(error))
})

//更新todos name
router.put('/:id', (req, res) => {
  const userId = req.user.id
  const id = req.params.id
  //解構賦值
  const { name, isDone } = req.body
  //1.查詢資料
  //2.如果查詢到資料，修改後重新儲存資料
  //3.儲存成功後，導向首頁
  return Todo.findOne({
    where: {
      id: id,
      userId: userId,
    },
  })
    .then((todo) => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/`))
    .catch((error) => console.log(error))
})

//刪除todos by id
router.delete('/:id', (req, res) => {
  const userId = req.user.id
  const id = req.params.id
  return Todo.findOne({
    where: {
      id: id,
      userId: userId,
    },
  })
    .then((todo) => todo.destroy())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

module.exports = router
