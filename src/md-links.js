import { read } from './verifyFile.js';
import { filterLinks, validateFunction } from './verifyLinks.js';

export default function mdLinks(path, option) {
  return new Promise((resolve, reject) => {
    read(path).then(fileContent => {
      if (!Array.isArray(fileContent)) {
        filterLinks(fileContent).then(linksObj => {
          if (!option.validate) {
            resolve(linksObj);
          }
          else {
            validateFunction(linksObj)
              .then(arrayLinkResolved => {
                resolve(arrayLinkResolved);
              });
          }
        });
      } else {
        fileContent.forEach((objContent) => {
          filterLinks(objContent).then((linksObj) => {
            resolve(linksObj);
          }).catch(reject);
        });
      };
    });
  });
}
