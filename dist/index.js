import { Exot } from '@exotjs/exot';
import pino from 'pino';
export const logger = (init = {}) => {
    const pinoLogger = pino({
        ...init.pinoOptions,
    });
    pinoLogger.debug('Logger mounted');
    return new Exot({
        name: '@exotjs/logger',
    })
        .decorate('log', pinoLogger)
        .onStart((port) => {
        pinoLogger.info('Server listening on %d', port);
    })
        .use((ctx) => {
        ctx.log = pinoLogger.child(init.bindings ? init.bindings(ctx) : {
            requestId: ctx.requestId,
        });
        if (init.logRequests) {
            ctx.log.info({
                request: inspectRequest(ctx),
            });
        }
    });
};
export default logger;
function inspectRequest(ctx) {
    return {
        method: ctx.req.method,
        url: ctx.req.url,
        headers: Object.fromEntries(ctx.req.headers),
        remoteAddress: ctx.remoteAddress,
    };
}
