
const Router = require('./router.js');
const users = require('./template/users.js');

const router = new Router();
router.listen(3000, "0.0.0.0");


router.get("/index", (req, res) => {
    res.html("index.html");
})

router.get("/contactus", (req, res) => {
    res.html("contactus.html");
})

router.get("/login", (req, res) => {
    res.html("login.html");
})

router.get("/cats", (req, res) => {
    res.html("/cats.html");
})



router.post("/secure_login", (req, res) => {

    if (req.body.newUsername && req.body.newPassword) {
        users.users.push({ username: req.body.newUsername, password: req.body.newPassword });
        req.body.username = req.body.newUsername;
        req.body.password = req.body.newPassword;
    }
    let user = users.users.find((user) => req.body.password === user.password && req.body.username === user.username);

    //give messages based on authentication status
    if (user) {
        req.session.user = user;
        console.log(req.body.username + " logged in");
        res.setHeader("location", "/myaccount");  //this is how we redirect the route
        res.statusCode = 302;

    } else {
        console.log("There was a failed login attempt");

        // res.write("login failed");
        res.html('login.html');
    }

})

router.get("/createaccount", (req, res) => {
    res.html("/createaccount.html");
})

router.get("/users_search", (req, res) => {
    //if form is submitted from search form, push the search onto previousSearches, and 
    users.previousSearches.push(req.query);
    const result = users.users.find((user) => user.username === req.query.userSearch);
    req.session.resultUser = result;

    res.html("/search_results.html")
})

router.get("/myaccount", (req, res) => {


    //if pubg slider SEND IT button pressed and query includes pubgstoke..
    if (req.query.pubgstoke !== undefined) {
        console.log(req.session.user.username + " is Stoked to level " + req.query.pubgstoke);
        req.session.user.pubgstoke = req.query.pubgstoke;
    }


    res.html("/myaccount.html");
})

router.get("/user_details", (req, res) => {
    if (req.session.user) {
        res.write(JSON.stringify(req.session.user));
    }
    if (req.session.resultUser) {
        res.write(JSON.stringify(req.session.resultUser));
    }

})

