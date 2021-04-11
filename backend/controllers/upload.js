const { uploadProPic, uploadThumbnail }  = require("../services/upload");
const uploadSingleProPic = uploadProPic.single("file");
const uploadSingleThumbnail = uploadThumbnail.single("file");

// uploadProPic function
exports.uploadProPic = async (req, res) => {
    console.log(req.file);
    uploadSingleProPic(req, res, (err) => {
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
  });
}

exports.uploadThumbnail = async (req, res) => {
  console.log(req.file);
  uploadSingleThumbnail(req, res, (err) => {
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
});
}
