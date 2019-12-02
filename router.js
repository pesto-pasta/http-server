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
        
            //Parse and store the url parameters
            const result = {};
            const params = req.url.split('?');
            if (params.length === 2) {
                const pairs = params[1].split('&');

                for (const pair of pairs) {
                    const keyVal = pair.split('=');
                    const key = keyVal[0];
                    const value = keyVal[1];
                    console.log(key, value);
                    result[key] = value;
                    
                }



            }
            req.query = result;
        

            res.html = (template) => {
                const content = getTemplate(template);
                res.setHeader("content-type", "text/html");
                res.write(this.header + content + this.footer);
            }

            console.log(this.routes);
            const route = this.routes.find((route) => { return req.url.includes(route.url) && req.method === route.method });
            if (route) {
                route.handler(req, res);
            } else {
                res.statusCode = 404;
                res.html("pagenotfound.html");
            }
            res.end();


        })



    }

    listen(port, host) {
        this.server.listen(port, host);
    }

    addRouteHandler(url, handler, method) {
        this.routes.push({
            url: url,
            handler: handler,
            method: method,
        })
    }

    get(url, handler) {
        this.addRouteHandler(url, handler, "GET");
    }

    post(url, handler) {
        this.addRouteHandler(url, handler, "POST");
    }

}

module.exports = Router;