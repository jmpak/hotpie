
routes = (app) ->

  app.get '/login', (req, res) ->
    res.render "#{__dirname}/views/login",
      title: 'Login'
      stylesheet: 'login'

  app.post '/sessions', (req, res) ->
    if ('piechef' is req.body.user) and ('12345' is req.body.password)
      req.session.currentUser = req.body.user
      res.redirect '/login'
      return
    res.redirect '/login'

module.exports = routes
