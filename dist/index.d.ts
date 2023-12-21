import { Exot } from '@exotjs/exot';
import { type LoggerOptions } from 'pino';
import type { ContextInterface } from '@exotjs/exot/types';
export interface LoggerInit {
    bindings?: (ctx: ContextInterface) => Record<string, unknown>;
    logRequests?: boolean;
    pinoOptions?: LoggerOptions;
}
export declare const logger: (init?: LoggerInit) => Exot<{
    log: import("pino").Logger<never>;
}, {}, {}, {}, ContextInterface<{}, any, any, any, {}> & {
    log: import("pino").Logger<never>;
}>;
export default logger;
