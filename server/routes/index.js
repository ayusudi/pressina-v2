const express = require ('express')
const router = express.Router()
const user= require('./userRouter')
const article = require('./articleRouter')

router.get('/', (req, res, next)=>{
    res.send("Pressina Server")
})
router.use('/users', user)
router.use('/articles', article)



module.exports = router