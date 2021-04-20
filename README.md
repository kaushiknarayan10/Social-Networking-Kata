# Social-Networking-Kata

## Project to implement the core domain logic for a social networking application (similar to Twitter) satisfying the features below:
- Publishing
- Timeline
- Following

## Description
This project uses Nodejs and Expressjs to create REST APIs to fetch and put data in a single session. The poroject follows TDD, test cases uses Mocha, Should and Supertest. Here's a list of the REST APIs endpoint:

- POST `/newuser` : Adds a new User with the specified Username in the request body. Returns the User ID of the newly created User.
  - Request body : 
  ```javascript
  {
    'username' : 'Alice'
  }
  ```
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
  - Request body : 
  ```javascript
  {
    'text' : 'Yayy! My first Publish!!'
  }
  ```
- GET `/timeline/:userid` : Returns all the Publishes for the User specified in the request parameter `userid` in the URL.
  - Returns : 
  ```javascript
  [
    'Yayy! My first Publish!! - a few seconds ago'
  ]
  ```
- POST `/follow/:userid/:followerid` : Adds `followerid` to the list of Users that `userid` follows.
  - Returns : 
  ```javascript
  [
    'Alice now follows Bob'
  ]
   ```
- GET `/wall/:userid` : Shows the `userid` User's Wall. The Wall will have Publishes by the User and all the User's that they Follow.
  - Returns : 
  ```javascript
  [
    'Alice - Yayy! My first Publish!! - a few seconds ago',
    'Bob - This is a neat little app! - 1 minute ago'
  ]
  ```

## Testing and Running
To test and run the app, clone the project in your local directory.
Run `npm install` to download and install all the dependencies specified in the `package.json` file.
Run `node index.js` to start the server on `http://localhost:3000`
Open another terminal paralelly and run `npm test` to run all the Test Cases.
