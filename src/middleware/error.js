'use strict';

export default (err, req, res, next) => {
  console.log('error occured');
  res.status(500);
  res.send('Some error occured');
  next();
};