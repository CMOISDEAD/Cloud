const fs = require('fs')

const main = (dir, filename) =>{
    let fullPath = `${dir}/${filename}`
    fs.unlink(fullPath, (err) =>{
        err ? console.log(err): console.log("removed")
    })
}

module.exports = main