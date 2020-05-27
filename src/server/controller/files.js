const stream = require('stream')

const Files = require('../models/files')

const uploadFile = async (req, res) => {

    console.log('file: ', req.file)
    try {
        const uploadedFile = await Files.create({
            type: req.file.mimetype,
            name: req.file.originalname,
            data: req.file.buffer
        })

        res.status(200).send({message: `File ${req.file.originalname} was uploaded successfully`})

    } catch(err) {
        res.status(500).send({message: 'Some internal err' + err})
    }
}

const getListOfAllFiles = async (req, res) => {

    try {
        const allFiles = await Files.findAll({
            attributes: ['id', 'name']
        })

        res.status(200).send({allFiles})
        
    } catch(err) {
        res.status(500).send({message: 'Some internal err' + err})
    }
}

const downloadFile = async (req, res) => {

    try {
        const id = req.params.id

        const file = await Files.findByPk(id)

        if(!file) {
            return res.status(404).send({message: 'File with given id does not exist'})
        }

        const fileContents = Buffer.from(file.data, 'base64')
        const readStream = new stream.PassThrough()

        readStream.end(fileContents)
        
        res.set('Content-disposition', 'attachment; filename= ' + file.name)
        res.set('Content-type', file.type)

        readStream.pipe(res)

    } catch(err) {
        res.status(500).send({message: 'Some internal err' + err})
    }
}

const deleteFile = async (req, res) => {

    try {
        const id = req.params.id

        await Files.destroy({
            where: {
                id
            }
        })

        const allFiles = await Files.findAll({
            attributes: ['id', 'name']
        })

        res.status(200).send({message: 'File has been deleted', allFiles})

    } catch (err) {
        res.status(500).send({message: 'Some internal err' + err})
    }

}

module.exports = { uploadFile, getListOfAllFiles, downloadFile, deleteFile }