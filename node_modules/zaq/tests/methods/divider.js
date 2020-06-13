const zaq = require('../..');
zaq.flag('Pre-divider text');
zaq.divider('Cool Divider Text', { space: 3, lineColor: 'magenta', centered: true });
zaq.flag('Post-divider text')
setTimeout(() => null, 5000);
