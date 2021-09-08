const path = require("path");
const express = require("express");
const router = express.Router();

const fileList = require("../helpers/files");
const removeFile = require("../helpers/remove");

// Global
var dirPath = path.resolve(__dirname + "../../../public/docs/");

router.get("/", function (req, res) {
  let data = {
    folders: fileList(dirPath),
  };
  res.render("home", data);
});

router.post("/upload", function (req, res) {
  let sampleFile;
  let uploadPath;
  let fileType;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  fileType = req.body.fileName;
  sampleFile = req.files.sampleFile;
  uploadPath = `${dirPath}/${fileType}/${sampleFile.name}`;

  sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);
    res.redirect("/");
  });
});

router.get("/preview/:filename", (req, res) => {
  let filename = req.params.filename;
  res.send(`Preview -> ${filename}`);
});

router.get("/download/:filename", (req, res) => {
  let filename = `${dirPath}/${req.params.filename}`;
  res.download(filename, (err) =>
    err ? console.log(err) : console.log("succesfully")
  );
});

router.get("/delete/:filename", (req, res) => {
  removeFile(dirPath, req.params.filename);
  res.redirect("/");
});

router.get("/docs/:folder", (req, res) => {
  let folder = req.params.folder;
  let directory = `${dirPath}/${folder}`;
  let data = {
    typeFile: folder,
    preview: folder === "pictures" ? true : false,
    files: fileList(`${directory}`),
  };
  res.render("home", data);
});

module.exports = router;
