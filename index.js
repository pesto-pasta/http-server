const http = require('http');
const fs = require('fs');

console.log(fs);

function getTemplate(name) {
    return fs.readFileSync(__dirname + "/template/" + name + ".html", { encoding: 'utf-8'});
}


let counter = 0;

const server = http.createServer((req, res) => {

    const header = getTemplate("header");
    const footer = getTemplate("footer");


    let statusCode = 404;
    let content = "The resource is not found";
    let contentType = "text/plain";

    if (req.url === "/index.html") {
        const index = getTemplate("index");
        content = header + index + footer;
        statusCode = 200;
        contentType = "text/html";
    } 
    
    else if (req.url === "/cats.html") {
        const cats = getTemplate("cats");
        content = header + cats + footer;
        statusCode = 200;
        contentType = "text/html";

    }

    console.log("I got a request");
    res.setHeader("content-type", contentType);
    res.statusCode = statusCode;

    res.write(content);
    res.end();
})

server.listen(3000, '0.0.0.0', () => {
    console.log("Your server is listening");
});

