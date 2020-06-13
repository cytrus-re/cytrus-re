const zaq = require('../..');
console.log();
zaq.info('Neutral information, always nice:', { detail: 'someDetail', executionTime: 1200, sessionId: 'someSessionId_10101010' });

setTimeout(() => null, 5000);
