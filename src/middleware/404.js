'use strict';

export default (req, res) => {
  res.status(404);
  res.write('404 ERROR: route not found');
  res.end();
};