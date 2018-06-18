
[![Build Status](https://travis-ci.com/khuynh92/12-express-middleware.svg?branch=master)](https://travis-ci.com/khuynh92/12-express-middleware)

## 12-express-middleware

  Travis: https://travis-ci.com/khuynh92/12-express-middleware  
  Heroku: https://khoa-12-express-middleware.herokuapp.com  
  PR: https://github.com/khuynh92/11-express-middleware/pull/1  
in order to run this app:

 1. clone this repository

 2. in your root folder, create a .env file and set PORT to your desired port.  example: `PORT = 3000` 
 3. in your terminal, locate where you cloned this repository, and then type the command:  
      `npm start`  
 4. in your broswer go to  
`http://localhost:<YOURPORTHERE>`  

 5. Here, you can test different RESTful routes to ensure GET requests are working for `/api/v1/pizza`  
    `http://localhost::<YOURPORTHERE>/api/v1/pizza/<ID>!`   

 6. To test POST, use your choice of of tools that makes requests to servers (httpie, postman). Make sure to send an object body, or a 400 error will appear. POST requests will only work on api/v1/pizza.

 7. To test DELETE, use your choice of of tools that makes requests to servers (httpie, postman). If no id query is passed, a 404 error will appear. DELETE requests will only work on pathnames with id queries: `api/v1/pizza/<your id here>`.


This lab was built off of codefellows 09-rest-persistence demo code.
