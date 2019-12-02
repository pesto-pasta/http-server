
const Router = require('./router.js');

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



router.get("/secure_login", (req, res) => {

    const users = require('./template/users.js');

    //if req.url includes secure_login, test for username and password

    let authenticated = false;
    for (let user of users.users) {
        authenticated = (req.query.password === user.password && req.query.username === user.username);
        if (authenticated) {break;}
    }

    //give messages based on authentication status
    if (authenticated) {
        console.log(req.query.username + " logged in");
        res.html('myaccount.html');
    } else {
        console.log("There was a failed login attempt");
        // res.write("login failed");
        res.html('login.html');
    }




    //     const user = users.find((user) => {return user.username === result.username && user.password === result.password})
    //     if (user) {
    //         res.write("YOU GOT IN TO MY EPIC WEBSITE, " + user.username);

    //     } else {
    //         res.write("login failed, use back button.");
    //     }
    //     console.log();

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
    res.html("/myaccount.html");
})


