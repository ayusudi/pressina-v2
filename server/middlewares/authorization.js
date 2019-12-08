const Article = require('../models/article')

function authorization(req, res, next){
  Article.findById(req.params.id)
  .then(result =>{
      if (result.author == req.decoded._id){
        next()
      }
      else {
        console.log(result);
        console.log(req.decoded);
        next({
          status : 401,
          message : 'Unathorized'
        })
      }
  })
  .catch(() =>{
    next({
      status: 404,
      message: 'Not Found'
    })
  })
}

module.exports = authorization