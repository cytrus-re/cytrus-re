const zaq = require('../..');
console.log();
zaq.warn('Attempted to do bad thing...', { detail: 'someDetail', executionTime: 1200, sessionId: 'someSessionId_10101010' });

setTimeout(() => null, 5000);
