const zaq = require('../..');
const fooZaq = zaq.as('Foo');
const barZaq = zaq.as('Bar_Module');

console.log();

fooZaq.info('Some Information from Clone A.');
barZaq.info('Some Differing Information from Clone B.');

setTimeout(() => null, 5000);
