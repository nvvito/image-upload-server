const model = require('./model')
const Joi = require('@hapi/joi')

const resize = require('./resize')

function FileController(model) {
    this.model = model
    this.getAll = async (req, res) => {
        //validate query
        let query = paginationSchema.validate(req.query)
        if (!query.error) {
            //call method
            let result = await this.model.getAll(query.value)
            if (!result.error) return res.send({
                status: true,
                message: result
            })
            else return res.status(500).send({
                status: false,
                message: result.message
            })
        } else return res.status(500).send({
            status: false,
            message: query.error
        })
    }
    this.getOneById = async (req, res) => {
        //params
        let { id } = req.params
        //call method
        let result = await this.model.getOneById(id)
        if (!result.error) return res.send({
            status: true,
            message: `${req.headers.host}/image/${result.name}`
        })
        else return res.status(500).send({
            status: false,
            message: result.message
        })
    }
    this.getInfoById = async (req, res) => {
        //params
        let { id } = req.params
        //call method
        let result = await this.model.getInfoById(id)
        if (!result.error) return res.send({
            status: true,
            message: result
        })
        else return res.status(500).send({
            status: false,
            message: result.message
        })
    }
    this.getPreview = async (req, res) => {
        //params
        let { id } = req.params
        //validate query
        let query = sizeSchema.validate(req.query)
        let size = ''
        if(!query.error) size = `${query.value.size}@`
        //call method
        let result = await this.model.getOneById(id)
        if (!result.error) return res.send({
            status: true,
            message: `${req.headers.host}/image/${size}${result.name}`
        })
        else return res.status(500).send({
            status: false,
            message: result.message
        })
    }
    this.createOne = async (req, res) => {
        //file
        if (!req.file) {
            res.status(500).json({ error: 'Please provide an image' });
        }
        //params
        let { description } = req.body
        //call method
        try {
            let result = await this.model({
                name: req.file.filename,
                size: req.file.size,
                description: description
            }).save()
            await Promise.all([2, 3, 4].map(el => resize.save(req.file, el)))
            return res.send({
                status: true,
                message: result._id
            })
        } catch (err) {
            return res.status(500).send({
                status: false,
                message: err
            })
        }
    }
}

module.exports = new FileController(model)

const paginationSchema = Joi.object().keys({
    page: Joi.number().default(1),
})
const sizeSchema = Joi.object().keys({
    size: Joi.number().min(2).max(4).default(1),
})