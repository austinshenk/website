const express = require("express");
const expressStaticGzip = require("express-static-gzip");
const app = express();
const port = 3000;

app.use(expressStaticGzip("dist", {
  enableBrotli: true,
  orderPreference: ["br", "gzip", "deflate"],
  setHeaders: (res, path) => {
    if (path.match(/.*html\.?(br|gz)?/)) {
      res.setHeader('Cache-Control', 'public, max-age=0');
    } else {
      res.setHeader('Cache-Control', 'public, max-age=31536000');
    }
  }
}));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));