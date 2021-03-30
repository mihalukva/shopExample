"use strict";
var vueExampleRouter = require("./vueExampleRouter.js");
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const buildMode = "production";
let contentPath = "../" + buildMode;

const server = app.listen(3000, "127.0.0.1", () => {
  console.log("listening on *:3000");
});

app.use(express.static(path.join(__dirname, "../production")));

vueExampleRouter.setContentPath(contentPath);
app.use("/", vueExampleRouter.router);

app.get("*", function(req, res, next) {
  const currentPath = path.resolve(__dirname, contentPath + req.path);
  if (fs.existsSync(currentPath)) {
    res.sendFile(currentPath);
  } else {
    const indexPath = path.resolve(__dirname, contentPath + "/index.html");
    res.set("Content-Type", "text/html; charset=utf-8");
    res.sendFile(indexPath);
  }
});
