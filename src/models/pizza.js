'use strict';

import storage from '../lib/storage/data-store';

import uuid from 'uuid/v1';

class Pizza {

  constructor(config) {
    // this.createdOn = new Date();
    // this.title = config && config.title || '';
    // this.content = config && config.content || '';
    // this.Object.values(this)[0] = Object.values(config)[0];
    for(let i = 0; i < Object.keys(config).length; i++) {
      this[Object.keys(config)[i]] = Object.values(config)[i];
    }
 
    this.id = config && config.id || uuid();

  }

  save() {
    return storage.save(this);
  }

  static findAll() {
    return storage.getAll();
  }

  static findOne(id) {
    return storage.get(id);
  }


  static deleteOne(id) {
    return storage.deleteOne(id);
  }

  static updateOne(id, body) {
    return storage.updateOne(id, body);
  }

  static patchOne(id, body) {
    return storage.patchOne(id, body);
  }
}

export default Pizza;