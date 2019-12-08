const Article = require('../models/article')

class ArticleController {
  static create(req, res, next) {
    const author = req.decoded._id
    const { title, content, featured_image , tags} = req.body
    Article.create({
      title,
      content,
      author,
      featured_image,
      tags
    })
      .then(data => {
        res.status(201).json({
          message: "Success Create Article",
          article: data
        })
      })
      .catch(err => {
        next({
          status: 400,
          error: err
        })
      })
  }
  static getMyArticle(req, res, next){
    console.log('fetching');
    Article.find({
      author : req.decoded._id
    })
    .sort({createdAt : -1})
    .populate({path :'author', select: 'name email image'})
    .then(data =>{
      // console.log(data);
      res.status(200).json({
        message: 'List of Your Article',
        articles: data
      })
    })
    .catch(next)
  }
  static getOne(req, res, next) {
    Article.findById(req.params.id)
      .then(data => {
        res.status(200).json({
          message: 'Here is the article',
          article: data
        })
      })
      .catch(next)
  }
  static getByTitle(req, res, next){
    let search = req.params.search
    Article.find({
      author : req.decoded._id
    })
    .sort({createdAt : -1})
    .then(data =>{
      let articles = []
      data.forEach(el =>{
        if (el.title.includes(search)){
          articles.push(el)
        }
        // console.log(articles);
        res.status(200).json({
          message: `Here's your result`,
          articles : articles
        })
      })
    })
    .catch(next)
  }
  static updatePut(req, res, next) {
    const {title ,content, featured_image} = req.body 
    let tags = req.body.tags.split(',')
    // console.log(req.body);
    Article.updateOne(
      { _id: req.params.id },{
        title,
        content, 
        featured_image,
        tags
      }
      )
      .then(data => {
        res.status(200).json({
          messange: 'Success Updated',
        })
      })
      .catch(err => {
        next({
          status: 400,
          message: err
        })
      })
  }
  static destroy(req, res, next) {
    Article.deleteOne(
      { _id: req.params.id }
    )
      .then(data => {
        res.status(200).json({
          message: 'Success Deleted',
          _id : req.params.id
        })
      })
      .catch(next)
  }

  static filterTag(req, res, next){
    Article.find({ tags : {$all : req.body.tags},  author : req.decoded._id})
    .sort({createdAt : -1})
    .then(data =>{
      res.status(200).json(data)
    })
    .catch(next)
  }

  static filterArticle(req, res, next){
    Article.find({title : {$regex : req.body.search}, author : req.decoded._id})
    .then(data =>{
      console.log(data);
      res.status(200).json(data)
    })
    .catch(next)
  }

  static destroyAll(req, res, next){
    Article.deleteMany({author : req.decoded._id})
    .then(({data}) =>{
      res.status(200).json({
        message : 'Success Delete All Your Article'
      })
    })
    .catch(next)
  }
}

module.exports = ArticleController