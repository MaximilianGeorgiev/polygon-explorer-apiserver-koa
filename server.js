const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
console.log(ctx.request.URL.pathname);
  ctx.body = 'Hello World';
});

app.listen(3000);

app.on('error', err => {
    log.error('server error', err)
  });