const upload = require("../services/upload");
const singleUpload = upload.single("file");

// uploadProPic function
exports.uploadProPic = async (req, res) => {
    console.log(req.file);
    singleUpload(req, res, (err) => {
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
      else {
          const imageName = req.file.key;
          const imageLocation = req.file.location;
          // Save the file name into database into profile model
          res.json( {
          image: imageName,
          location: imageLocation
      } );
    }
      //let update = { profileImage: req.file.location };
      /*User.findByIdAndUpdate(uid, update, { new: true })
        .then((user) => res.status(200).json({ success: true, user: user }))
        .catch((err) => res.status(400).json({ success: false, error: err }));
    })*/
  
  });
}
