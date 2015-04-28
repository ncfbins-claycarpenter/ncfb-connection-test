
var connect = require('connect'),
    http = require('http'),
    app = connect();

app.use('/stall', function (req, res) {
    console.log('Request received, stalling...');
});

app.use('/howdy', function (req, res) {
    console.log('Request received, responding...');
    
    res.setHeader('Content-Type', 'plain/text');
    res.end('Howdy');
});

function error302 (req, res) {
    console.log('Received request for', req.url, 'responding with 302 redirect.');
    
    var body = '<head><body> This object may be found <a HREF="http://wwwt.ncfbins.com/Outage/CustomerPortal/outage.html">here</a> </body>';
    res.writeHead(302, 'Object Moved', {
        'Location': 'http://wwwt.ncfbins.com/Outage/CustomerPortal/outage.html',
        'Content-Type': 'text/html' 
    });
    
    res.end(body);
}

app.use('/302', error302);

function error500 (req, res) {
    console.log('Received request for', req.url, 'responding with 500 error.');
    
    res.statusCode = 500;
    res.statusMessage = 'Internal Server Error';
    
    res.end();
}

app.use('/500', error500);

function error503 (req, res) {
    console.log('Received request for', req.url, 'responding with 503 error.');
    
    res.statusCode = 503;
    res.statusMessage = 'Service Unavailable';
    
    res.end('<html><body><b>Http/1.1 Service Unavailable</b></body> </html>');
}

app.use('/503', error503);

console.log('Server starting on', process.env.IP + ':' + process.env.PORT);

http.createServer(app).listen(
    process.env.PORT,
    process.env.IP);
