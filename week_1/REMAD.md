# node.js 开发服务器，数据、路由。本地（浏览器）关心的是效果、交互。

# node.js 实际上是极客开发的一个小玩具，不是银弹。有着别人不具备的怪异特点。

# 单线程、 Non-blocking I/O、 Event Driven。实际上是一个特点。

# 首先，Node 不为每个用户开辟一个线程，所以非常极端的选择了单线程。单线程，要照顾所有用户，那么就必须有非阻塞 I/O，否则一个人的 I/O 就把别人、自己都阻塞了。一旦有非阻塞 I/O，一个人如果 I/O 去了，就会放弃 CPU 使用权，换成另一个人使用 CPU （或者执行此人后面的语句）。所以 CPU 的利用率 100%。第一个人 I/O 结束了，就要用事件来通知线程，执行回调函数。此时必须有事件环，就有一个排队调度机制。Node 中有超过半数的 C++ 代码，在搭建事件环。

# Node.js 和别的老牌 3p 不一样：
    1）没有自己的语法，依赖 V8 引擎，所以就是 JS。V8 引擎解析 JS 的，效率非常高，并且 V8 中很多东西都是异步的。Node 就是将 V8 中的一些功能自己没有重写，移植到服务器上。
    2）没有 web 容器，就是安装配置完成之后，没有一个根目录（没有根目录的概念）。

# require()中的路径，是从当前这个 js 文件触发，找别的文件。
# require 一个文件的时候会执行那个文件
    所以，桌面上有一个 a.js，test 文件夹中有 b.js、c.js、menu.txt
    a 要引用 b：
    var b = require('./test/b.js);

    但是，fs 等其他的模块用到路径的时候，都是相对于 cmd 命令光标所在位置。
    所以，在 b.js 中想读 menu.txt 这个文件，推荐用绝对路径（__dirname）：
    fs.readFile(__dirname+'/menu.txt',(err,data)=>{
        if(err) throw err;
        console.log(data.toString());
    })