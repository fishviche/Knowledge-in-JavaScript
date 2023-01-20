const uploadCtr = {};
const multer = require('multer');
const fs = require('fs')

const storage = multer.diskStorage({
  destination: './public/img/uploads',
  filename: (req, file, cb) => {
    console.log(file)
    const slug = Date.now() + '-' + file.originalname;
    req.body.photos ? '': req.body.photos = []
    req.body.photos.push({ name: file.originalname, slug, route: './public/img/uploads/' + slug, id: req.body.id || ''})
    cb(null, slug)
  }
});
const upload = multer({ storage: storage });
uploadCtr.upload = upload.array('myFile');
uploadCtr.deleteFile = async (req, res) => {
  fs.unlink(req.body.route, (err) => {
    if (err) { return res.json({error: true})};
    return res.json({error: false, message: 'Success'});
  })
}
module.exports = uploadCtr;