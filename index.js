const fs = require('fs');
const Handlebars = require('handlebars');
const Router = require('./router.js');
const users = require('./template/users.js');

function getTemplate(name) {
    return fs.readFileSync(__dirname + "/template/" + name, { encoding: 'utf-8' });

}

function makeHandlebarPageFromTemplate(templateFile) {
    const template = getTemplate(templateFile);
    return Handlebars.compile(template);
}












const router = new Router();
router.listen(3000, "0.0.0.0");


router.get("/index", (req, res) => {
    if (req.query.logOut) {
        console.log(req.session.user.username + " logged out")
        delete req.session.user;
    }
    const index = makeHandlebarPageFromTemplate('index.html');
    res.html(index());  //<-- This is where we are going to put in variable for Handlebars to dynamically change the HTML file before it gets sent to the client.
})

router.get("/contactus", (req, res) => {

    const contectUs = makeHandlebarPageFromTemplate('contactus.html');
    res.html(contactUs);
})

router.get("/login", (req, res) => {

    const login = makeHandlebarPageFromTemplate('login.html');
    res.html(login(
        { loginFail: req.session.loginFailTag }
    ));
    req.session.loginFailTag = false;
})

router.get("/cats", (req, res) => {

    const cats = makeHandlebarPageFromTemplate('cats.html');
    res.html(cats(
        { isActive: req.query.animal === "dog", animal: "chiwawa", object: "house" }
    ));
})



router.post("/secure_login", (req, res) => {

    if (req.body.newUsername && req.body.newPassword) {
        const newUser = { username: req.body.newUsername, password: req.body.newPassword };
        users.users.push(newUser);
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
        console.log("There was a failed login attempt, req.session.loginFail set");
        req.session.loginFailTag = true;

        res.setHeader("location", "/login");  //this is how we redirect the route
        res.statusCode = 302;
    }

})

router.get("/createaccount", (req, res) => {

    const createaccount = makeHandlebarPageFromTemplate('createaccount.html');
    res.html(createaccount());  //place variables for Handlebars in here <---
})

router.get("/users_search", (req, res) => {
    //if form is submitted from search form, push the search onto previousSearches, and 
    users.previousSearches.push(req.query);
    const result = users.users.find((user) => user.username === req.query.userSearch);
    req.session.resultUser = result;

    const searchResults = makeHandlebarPageFromTemplate('search_results.html');
    res.html(searchResults());  //<-- again, place variables for search _results in here, such as the results of the search.
})

router.get("/myaccount", (req, res) => {

    if (!req.session.user) {
        res.setHeader("location", "/login");  //this is how we redirect the route
        res.statusCode = 302;
        return;
    }


    //if pubg slider SEND IT button pressed and query includes pubgstoke..
    if (req.query.pubgstoke !== undefined) {
        console.log(req.session.user.username + " is Stoked to level " + req.query.pubgstoke);
        req.session.user.pubgstoke = req.query.pubgstoke;
    }

    const myAcocunt = makeHandlebarPageFromTemplate('myaccount.html');
    res.html(myAcocunt());  //<--- a third time, here is a reminder of where to put Handlebars vars.
})

router.get("/user_details", (req, res) => {
    if (req.session.user) {
        res.write(JSON.stringify(req.session.user));
    }
})

router.get("/search_details", (req, res) => {
    if (req.session.resultUser) {
        res.write(JSON.stringify(req.session.resultUser));
        delete req.session.resultUser;
    }
})
