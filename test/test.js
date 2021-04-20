var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:3000");

describe("Unit Tests for Social Network",function(){
    it("Should create a New User 'Alice' with ID 0", () => {
        server
        .post("/newuser")
        .send({"username" : "Alice"})
        .expect("Content-type",/json/)
        .end( (req,res) => {
            res.body.message.should.equal("Created new User with ID 0");
        });
    });

    it("Should create another User 'Bob' with ID 1", () => {
        server.post("/newuser")
        .send({"username" : "Bob"})
        .expect("Content-type",/json/)
        .end( (req,res) => {
            res.body.message.should.equal("Created new User with ID 1");
        })
    });

    it("Should create another User 'Charlie' with ID 2", () => {
        server.post("/newuser")
        .send({"username" : "Charlie"})
        .expect("Content-type",/json/)
        .end( (req,res) => {
            res.body.message.should.equal("Created new User with ID 2");
        })
    });    

    it("Should 'GET' us 3 Users", () => {
        server
        .get("/users")
        .expect("Content-type",/json/)
        .end((req,res) => {
            res.status.should.equal(200)
        });
    });

    it("Should publish a text for Alice", () => {
        server
        .post("/publish/0")
        .send({"text":"I love the weather today!"})
        .expect(200)
        .end((req,res) => {
            res.body.message.should.equal("Successfully published.");
            res.status.should.equal(200);
        });
    });

    it("Should publish a text for Bob", () => {
        server
        .post("/publish/1")
        .send({"text":"Darn! We lost!"})
        .expect(200)
        .end((req,res) => {
            res.body.message.should.equal("Successfully published.");
            res.status.should.equal(200);
        });
    });

    it("Should throw an Error while publishing for User John", () => {
        server
        .post("/publish/27")
        .send({"text":"My First Publish!"})
        .end((req,res) => {
            res.body.message.should.equal("Can't find the user.");
        });
    });    

    it("Should show the Timeline for Alice", () => {
        server.get("/timeline/0")
        .expect(200)
        .end((req,res) => {
            res.status.should.equal(200);
        })
    })

    it("Should show the Timeline for Bob", () => {
        server.get("/timeline/0")
        .expect(200)
        .end((req,res) => {
            res.status.should.equal(200);
        })
    })

    it("Should allow Alice to follow Bob", () => {
        server.post("/follow/0/1")
        .expect(200)
        .end((req,res) => {
            res.body.message.should.equal("Alice now follows Bob");
            res.status.should.equal(200);
        })
    })

    it("Should show Alice's wall with Alice and Bob's Publishes", () => {
        server.get("/wall/0")
        .expect(200)
        .end((req,res) => {
            res.body.length.should.equal(2);
            res.status.should.equal(200);
        })
    })
});