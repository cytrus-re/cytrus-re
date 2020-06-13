const zaq = require('../..');
console.log();
zaq.ok('Successfully completed task.', { detail: 'someDetail', executionTime: 1200, sessionId: 'someSessionId_10101010' });

setTimeout(() => null, 5000);
