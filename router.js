const http = require("http");
const fs = require("fs");


function getTemplate(name) {
    return fs.readFileSync(__dirname + "/template/" + name, { encoding: 'utf-8' });

}

class Router {
    constructor() {
        this.routes = [];
        this.header = getTemplate("header.html");
        this.footer = getTemplate("footer.html");

        this.server = http.createServer((req, res) => {  //runs on request

            res.html = (template) => {
                const content = getTemplate(template);
                res.setHeader("content-type", "text/html");
                res.write(this.header + content + this.footer);
            }

            const route = this.routes.find((route) => { return req.url === route.url });
            if (route) {
                route.handler(req, res);
            } else {
                res.statusCode = 404;
                res.write("Not Found");
            }
            res.end();
            // for (const route of routes) {

            // }

        })



    }

    listen(port, host) {
        this.server.listen(port, host);
    }

    addRouteHandler(url, handler) {
        this.routes.push({
            url: url,
            handler: handler
        })
    }


}

module.exports = Router;