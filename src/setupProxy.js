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
      target: "http://172.16.20.209:8080",
      // target: "http://ec2-43-201-76-162.ap-northeast-2.compute.amazonaws.com:8080",
      changeOrigin: true,
    }),
  );
  app.use(
    createProxyMiddleware("/predict", {
      target: "http://172.16.20.209:5050",
      // target: "http://rong5026.iptime.org:5000",
      changeOrigin: true,
    }),
  );
  app.use(
    createProxyMiddleware("/report", {
      target: "http://172.16.20.209:8080",
      // target: "http://rong5026.iptime.org:5000",
      changeOrigin: true,
    }),
  );
  
};

