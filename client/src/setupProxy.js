const {createProxyMiddleware} = require('http-proxy-middleware');
module.exports = function(app){
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://3.36.163.193:5000',
            changeOrigin: true
        })
    )
}