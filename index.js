
const Router = require('./router.js');

const router = new Router();
router.listen(3000, "0.0.0.0");


router.addRouteHandler("/index.html", (req, res) => {
    res.html("index.html");
})

router.addRouteHandler("/contactus.html", (req, res) => {
    res.html("contactus.html");
})

router.addRouteHandler("/login.html", (req, res) => {
    
}

