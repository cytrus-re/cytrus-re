const zaq = require('../index');

var sampleJSON = {
  propName: {
    value: true,
    count: 100
  },
  otherProp: "String LOL",
  thirdThing: null
};

var sampleError ={
  message: 'SeatAllocationOverflow',
  sessionId: 'g019c48c1m49f19dcm49506_5210503',
  customerId: 40111000,
  timeout: '3000ms'
}

function demoAllLogTypes (zaq) {
  zaq.divider('zaq running as "' + zaq.getNamespace() + '" (Oooo FANCY DIVIDER)', {
    space: 2,
    lineSymbol: ':',
    lineColor: 'blue',
    centered: true
  });
  zaq.ok('Successfully loaded imaginary remote resource.', sampleJSON);
  zaq.err('Some Error Occurred in MyClass.js:', sampleError);
  zaq.info('Beep boop. Recalculation of offset vector:', 41001284.4140014140000000, { vector_base: 'inherit' });
  zaq.warn('DANGER WILL ROBINSON. Possible corruption in files: ', ['_flush65286354.41589.flo', '_flush65485655.90508.flo'], { recommendedAction: 'ANNIHILATE' });
  zaq.info('Oh boy, a reference to an undefined property:', sampleJSON.asdfghjkl);
  zaq.time('Timer: 50ms elapsed.');
  zaq.debug('Function made it past parsing.');
  zaq.flag('USING API KEY','ASDFGHJKL8171992');
  zaq.weight(__dirname, '../yarn.lock');
  zaq.weight(__dirname, 'madeup.js');
  zaq.fatal('FATAL EXCEPTION ENCOUNTERED! CANNOT CONTINUE!');
}

const namespaces = [ '', 'MyApp', 'OtherModule', 'X-Service'];


namespaces.forEach(namespace => {
  const zaqInstance = zaq.as(namespace);
  demoAllLogTypes(zaqInstance);
});
