'use strict';

import requireAll from 'require-directory';


const models = requireAll(module, '../models');

export default (req, res, next) => {

  try {
    let model = req && req.params && req.params.model;
    console.log(model);
    console.log(models);
    if(model && models[model] && models[model].default) {
      req.model = models[model].default;
      next();
    } else {
      throw 'Model does not exist';
    }
  } catch (error) {
    throw error;
  }
};