const { createProxyMiddleware } = require('http-proxy-middleware');
 module.exports = function(app){
   app.use(createProxyMiddleware('/flask/**', { target: 'localhost:5000' }))
  
  }
   