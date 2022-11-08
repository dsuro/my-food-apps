// const http = require('http');

// const requestListener = function (req, res) {
//   res.writeHead(200);
//   res.end('Hello, World!');
// }

// const server = http.createServer(requestListener);
// server.listen(8080);

const jsonServer=require('json-server');
const server=jsonServer.create();
const router=jsonServer.router(require('./db.js')());
const middleWares=jsonServer.defaults();
const port=4900;
server.use(jsonServer.bodyParser);
server.use((req,res,next) =>{
    if(req.method=="POST"){
        req.method="GET";
    }
    setTimeout(next,50);
});

router.render=(req,res)=>{
 res.jsonp(res.locals.data);
};

server.use(middleWares);

server.use(router);

server.listen(port,()=>{
 console.log("JSON server is running on port ",port);
});