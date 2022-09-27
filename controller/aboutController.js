const model = require("../models");
const aboutDB = model.about;

//@desc Get About Info
//@route GET portfolio/en/about
//@access Private
const getAbout = async (req, res) => {
  const about = await aboutDB.find();
  res.status(200).json({ about });
};

//@desc Post About Info
//@route POST portfolio/en/about
//@access Private
const postAbout = async (req, res) => {
  if (!req.body.title || !req.body.description || !req.body.imgUrl) {
    res.status(400).json({
      error: "wrong requisiton format",
      correct: {
        title: "String",
        description: "String",
        imgUrl: "String",
      },
    });
  }

  const about = await aboutDB.create({
    title: req.body.title,
    description: req.body.description,
    imgUrl: req.body.imgUrl,
  });

  res.status(200).json({ msg: "Successfully Created", about });
};

//@desc Put About Info
//@route PUT portfolio/en/about
//@access Private
const putAbout = async (req, res) => {
  const aboutFind = await aboutDB.findById(req.params.id);

  if (!aboutFind) {
    res.status(400);
    throw new Error("About not found.");
  }

  const updateAbout = await aboutDB.findByIdAndUpdate(res.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ message: "Successfully updated", updateAbout });
};

//@desc Delete About Info
//@route DELETE portfolio/en/about
//@access Private
const deleteAbout = async (req, res) => {
  const findAbout = await aboutDB.findById(req.params.id);
  if (!findAbout) {
    return res.status(400).json({ message: "Not found" });
  }
  const deleted = await aboutDB.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Successfully deleted", deleted });
};

module.exports = { getAbout, postAbout, putAbout, deleteAbout };