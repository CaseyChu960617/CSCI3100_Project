const uploadFile = require("../middleware/upload");
const fs = require("fs");

// getAllChatsfunction
exports.uploadProPic = async (req, res) => {
    try {
        await uploadFile(req, res);

        if (req.file == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
          }
      
          res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
          });
        } catch (err) {
          console.log(err);
      
          if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
              message: "File size cannot be larger than 2MB!",
            });
          }
      
          res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
          });
    }
};

exports.uploadProPic = async (req, res) => {
    try {
        await uploadFile(req, res);

        if (req.file == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
          }
      
          res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
          });
        } catch (err) {
          console.log(err);
      
          if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
              message: "File size cannot be larger than 2MB!",
            });
          }
      
          res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
          });
    }
};