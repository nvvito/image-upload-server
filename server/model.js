const { Schema, model } = require('mongoose')

// create film schema
const FileShema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    size: {
        type: Number,
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now()
    },
}, { versionKey: false, })

//file list
FileShema.statics.getAll = async function (page) {
    try {
        let result = await this.find({}).select({ 'size': 1, 'created_at': 1, })
            .skip((page - 1) * 10)
            .limit(10)
        let count = await this.countDocuments()
        return {
            result: result,
            count: count,
        }
    } catch (error) {
        console.log(error, page)
        return {
            error: true,
            message: error,
        }
    }
}

//save file
/*FileShema.statics.createOne = async (data) => {
    try {
        let result = await this.model(data).save()
        return result
    } catch (error) {
        return {
            error: true,
            message: error,
        }
    }
}*/

//get file
FileShema.statics.getOneById = async function(_id) {
    try {
        let result = await this.findById(_id).select({ '_id': 0, 'name': 1, })
        if (result) return result
        else return {
            error: true,
            message: 'ID not found',
        }
    } catch (error) {
        return {
            error: true,
            message: error,
        }
    }
}

//get file
FileShema.statics.getInfoById = async function(_id) {
    try {
        let result = await this.findById(_id).select({ '_id': 0, 'description': 1, 'size': 1, 'created_at': 1, })
        if (result) return result
        else return {
            error: true,
            message: 'ID not found',
        }
    } catch (error) {
        return {
            error: true,
            message: error,
        }
    }
}

const FileModel = model('File', FileShema)

module.exports = FileModel