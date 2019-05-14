var http = require('http')
var querystring = require('querystring')


var server = http.createServer((req,res)=>{
    var params = "";
    if(req.url=="/req" && req.method.toLowerCase() == "post"){
        req.addListener('data',(item)=>{
            params += item;
        })
        req.addListener('end',()=>{
            var postData = querystring.parse(params);
            console.log(postData)
        })
    }
})
server.listen(3000,'192.168.1.143');