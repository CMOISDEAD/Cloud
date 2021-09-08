const fs = require("fs");
const path = require("path");

const main = (directory) => {
  let fileList = fs.readdirSync(directory);
  if (fileList.length <= 0) {
    return "empyt";
  } else {
    return fileList;
  }
};

module.exports = main;
