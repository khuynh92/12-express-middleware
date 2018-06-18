'use strict';

export default (err, req, res, next) => {
  if(err === 'no body') {
    res.statusCode = 400;
    res.statusMessage = 'Bad Request';
    res.write('Bad Request, body is needed');
    res.end();
  } else {
    next();
  }
};