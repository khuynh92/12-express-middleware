'use strict';

import express from 'express';
import morgan from 'morgan';

import errorHandler from './middleware/error.js';
import notFound from './middleware/404.js';

import cors from './middleware/cors.js';

import noBody from './middleware/400.js';

let app = express();

app.use(cors);

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

import router from './api/api.js';

app.use(router);

app.use(noBody);

app.use(notFound);

app.use(errorHandler);



let isRunning = false;

let server;

module.exports = {  
  start: (port) => {
    if(! isRunning) {
      server =  app.listen(port, (err) => {
        if(err) { throw err; }
        isRunning = true;
        console.log('Server running on', port);
      });
    }
    else {
      console.log('Server is already running');
    }
  },

  stop: () => {
    server.close( () => {
      isRunning = false;
      console.log('Server has been stopped');
    });
  },
};