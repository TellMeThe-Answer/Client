const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/npmsAPI',
    createProxyMiddleware({
      target: 'http://ncpms.rda.go.kr',
      changeOrigin: true,
    })
  );
  app.use(
    '/service',
    createProxyMiddleware({
      target: 'http://api.nongsaro.go.kr',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/member", {
      target: "http://localhost:8080",
      changeOrigin: true,
    }),
  );
  app.use(
    createProxyMiddleware("/predict", {
      target: "http://rong5026.iptime.org:5000",
      changeOrigin: true,
    }),
  );
  
};

