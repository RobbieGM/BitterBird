import express from 'express';
import history from 'connect-history-api-fallback';
import path from 'path';
import userInfoAPI from './api-server-middleware';
import compression from 'compression';

const app = express();
const distDir = __dirname.split(path.sep).slice(0, -2).concat('dist').join(path.sep);
// const distDir = `C:\\Users\\Robbie\\Code\\bitterbird\\dist`;

const staticFileMiddleware = express.static(distDir);
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`)
    } else {
      next();
    }
  });
}
app.use(compression());
app.use(userInfoAPI());
app.use(staticFileMiddleware);
app.use(history({
  verbose: true,
}));
app.use(staticFileMiddleware);

const port = process.env.PORT || process.argv[process.argv.length - 1] || 80;
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`BitterBird listening on port ${port} serving ${distDir}`);
});
