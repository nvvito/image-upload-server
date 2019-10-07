var Jimp = require('jimp')
const path = require('path')

function Resize() {
    this.save = async (file, size) => {
        let filename = `${size}@${file.filename}`
        await Jimp.read(file.path)
            .then(file => {
                let w = 0, h = 0
                switch (size) {
                    case 2: {
                        w = 800
                        h = 600
                        break
                    }
                    case 3: {
                        w = 400
                        h = 300
                        break
                    }
                    case 4: {
                        w = 200
                        h = 150
                        break
                    }
                }
                file
                    .resize(w, Jimp.AUTO /* h */)
                    .write(path.resolve(`./upload/${filename}`))
            })
            .catch(err => {
                console.log(err)
            })
        return filename
    }
}
module.exports = new Resize()