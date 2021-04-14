const { uploadProPic, uploadThumbnail, uploadTutorialPic, uploadDiscussionPic }  = require("../services/upload");
const uploadSingleProPic = uploadProPic.single("file");
const uploadSingleThumbnail = uploadThumbnail.single("file");
const uploadSingleTutorialPic = uploadTutorialPic.single('upload');
const uploadSingleDiscussionPic = uploadDiscussionPic.single('upload');

// uploadProPic function
exports.uploadProPic = async (req, res) => {
    try { 
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
  catch(err) {
    res.status(400).send(err.message);
  }
}

exports.uploadThumbnail = async (req, res) => {
  try {
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
  catch(err) {
    res.status(400).send(err.message);
  }
}

exports.uploadTutorialPic = async (req, res) => {
  try {
       uploadSingleTutorialPic(req, res, (err) => {
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
              const imageLocation = req.file.location;
              // Save the file name into database into profile model
              res.json({
              url: imageLocation
          });
        }
      });
  }  catch(err) {
    res.status(400).send(err.message);
  }
}

exports.uploadDiscussionPic = async (req, res) => {
  try {
       uploadSingleDiscussionPic(req, res, (err) => {
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
              const imageLocation = req.file.location;
              // Save the file name into database into profile model
              res.json({
              url: imageLocation
          });
        }
      });
  }  catch(err) {
    res.status(400).send(err.message);
  }
}
