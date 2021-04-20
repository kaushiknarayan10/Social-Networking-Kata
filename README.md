# Social-Networking-Kata

## Project to implement the core domain logic for a social networking application (similar to Twitter) satisfying the features below:
- Publishing
- Timeline
- Following

## Description
This project uses Nodejs and Expressjs to create REST APIs to fetch and put data in a single session. The poroject follows TDD, test cases uses Mocha, Should and Supertest. Here's a list of the REST APIs endpoint:

- POST `/newuser` : Adds a new User with the specified Username in the request body. Returns the User ID of the newly created User.
  - Request body : `{'username' : 'Alice'}`
  - Returns : `Created new User with ID 0`
- GET `/users` : Returns the list of all Users in the app.
  - Returns : 
```javascript
{ 
userID : 0,
username : "Alice",
publishes : [],
followers : []
}
```
- POST `/publish/:userid` : Publishes the text provided in the request body for the User specified in the request parameter `userid` in the URL.
  - Request body = `{'text' : 'Yayy! My first Publish!!'}`
- GET `/timeline/:userid` : Returns all the Publishes for the User specified in the request parameter `userid` in the URL.
