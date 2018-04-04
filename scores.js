var scores = [{
    name: "Edwin",
    score: 50
}, {
    name: "David",
    score: 39
}];

// server stuff

const jsonBody = require("body/json");
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    var body;
    if (req.method === "GET") {
        if (req.url !== "/scores") {
            res.statusCode = 404;
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/javascript');
            scores.sort((a, b) => (b.score - a.score));
            top3Scores = scores.slice(0, 3);
            body = JSON.stringify(top3Scores);
        }
    } else if (req.method === "POST") {
        res.statusCode = 201;
        jsonBody(req, res, (err, body) => {
            scores.push(body);
        })
    }
    res.end(body);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});