const express = require('express');
const router = express.Router();
const upload = require("../middlewares/upload");
const singleUpload = upload.single("file");

router.post("/uploadProPic", function (req, res)  {

  singleUpload(req, res, function (err) {
    if (err) {
      return res.json({
        success: false,
        errors: {
          title: "Image Upload Error",
          detail: err.message,
          error: err,
        },
      });
    }
    else
    //let update = { profileImage: req.file.location };
      console.log(req.files.location);
    /*User.findByIdAndUpdate(uid, update, { new: true })
      .then((user) => res.status(200).json({ success: true, user: user }))
      .catch((err) => res.status(400).json({ success: false, error: err }));
  })*/

})});


module.exports = router;