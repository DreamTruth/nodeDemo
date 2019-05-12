var http = require('http')
var fs = require('fs')

var server = http.createServer((req,res) => {
    var url = req.url;
    console.log(url);
    if(url==='/'){
        fs.readFile('./index.html',(err,data) => {
            res.writeHead(200,{'Content-type':'text/html;charset=UTF-8'});
            res.end(data);
        })
    }else if(url==='/favicon.ico'){
        fs.readFile('./images/logo.ico',(err,data) => {
            res.writeHead(200,{'Content-type':'text/html;charset=UTF-8'});
            res.end(data);
        })
    }
   
    
})

server.listen(3000,'192.168.1.143')