const { json } = require("body-parser");
var bodyParser = require("body-parser");
var moment = require("moment");
var app = require('express')();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
var http = require('http').createServer(app);

var users = [];
var uuid = 0;

app.post('/newuser',(req,res) => {
    var uname = req.body.username;
    let userID = uuid;

    var user = {
        userID : userID,
        username : uname,
        publishes : [],
        followers : []        
    }
    users.push(user);

    uuid++;
    res.json({"message" : "Created new User with ID "+userID});
})

app.get('/users', (req, res) => {
    res.json(users);
})

app.post('/publish/:id', (req,res) => {
    let uid = req.params.id;
    let text = req.body.text;

    let publishes = {
        publishText : '',
        publishedAt : ''
    }
    publishes.publishText = text;
    publishes.publishedAt = moment();

    let userID = Number(uid)
    let published = false;

    users.filter((user)=>{
        return user.userID === userID
    })
    .map((publishingUser) => {
        publishingUser.publishes.push(publishes);
        published = true;
    })
    if(published){
        res.json({"message" : "Successfully published."});
    }
    else {
        res.json({"message" : "Can't find the user."});
    }
})

app.get('/timeline/:id', (req,res) => {

    let uid = req.params.id;
    let userID = Number(uid);

    let userPublishes = [];

    users.filter((user) => {
        return user.userID === userID
    })
    .map((user) => {
        user.publishes.map((publishes) => {
            userPublishes.push(publishes.publishText + " - "+ publishes.publishedAt.from(moment()));
        })
    })

    if (userPublishes){
        res.json(userPublishes)
        return;
    }
    else{
        res.json({"message" : "Can't find the user."});
    }
})

app.post('/follow/:userid/:followerid', (req,res) => {
    let uid = Number(req.params.userid);
    let follower = Number(req.params.followerid);
    let followerUsername = '';
    let username = '';
    let followed = false;

    users.filter((user) => {
        if(user.userID === follower){
            followerUsername = user.username;
        }
        return user.userID === uid
    }).map((user) => {
        username = user.username;
        user.followers.push(follower)
        followed = true;
    })
    
    if(followed){
        res.json({"message" : username+" now follows "+followerUsername})
    }
    else{
        res.json({"message" : "Can't find the user."});
    }

})

app.get('/wall/:userid', (req,res) => {

    let uid = Number(req.params.userid);
    let userWall = [];
    let userFollowers = [];

    let usersNeeded = []

    users.filter((user) => {
        if (user.userID === uid){
            usersNeeded.push(user);
            userFollowers = user.followers;
        }
        userFollowers.map((follower) => {
            if(user.userID === follower){
                usersNeeded.push(user);
            }
        });
    })
    usersNeeded.map((user) => {
        userWall.push(user.publishes.map((pub)=>{
            return (user.username +" - " +pub.publishText + " - " + pub.publishedAt.from(moment()));
        }))
    })
    let allPublishes = [].concat.apply([], userWall);
    res.json(allPublishes);
})

http.listen(3000, () => {
    console.log('listening on port 3000');
});