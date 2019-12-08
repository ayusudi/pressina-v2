const express = require('express')
const router = express.Router()
const ArticleController = require('../controllers/articleController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const images = require("../helpers/image.js");

router.post("/upload", images.multer.single("image"),
images.sendUploadToGCS,
(req, res) => {
    res.send({
        status: 200,
        gcsName: req.body.fileName,
        message: "Your file is successfully uploaded",
        link: req.file.cloudStoragePublicUrl
    });
}
);
router.use(authentication)
router.post('/', ArticleController.create)
router.get('/mine', ArticleController.getMyArticle)
// router.post('/mine', ArticleController.getMyArticle) 
router.delete('/', ArticleController.destroyAll)
router.post('/tag', ArticleController.filterTag)
router.post('/search', ArticleController.filterArticle)
router.use('/:id', authorization)
router.get('/:id', ArticleController.getOne)
router.put('/:id', images.multer.single("featured_image"), images.sendUploadToGCS, ArticleController.updatePut)
router.delete('/:id', ArticleController.destroy)

module.exports = router