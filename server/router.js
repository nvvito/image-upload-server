const router = require('express').Router()

const file = require('./controller')
const upload = require('./uploadConfig')

//file list
router.get('/file', file.getAll)
//save file
router.post('/file', upload, file.createOne)
//get file
router.get('/file/:id', file.getOneById)
//file info
router.get('/file/info/:id', file.getInfoById)
//file preview
router.get('/file/preview/:id', file.getPreview)
//export 
module.exports = router