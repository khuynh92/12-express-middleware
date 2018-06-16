'use strict';

export default (req, res, next) => {
  console.log('Route not found');
  res.status(404);
  res.send('404 ERROR: route not found');
  // next();
  res.end();
};