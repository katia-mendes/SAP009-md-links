let fs = require('fs');

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'md', function(err,data) {
 console.log(data);
    });
  });
};

module.exports = mdLinks;