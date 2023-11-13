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
};