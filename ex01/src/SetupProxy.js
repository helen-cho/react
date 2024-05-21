const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
    app.use("/todos",
        createProxyMiddleware({
            target: "https://jsonplaceholder.typicode.com", 
            changeOrigin: true
        })
    );

    app.use("/posts",
        createProxyMiddleware({
            target: "https://jsonplaceholder.typicode.com", 
            changeOrigin: true
        })
    );
}