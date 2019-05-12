var http = require('http')
var fs = require('fs')
var url = require('url')

var server = http.createServer((req,res) => {
    //url.parse()可以将一个完整的url路径分割成很多部分，包括host、port、pathname、query、href、path等
    var path = url.parse(req.url).pathname;
    //url.parse()第二个参数为 true 可以将一个其中的一个属性解析为一个对象
    var query = url.parse(req.url,true).query;
    console.log(path);
    console.log(query);
    if(path==='/'){
        fs.readFile('./index.html',(err,data) => {
            res.writeHead(200,{'Content-type':'text/html;charset=UTF-8'});
            res.end(data);
        })
    }else if(path==='/main'){
        fs.readFile('./view/main.html',(err,data) => {
            res.writeHead(200,{'Content-type':'text/html;charset=UTF-8'});
            res.write('姓名：'+query.name+' 年龄：'+query.age);
            res.end(data);
        })
    }else if(path==='/favicon.ico'){
        // fs.readFile('./images/logo.ico',(err,data) => {
        //     res.writeHead(200,{'Content-type':'text/html;charset=UTF-8'});
        // })
        res.end();
    }else{
        fs.readFile('./view/error.html',(err,data) => {
            res.writeHead(200,{'Content-type':'text/html;charset=UTF-8'});
            res.end(data);
        })
    }
   
    
})

server.listen(3000,'192.168.1.143')