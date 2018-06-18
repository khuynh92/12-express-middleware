'use strict';

import express from 'express';

const router = express.Router();

import modelFinder from '../middleware/models.js';

import fs from 'fs';

router.param('model', modelFinder);

router.get('/', (req, res) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';

  fs.readFile(__dirname + '/../../public/index.html', (err, data) => {
    let message = `HOMEPAGE <br><br> access api by going  <a href='api/v1/pizza'>here`;
    res.write(data.toString().replace('{{template}}', message));
    res.end();
  });
});

router.get('/api/v1/:model', (req, res, next) => {
  console.log(req.model);
  req.model.findAll()
    .then(data => sendJSON(res, data))
    .catch(next);
});

router.get('/api/v1/:model/:id', (req, res, next) => {
  req.model.findOne(req.params.id)
    .then(data => sendJSON(res, data))
    .catch(next);
});

router.post('/api/v1/:model', (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    next('no body');
  } else {
    let newModel = new req.model(req.body);

    newModel.save()
      .then(data => sendJSON(res, data))
      .catch(next);
  }
});

router.delete('/api/v1/:model/:id', (req, res, next) => {
  req.model.deleteOne(req.params.id)
    .then(() => {
      res.statusCode = 204;
      res.statusMessage = 'OK';
      res.end();
    })
    .catch(next);
});

router.put('/api/v1/:model/:id', (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    next('no body');
  }
  else {
    req.model.updateOne(req.params.id, req.body)
      .then(data => sendJSON(res, data))
      .catch(next);
  }
});

router.patch('/api/v1/:model/:id', (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    next('no body');
  }
  else {
    req.model.patchOne(req.params.id, req.body)
      .then(data => sendJSON(res, data))
      .catch(next);
  }
});



let sendJSON = (res, data) => {

  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(data));
  res.end();

};


export default router;