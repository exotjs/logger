import { Exot } from '@exotjs/exot';
import { logger } from '../lib/';

const exot = new Exot()
  .use(logger({
    logRequests: true,
  }))
  .get('/', ({ log }) => {
    log.info('Send greetings...');
    return 'Hi';
  });

exot.decorators.log.info('Hello')

await exot.listen(3000);