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

            const result = {};
            const params = req.url.split("?");
            if (params.length === 2) {
                const pairs = params[1].split("&");
                for (const pair of pairs) {
                    const keyval = pair.split('=');
                    const key = keyval[0];
                    const value = keyval[1];
                    result[key] = value;
                }
            }
            req.queryParams = result;

            res.html = (template) => {
                const content = getTemplate(template);
                res.setHeader("content-type", "text/html");
                res.write(this.header + content + this.footer);
            }

            const route = this.routes.find((route) => {
                return req.url.includes(route.url) && req.method === route.method
            });

            if (route) {
                route.handler(req, res);
            } else {
                res.statusCode = 404;
                res.write("Not Found");
            }
            res.end();

        })



    }

    listen(port, host) {
        this.server.listen(port, host);
    }

    get(url, handler) {
        this.addRouteHandler(url, handler, "GET");
    }

    post(url, handler) {
        this.addRouteHandler(url, handler, "POST");
    }

    addRouteHandler(url, handler, method) {
        this.routes.push({ url, handler, method });
    }


}

module.exports = Router;