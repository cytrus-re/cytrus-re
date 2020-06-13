const zaq = require('../..');
console.log();
zaq.flag('Something you should know.', { detail: 'someDetail', executionTime: 1200, sessionId: 'someSessionId_10101010' });

setTimeout(() => null, 5000);
