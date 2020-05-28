const express = require('express')
const router = express.Router()

const upload = require('../config/multer')

const { uploadFile, getListOfAllFiles, downloadFile, deleteFile } = require('../controller/files')
const generateExcel = require('../controller/generateExcel')

router.post('/file/upload', upload.single('file'), uploadFile)

router.get('/file/getAll', getListOfAllFiles)

router.get('/file/:id', downloadFile)

router.delete('/file/:id', deleteFile)

router.post('/excel/download', generateExcel)

module.exports = router