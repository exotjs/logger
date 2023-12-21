# Logger plugin for Exot

A logger plugin for Exot built on top of [Pino](https://getpino.io/).

## Usage

The pino logger is available as `context.log` in the route handler:

```js
import { Exot } from '@exotjs/exot';
import logger from '@exotjs/logger';

new Exot()
  .use(logger({
    bindings: (ctx) => {
      return {
        requestId: ctx.requestId,
      };
    },
    logRequests: true,
    pinoOptions: {
      // configure pino here...
    },
  }))

  .use(({ log }) => {
    log.info('Executing middleware...');
  })

  .get('/', ({ log }) => {
    log.info('Sending greetings...');

    return 'Hi';
  })

  .listen(3000);
```

### Usage outside of routes

The main pino instance is available as a decorator on the main Exot instance:

```js
exot.decorators.log.info('log message...');
```

## Configuration

`bindings: (ctx: Context) => Record<string, uknown>` - use this function to bind custom "child bindings" for each request (defaults to: `{ requestId }`).

`logRequests: boolean` - whether to automatically log request information (method, url, headers, remoteAddress).

`pinoOptions: PinoOptions` - see [Pino docs](https://getpino.io/#/docs/api?id=options).

## Credits

[Pino](https://getpino.io/)

## License

MIT