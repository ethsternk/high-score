const textBody = require("body");

var resources = {
    "/IP": "Internet Protocol",
    "/TCP": "Transmission Control Protocol"
};

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    var body;
    if (req.method === "GET") {
        if (resources[req.url] === undefined) {
            res.statusCode = 404;
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            body = resources[req.url];
        }
    } else if (req.method === "PUT") {
        res.statusCode = 201;
        textBody(req, res, (err, body) => {
            resources[req.url] = body;
        })
    }

    res.end(body);
    console.log(req.url);
    console.log(req.headers);
    console.log(req.method);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});