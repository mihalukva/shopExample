var express = require("express");
var router = express.Router();
let bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

let contentPath = "./";
function setContentPath(path) {
  contentPath = path;
}

router.post("/upload", bodyParser.json(), function(req, res, next) {
  const uploadFilePath = path.resolve(__dirname, contentPath + "/upload.json");
  fs.writeFile(uploadFilePath, JSON.stringify(req.body), (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
    res.sendStatus(200);
  });
});

router.get("/download", function(req, res, next) {
  const downloadPath = path.resolve(__dirname, contentPath + "/goods.json");
  if (fs.existsSync(downloadPath)) {
    res.sendFile(downloadPath);
  } else {
    res.send("File does not exist");
  }
});

module.exports.router = router ;
module.exports.setContentPath = setContentPath;
