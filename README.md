# Social-Networking-Kata

## Project to implement the core domain logic for a social networking application (similar to Twitter) satisfying the features below:
- Publishing
- Timeline
- Following

## Description
This project uses Nodejs and Expressjs to create REST APIs to fetch and put data in a single session. The poroject follows TDD, test cases uses Mocha, Should and Supertest. Here's a list of the REST APIs endpoint:

- POST `/newuser` : Adds a new User with the specified Username in the request body. Returns the User ID of the newly created User.
- - POST body = `{'username' : <Your Username>}`
- GET `/users` : Returns the list of all Users in the app.