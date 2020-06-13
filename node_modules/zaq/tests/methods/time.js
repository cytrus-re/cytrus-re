const zaq = require('../..');
console.log();
zaq.time('MyProcess consumed 14295ms compute time', { start: Date.now() - 14295, end: Date.now(), });

setTimeout(() => null, 5000);
