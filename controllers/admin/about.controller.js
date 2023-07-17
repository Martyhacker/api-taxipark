const catchAsync = require("../../utils/catchAsync");
const { About } = require("../../models");

exports.getAboutUs = catchAsync(async (req, res) => {
  const aboutus = await About.findOne();
  return res.status(200).send(aboutus);
});

exports.editAboutUs = catchAsync(async (req, res, next) => {
  const aboutus = await About.findOne();
  await aboutus.update(req.body);

  return res.status(200).send(aboutus);
});