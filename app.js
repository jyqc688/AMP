/*
 * AMP 入口文件
 */

import path from 'path';

import Koa from 'koa';
import Router from 'koa-router';
import Static from 'koa-static';
import Logger from 'koa-logger';
import Send from 'koa-send';

// koa1中间件转换
import convert from 'koa-convert';

import routers from './routes'

const app = new Koa();
const port = 8989;

const index = Router();
index.get('/', async (ctx, next) => {
	await Send(ctx, './views/index.html');
})

// middleware
app.use(convert(Logger()));
app.use(convert(Static(path.join(__dirname, 'static'))));
// routers
app.use(index.routes());
app.use(routers.routes());


// 错误处理
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});

app.listen(port);
