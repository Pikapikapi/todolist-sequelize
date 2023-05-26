module.exports = {
  //middleware
  //可以依照路由來設定訪問順序
  //router.get('/route', authenticator, A, B, C, ...)
  //有呼叫next就會進入下一個function，沒有的話就會停留在原本的位置
  //router.get('/route', authenticator, )
  //router.get('/route', authenticator, next)
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', '請先登入才能使用！')
    res.redirect('/users/login')
  },
  bindAuthVariablesMiddleware: (req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    res.locals.success_msg = req.flash('success_msg') // 設定 success_msg 訊息
    res.locals.warning_msg = req.flash('warning_msg') // 設定 warning_msg 訊息
    next()
  },
}
