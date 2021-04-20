# Social-Networking-Kata

## Project to implement the core domain logic for a social networking application (similar to Twitter) satisfying the features below:
- Publishing
- Timeline
- Following

## Code

1. Users
  - Every User is an object of the following type : 
    ```javascript
    {
      userID : <Unique ID of the User>,
      username : <Name of the created User>,
      publishes : [List of all the Publishes made by the User]
      followers : [User IDs of all the Users that are followed]
    }
    ```
  - Adding a User is a simple process that generates a unique User ID and creates a new User object with that ID. This User is then added to a simple arrya that contains all the Users.
  
  - Viewing all Users just returns the master array that contains all Users

2. Publishes
  - Every Publish is an object of the following type : 
    ```javascript
    {
      publishText : 'Text that you want to publish on your Timeline',
      publishedAt : Date and Time of when the text was Published
    }
    ```
  - Adding a new Publish takes the text provided in the Request body for the User specified in the POST URL, filters the Users array for the particular User and adds a new Publish object to the User's `publishes` array.

3. Following
  - When a Follow POST request is made, the code takes the User ID(given in the URL) and filters the Users array for the specific User and adds the Follower ID(also given in the URL) to the User's `followers` array.

4. Timeline
  - To view the User's Timeline, the code takes the User ID (given in the URL) and filters the Users array for the specific User and returns the `publishes` array for that User.

5. Wall
  - To view the User's Wall, the code takes the User ID (given in the URL) and filters the Users array for the specific User and stores the User ID in a `usersNeeded` array. It also adds the User's Followers to the `usersNeeded` array.
  - Now that we have all the User IDs whose Publishes we need to publish, we filter the Users array for these Users and spit out the Publishes array for all the Users.


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
