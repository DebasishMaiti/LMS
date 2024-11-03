const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/teacher')
    },
    filename: function (req, file, cb) {
       
      cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop())
    }
  })
  
exports.TeacherUpload = multer({ storage: storage })