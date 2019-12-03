
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



    const users = require('./template/users.js');

    //if req.url includes secure_login, test for username and password

    // let authenticated = false;
    // for (let user of users.users) {
    //     authenticated = (req.body.password === user.password && req.body.username === user.username);
    //     if (authenticated) { break; }
    // }

    let user = users.users.find((user) => req.body.password === user.password && req.body.username === user.username)

    //give messages based on authentication status
    if (user) {
        req.session.user = user;
        req.session.loggedInTime = new Date();
        console.log(req.body.username + " logged in");
        res.setHeader("location", "/myaccount");  //this is how we redirect the route
        res.statusCode = 302;

    } else {
        console.log("There was a failed login attempt");

        // res.write("login failed");
        res.html('login.html');
    }

})

router.addRouteHandler("/createaccount.html", (req, res) => {
    res.html("createaccount.html");

})
router.get("/users_search", (req, res) => {
    //if form is submitted from search form, push the search onto previousSearches
    if (req.url.includes('/users_search')) {
        users.previousSearches.push(req.query);
        console.log(previousSearches);
    }
    res.html("/login.html")
})

router.get("/myaccount", (req, res) => {

    if (!req.session || !req.session.user) {
        res.write("YOU ARE NOT LOGGED IN");
        return;
    }

    if (req.query.pubgstoke !== undefined) {
        req.session.user.pubgStoke = req.query.pubgstoke;
    }
    console.log(req.session.loggedInTime)
    res.html("/myaccount.html");
})

router.get("/user_details", (req, res) => {
    if (req.session.user) {
       res.write(JSON.stringify(req.session.user));
    }
})

