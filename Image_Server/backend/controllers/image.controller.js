const imageCtr = {};
const Image = require('../models/Image');

imageCtr.getOneImage = async (req, res) => {
  id = req.params.id
  res.json(await Image.findById(id));
}
imageCtr.getImages = async (req, res) => {
  const response = await Image.find();
  console.log(response);
  res.json(response);
}
imageCtr.saveImage = async (req, res) => {
  let response = {
    data: []
  }
  for(let data of req.body.photos){
    const { name, slug, route } = data;
    const newImage = new Image({ name, slug, route });
    response.data.push(await newImage.save());
  }
  res.json(response);
}
imageCtr.deleteImage = async (req, res, next) => {
  id = req.params.id
	const result = await Image.findByIdAndDelete(id);
  req.body.route = result.route;
  next();
}
imageCtr.updateImage = async(req, res) => {
  const { name, slug, route } = req.body;
  id = req.params.id
	res.json(await Image.findByIdAndUpdate(id, { name, slug, route }));
}
module.exports = imageCtr;