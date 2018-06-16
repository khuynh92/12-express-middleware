'use strict';

import fs from 'fs';
const storage = {};

const root = `${__dirname}/../../../data`;

let readPromise = function(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) { reject(err); }
      else { resolve(data); }
    });
  });
};

storage.getAll = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(root, (err,files) => {
      if(err) reject(err);

      let allFiles = [];

      while(files.length) {
        let file = files.shift();
        file = `${root}/${file}`;
        if ( file.match(/\.json/) ) { allFiles.push( readPromise(file)); }
      }

      Promise.all(allFiles)
        .then(contents => {
          let database = contents.reduce((db,data) => {
            let obj = JSON.parse(data.toString());
            db[Object.keys(obj)[0]] = Object.values(obj)[0];
            return db;
          }, {});
          resolve(database);
        })
        .catch(console.log);
    });
  });
};

storage.get = id => {
  return new Promise ((resolve, reject) => {
    fs.readFile(`${root}/${id}.json`, (err, data) => {
      if (data) {
        resolve(JSON.parse(data.toString()));
      } else {
        reject(`${id} not found`);
      }
    });
  });
};

storage.save = (data) => {
  return new Promise( (resolve,reject) => {
    if ( ! data.id ) { reject('No Record ID Specified'); }

    let file = `${root}/${data.id}.json`;
    let text = JSON.stringify(data);
    fs.writeFile( file, text, (err) => {
      if(err) { reject(err); }
      resolve(data);
    });
  });
};


storage.deleteOne = id => {
  return new Promise((resolve, reject) => {
    fs.unlink(`${root}/${id}.json`, (err) => {
      if(err) { reject(err); }
      resolve(`${id} has been deleted found`);
    });
  });
};

storage.updateOne = (id, body) => {
  return new Promise((resolve, reject) => {
    if ( ! body.id ) { reject('No Record ID Specified'); }

    let file = `${root}/${id}.json`;
    let text = JSON.stringify(body);

    fs.writeFile(file, text, (err) => {
      if(err) { reject(err); }
      resolve(body);
    });

  });
};

storage.patchOne = (id, body) => {
  return new Promise((resolve, reject) => {

    storage.get(id)
      .then(data => {
        Object.entries(body).forEach(prop => {
          data[prop[0]] = prop[1];
        });

        let file = `${root}/${id}.json`;
        let text = JSON.stringify(data);

        fs.writeFile(file, text, (err) => {
          if(err) { reject(err); }
          resolve(data);
        });
      });
    
  });
};

export default storage;