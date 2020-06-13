const zaq = require('../..');
console.log();
zaq.err('Failed to do a thing!', { detail: 'someDetail', executionTime: 1200, sessionId: 'someSessionId_10101010' });

setTimeout(() => null, 5000);
