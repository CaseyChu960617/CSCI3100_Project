const upload = require("../services/ImageUpload");
const singleUpload = upload.single("image");

router.post("/upload", function (req, res) {
  const { uid } = req.body;

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

    let update = { profileImage: req.file.location };

    User.findByIdAndUpdate(uid, update, { new: true })
      .then((user) => res.status(200).json({ success: true, user: user }))
      .catch((err) => res.status(400).json({ success: false, error: err }));
  });
});