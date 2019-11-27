
const Router = require('./router.js');

const router = new Router();
router.listen(3000, "0.0.0.0");

const users = [
    { username: "Jordan", password: "1247133182" },
    { username: "Tyler", password: "MYLITTLEPONY123" }
]

const previousSearches = [];


router.get("/search", (req, res) => {
    if (req.queryParams.search) {
        previousSearches.push(req.queryParams.search);
        const user = users.find((user) => user.username === req.queryParams.search);
        if (user) {
            res.write("FOUND THE USER! Their password is: " + user.password + "\n");
        } else {
            res.write("User not found!\n")
        }
        res.write("Previous Searches: \n" + previousSearches.join("\n"));
    } else {
        res.html('search.html');
    }
    
})


router.get("/contactus.html", (req, res) => {
    res.html("contactus.html");
})

router.get("/login.html", (req, res) => {
    res.html("login.html");
});

router.post("/secure_login", (req, res) => {

    req.on('data', (data) => {
        console.log(data.toString('utf8'));
    });


})

