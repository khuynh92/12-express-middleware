'use strict';

import superagent from 'superagent';
import app from '../../../src/app.js';


describe('app module', () => {

  beforeAll( () => {
    app.start(3005);
  });

  afterAll( () => {
    app.stop();
  });


  it('should return 200 for homepage', () => {
    
    return superagent.get('http://localhost:3005')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual(expect.stringContaining('<!DOCTYPE '));
      });
  });


  it('should return an empty object for get at api/v1/pizza', () => {
    return superagent.get('http://localhost:3005/api/v1/pizza')
      .then(res => {
        expect(res.statusCode).toBe(200);
        expect(res.text).toEqual(`{}`);
      });
  });

  it('should return an object for get at api/v1/pizza/pineapples', () => {

    let obj = {pineapples:'do not belong on pizza', id:'pineapples'};
    return superagent.post('http://localhost:3005/api/v1/pizza')
      .send(obj)
      .then(() => {
        return superagent.get('http://localhost:3005/api/v1/pizza/pineapples')
          .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.text).toEqual(expect.stringContaining('{"pineapples":"do not belong on pizza","id"'));
          });
      });

  });


  it('handles a good post request', () => {
    let obj = {pineapples:'do not belong on pizza'};
    return superagent.post('http://localhost:3005/api/v1/pizza')
      .send(obj)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual(expect.stringContaining('{"pineapples":"do not belong on pizza","id"'));
      })
      .catch(console.err);
  });

  it('handles a post request with no body as a 400 error', () => {
    return superagent.post('http://localhost:3005/api/v1/pizza')
      // .then(response => false)
      .catch(err => {
        expect(err.status).toBe(400);
        expect(err.response.text).toEqual('Bad Request, body is needed');
      });
  });

  it('should handle good delete request', () => {
    let obj = {pineapples:'do not belong on pizza', id:'pineapples'};
    return superagent.post('http://localhost:3005/api/v1/pizza')
      .send(obj)
      .then(() => {
        return superagent.delete('http://localhost:3005/api/v1/pizza/pineapples')
          .then(response => {
            expect(response.statusCode).toBe(204);
          });
      });  
  });
  
  it('should handle a bad delete request', () => {
    return superagent.delete('http://localhost:3005/api/v1/pizza/calzones')
      // .then(response => false)
      .catch(err => {
        expect(err.response.text).toEqual('404 ERROR: route not found');
      });
  });
});