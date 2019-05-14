var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

var server = http.createServer((req,res)=>{
    var pathname = url.parse(req.url).pathname;
    var extname = path.extname(pathname);
    if(pathname === '/favicon.ico'){
        return;
    }
    if(pathname === '/'){
        fs.readFile('./index.html',(err,data)=>{
            res.writeHead(200,{'Content-type':'text/html;charset=UTF-8'});
            res.end(data);
        })
        return;
    }
    fs.readFile('./'+pathname,(err,data)=>{
        if(err){
            fs.readFile('./view/error.html',(err,data)=>{
                res.writeHead(200,{'Content-type':'text/html;charset=UTF-8'});
                res.end(data);
            })
            return;
        }
        getMime(extname,(mime)=>{
            res.writeHead(200,{'Content-type':mime+';charset=UTF-8'});
            res.end(data);
        });
    })

    // fs.readFile(__dirname+'/menu.txt',(err,data)=>{
    //     if(err) throw err;
    //     console.log(data.toString());
    // })
    fs.rename('./1.txt','./menu.txt',(err)=>{
        if(err) throw err;
        console.log('重命名成功')
    });
})

server.listen(3000,'192.168.1.143');

//获取文件的 MIME 类型
function getMime(extname,cb){
    //读取mime.json文件
    fs.readFile('./mime.json',(err,data)=>{
        if(err) throw err;
        //转成 JSON
        var mimeJson = JSON.parse(data);
        var mime = mimeJson[extname] || 'text/html';
        //执行回调函数
        cb(mime);
    })
}