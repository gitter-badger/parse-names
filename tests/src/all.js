const chai = require('chai');
chai.use(require('chai-fuzzy'));
const expect = chai.expect;

import parseNames from '../../lib/parse-names';

describe('@datagica/parse-names', () => {

  it('should validate names', (done) => {
    Promise.all([
      { input: "julian", output: "julian" },
      { input: "pierre", output: "pierre" },
      { input: "les", output: undefined },
      { input: "media", output: undefined },
      { input: "grid", output: undefined }
    ].map(test => {
      return parseNames(test.input).then(output => {
        console.log("output: "+JSON.stringify(output));
        expect(output).to.be.like(test.output);
        return Promise.resolve(true);
      })
    })).then(finished => {
      done();
    }).catch(exc => {
      console.error(exc);
    })
  });
  it('should detect names in full sentences', (done) => {
    Promise.all([
      { input: "mon prénom est julian bilcke", output: "julian" },
      { input: "my name is pierre dupont", output: "pierre" },
      { input: "el nombre es sowmya dupond", output: "sowmya" },
      { input: "les media", output: undefined },
      { input: "in grid", output: undefined }
    ].map(test => {
      return parseNames(test.input).then(output => {
        console.log("output: "+JSON.stringify(output));
        expect(output).to.be.like(test.output);
        return Promise.resolve(true);
      })
    })).then(finished => {
      done();
    }).catch(exc => {
      console.error(exc);
    })
  });

});
