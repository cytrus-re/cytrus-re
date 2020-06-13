const { getInfo } = require('../index')
var chai = require('chai')
chai.use(require('chai-events'))
chai.use(require('chai-as-promised'))
chai.should()

describe('ytdl-getinfo', function () {
  it('should fail when called with no query', function () {
    return getInfo().should.be.rejected
  })
  
  it('should resolve with basic info for a single video', function () {
    this.timeout(30000)
    return getInfo('v7BddpYYNGk').should.eventually.have.property('items').with.lengthOf(1)
  })

  it('should resolve with "partial" set to false for a single video', function () {
    this.timeout(30000)
    return getInfo('v7BddpYYNGk').should.eventually.have.property('partial', false)
  })

  it('should resolve with "partial" set to true for playlists', function () {
    this.timeout(30000)
    return getInfo('PLJGN3qYb3JQyx429pxmyPVMUFnbqbaE9n').then(p => { p.cancel(); return p })
    .should.eventually.have.property('partial', true)
  })
  
  it('should wait for the entire playlist when "wait" is true', function () {
    this.timeout(60000)
    return getInfo('PLJGN3qYb3JQyx429pxmyPVMUFnbqbaE9n', [], true)
    .should.eventually.have.property('items').with.lengthOf(3)
  })

  // it('should be able to handle large amounts of data', function () {
  //  this.timeout(30000)
  //  return getInfo('JwKHxzfmAOY').should.eventually.have.property('items').with.lengthOf(1)
  // })

  it('should throw errors produced by youtube-dl', function () {
    this.timeout(30000)
    return getInfo('AnYcMiksJ-A').should.be.rejected // Private Video
  })

  it('should handle unicode searches properly', function () {
    this.timeout(30000)
    return getInfo('幽閉サテライト - ひと肌くらいの熱')
    .should.eventually.have.property('items').with.lengthOf(1)
  })

  it('should properly escape queries starting with a dash', function () {
    this.timeout(30000)
    return getInfo('-H-sigEewZ8')
    .should.eventually.have.property('items').with.lengthOf(1)
  })

  it('should handle multiple queries properly', function () {
    this.timeout(60000)
    return getInfo(['EJTZms5PFg8', '_7inU3si8nA'], [], true)
    .should.eventually.have.property('items').with.lengthOf(2)
  })

  it('should emit the "done" event when all the playlist data is available', function () {
    this.timeout(60000)
    return getInfo('PLJGN3qYb3JQyx429pxmyPVMUFnbqbaE9n')
    .should.eventually.emit('done')
  })

})
