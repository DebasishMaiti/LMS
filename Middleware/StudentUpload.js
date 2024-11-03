const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/students')
    },
    filename: function (req, file, cb) {
       
      cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop())
    }
    
  })
  
exports.StudentUpload = multer({ storage: storage })