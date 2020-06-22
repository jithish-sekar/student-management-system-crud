const express = require("express");
const router = express.Router();
const infoRouter = require("./infoSchema");
var csv = require("fast-csv");
var fs = require("fs");
var multer = require("multer");
var upload = multer({ dest: "uploads" });

router.post("/", async (req, res) => {
  console.log(req.body);
  var data = new infoRouter({
    Name: req.body.Name,
    Age: req.body.Age,
    Location: req.body.Location,
    Department: req.body.Department,
  });
  await data.save();
  res.json(data);
});

//getcall
router.get("/", async (req, res) => {
  var findData = await infoRouter.find();
  res.json(findData);
});

//update
router.put("/update", async (req, res) => {
  var update = await infoRouter.update(
    { _id: req.body._id },
    {
      $set: {
        Name: req.body.Name,
        Age: req.body.Age,
        Location: req.body.Location,
        Department: req.body.Department,
      },
    }
  );
  res.json(update);
});

//delete
router.delete("/del/:id", async (req, res) => {
  var delData = await infoRouter.findByIdAndRemove(req.params.id).then((e) => {
    res.json({ message: "deleted successfully" });
  });
});

router.get("/", (req, res) => {
  res.json("i am from router");
});

router.post("/csvUpload", async (req, res) => {
  console.log(req.body);
  var array = req.body;
  for (var i = 0; i < array.length; i++) {
    var items = array[i].split(",");
    var data = new infoRouter({
      Name: items[0],
      Age: items[1],
      Location: items[2],
      Department: items[3],
    });
    await data.save();
  }
  res.json("success");
});

router.post("/upload", upload.single("uploaded_file"), function (
  req,
  res,
  next
) {
  console.log("uploading file..." + req.toString());
  if (req.file) {
    console.log("req.files...");
    console.log(req.file, req.body);
    var csvfile = req.file.path;
    var stream = fs.createReadStream(csvfile);
    var csvStream = csv
      .parseFile(csvfile)
      .on("data", async (data) => {
        var object = new infoRouter({
          Name: data[0],
          Age: data[1],
          Location: data[2],
          Department: data[3],
        });
        await object.save();
        res.json(object);
      })
      .on("end", function () {
        console.log(" End of file import");
      });

    stream.pipe(csvStream);

    res.json({ success: "Data imported successfully.", status: 200 });
    res.redirect("http://localhost:3000/");
  } else {
    console.log("else case");
  }
});

module.exports = router;
