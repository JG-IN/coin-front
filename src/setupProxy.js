const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
    console.log("accept")
    app.use(
        createProxyMiddleware('/api/tweet/*', {
            "target": 'http://127.0.0.1:8000/',
            "secure": false,
            "changeOrgin": true,        
        })
    )
}