var http = require('http')
var fs = require('fs')
var url = require('url')
var path = require('path')

var server = http.createServer((req, res) => {
  //fs.mkdir()用于创建文件夹
  fs.mkdir('./styles', { recursive: true }, (err) => {

  });
  //fs.stat()用于访问文件是否存在
  fs.stat('./styles', (err, stats) => {
  })
  //fs.readdir()用于读取文件夹，返回一个包含其子文件夹和文件的数组
  //stats.isDirectory()用于判断是否是一个文件夹
  //stats.isFile()用于判断是否是一个文件
  fs.readdir('./', (err, files) => {
    var dirs = [];
    (function iterator (i) {
      if (i === files.length) return;
      fs.stat('./' + files[i], (err, stats) => {
        if (stats.isDirectory()) {
          dirs.push(files[i]);
        }
        iterator(i + 1);
      })
    })(0)
  })
  //url.parse()可以将一个完整的url路径分割成很多部分，包括host、port、pathname、query、href、path等
  var pathname = url.parse(req.url).pathname;
  //url.parse()第二个参数为 true 可以将一个其中的一个属性解析为一个对象
  var query = url.parse(req.url, true).query;

  console.log(pathname)
  var dirname = path.dirname(pathname);
  var extname = path.extname(pathname);
  console.log(dirname)
  console.log(extname)
  if (pathname === '/favicon.ico') {
    return;
  }
  if (pathname === '/' || pathname === '/index.html') {
    fs.readFile('./index.html', (err, data) => {
      res.writeHead(200, { 'Content-type': 'text/html;charset=UTF-8' });
      res.end(data);
    })
    return;
  }

  var mime = getMime(extname);
  fs.readFile('./view/' + pathname, (err, data) => {
    if (err) {
      fs.readFile('./view/error.html', (err, data) => {
        res.writeHead(200, { 'Content-type': 'text/html;charset=UTF-8' });
        res.end(data);
      })
      return;
    }

    res.writeHead(200, { 'Content-type': mime + ';charset=UTF-8' });
    res.end(data);
  })


})

server.listen(3000, '172.16.3.198')


//获取文件 MIME 类型
function getMime (extname) {
  switch (extname) {
    case '.html':
      return 'text/html';
      break;
    case '.jpg':
      return 'image/jpg';
      break;
  }
}
