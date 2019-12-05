const http = require("http");
const fs = require("fs");
const sessions = {};


function getTemplate(name) {
    return fs.readFileSync(__dirname + "/template/" + name, { encoding: 'utf-8' });

}


function getParamsObjectFromURLEncodedString(string) {
    const result = {};
    const pairs = string.split('&');
    for (const pair of pairs) {
        const keyVal = pair.split('=');
        const key = keyVal[0];
        const value = keyVal[1];
        result[key] = value;
        // }
    }
    return result;
}

class Router {
    constructor() {
        this.routes = [];
        this.header = getTemplate("header.html");
        this.footer = getTemplate("footer.html");

        this.server = http.createServer((req, res) => {  //runs on request


            const cookies = {};
            if (req.headers.cookie) {
                const keyPairs = req.headers.cookie.split(";");
                for (const pair of keyPairs) {
                    const [key, value] = pair.trim().split("=");
                    cookies[key] = value;
                }
            }
            req.cookies = cookies;


            if (!req.cookies.sessionID || !sessions[req.cookies.sessionID]) {
                let myRand = Math.floor(Math.random() * Math.pow(10, 9));  //create a big number
                sessions[myRand] = {};  //add myRand as an object within the sessions object
                req.session = sessions[myRand]; //create a session element on req and make it equal to the sessions[myRand] object.. So that we can access it in different files.
                res.setHeader("set-Cookie", ["sessionID=" + myRand]);  //tee up response to include myRand as sessionID
            } else {
                req.session = sessions[req.cookies.sessionID];

            }

            //Parse and store the url / body parameters
            const params = req.url.split('?');
            if (params.length === 2) {
                req.query = getParamsObjectFromURLEncodedString(params[1]);
            } else { req.query = {} }

            let string = "";
            req.on("data", (chunk) => {
                string += chunk.toString("utf-8");
            })

            req.on("end", () => {
                req.body = getParamsObjectFromURLEncodedString(string);

                res.html = (template) => {
                    // const content = getTemplate(template);
                    res.setHeader("content-type", "text/html");
                    res.write(this.header + template + this.footer);
                }

                const route = this.routes.find((route) => { return req.url.includes(route.url) && req.method === route.method });
                if (route) {
                    route.handler(req, res);
                } else {
                    res.statusCode = 404;
                    res.html("pagenotfound.html");
                }
                res.end();
            })

        })
    }
    // end of constructor



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