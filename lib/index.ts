import { Exot } from '@exotjs/exot';
import pino, { type LoggerOptions } from 'pino';
import type { ContextInterface } from '@exotjs/exot/types';

export interface LoggerInit {
  bindings?: (ctx: ContextInterface) => Record<string, unknown>;
  logRequests?: boolean;
  pinoOptions?: LoggerOptions;
}

export const logger = (init: LoggerInit = {}) => {
  const pinoLogger = pino({
    ...init.pinoOptions,
  });

  pinoLogger.debug('Logger mounted');

  return new Exot({
    name: '@exotjs/logger',
  })
    .decorate('log', pinoLogger)
    .onStart((port: number) => {
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

function inspectRequest(ctx: ContextInterface) {
  return {
    method: ctx.req.method,
    url: ctx.req.url,
    headers: Object.fromEntries(ctx.req.headers),
    remoteAddress: ctx.remoteAddress,
  };
}