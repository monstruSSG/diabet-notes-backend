const multer = require('multer')
const path = require('path')

console.log(path.join(__dirname, '..', '..', 'files'))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', '..', 'files'))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })

module.exports = upload