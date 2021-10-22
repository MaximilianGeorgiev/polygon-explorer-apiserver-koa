const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();

const addressController = require('./controllers/addresses.js');
const blockController = require('./controllers/blocks.js');

var router = Router();

/*
router.get('/api/accounts/count', async function (ctx){
    const result =  await accountController.getAccountsCount(ctx);
    ctx.body = result;
});
*/

router.get('/', async function (ctx){
    const result =  "Hello World";
    ctx.body = result;
});

router.get('/addresses/:address', async function (ctx){
    const result =  await addressController.getAccountBalance(ctx);
    ctx.body = result;
});

router.get('/blocks/latest', async function (ctx){
    const result =  await blockController.getLatestBlock(ctx);
    ctx.body = result;
});

router.get('/blocks/pending', async function (ctx){
    const result =  await blockController.getPendingBlocks(ctx);
    ctx.body = result;
});

router.get('/blocks/identifier/:arg', async function (ctx){
    const result =  await blockController.getBlockByIdentifier(ctx);
    ctx.body = result;
});

router.get('/blocks/:from/:count', async function (ctx){
    const result =  await blockController.getMultipleBlocksAfterThreshold(ctx);
    ctx.body = result;
});

app.listen(3000);
app.use(router.routes());

app.on('error', err => {
    log.error('server error', err)
});