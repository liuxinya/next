"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const next_1 = __importDefault(require("next"));
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = (0, next_1.default)({ dev });
const handle = app.getRequestHandler();
app.prepare().then(() => {
    const server = new koa_1.default();
    const router = new koa_router_1.default();
    router.all('(.*)', async (ctx) => {
        await handle(ctx.req, ctx.res);
        ctx.respond = false;
    });
    server.use(async (ctx, next) => {
        ctx.res.statusCode = 200;
        await next();
    });
    server.use(router.routes());
    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    });
});
//# sourceMappingURL=index.js.map