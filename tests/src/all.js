const chai = require('chai');
chai.use(require('chai-fuzzy'));
const expect = chai.expect;

import parseNames from '../../lib/parse-names';

describe('@datagica/parse-names', () => {

  it('should validate names', (done) => {
    Promise.all([{
      input: "julian",
      output: [{
        "ngram": "julian",
        "value": {
          "name": "julian",
          "gender": ["m"],
          "language": ["english"],
          "frequency": 0.19
        },
        "len": 1,
        "errorLengthRatio": 0,
        "position": {
          "substring": {
            "begin": 0,
            "end": 6
          },
          "fullstring": {
            "begin": 0,
            "end": 6
          }
        }
      }]
    }, {
      input: "pierre",
      output: [{
        "ngram": "pierre",
        "value": {
          "name": "pierre",
          "gender": ["m"],
          "language": ["french"],
          "frequency": 177.41
        },
        "len": 1,
        "errorLengthRatio": 0,
        "position": {
          "substring": {
            "begin": 0,
            "end": 6
          },
          "fullstring": {
            "begin": 0,
            "end": 6
          }
        }
      }]
    }, {
      input: "les",
      output: []
    }, {
      input: "media",

      // FIXME this is actually not good, because setting the fuzzy parameter to 0 should have prevent this
      output: [{
        "ngram": "media",
        "value": {
          "name": "medea",
          "gender": ["f"],
          "language": ["greek mythology (latinized)"],
          "frequency": 0.1
        },
        "len": 1,
        "errorLengthRatio": 0.2,
        "position": {
          "substring": {
            "begin": 0,
            "end": 5
          },
          "fullstring": {
            "begin": 0,
            "end": 5
          }
        }
      }]
    }, {
      input: "grid",
      output: []
    }].map(test => {
      return parseNames(test.input).then(output => {
        //console.log("output: " + JSON.stringify(output));
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
    Promise.all([{
      input: "mon prénom est julian bilcke",
      output:

        [{
        "ngram": "julian",
        "value": {
          "name": "julian",
          "gender": ["m"],
          "language": ["english"],
          "frequency": 0.19
        },
        "len": 1,
        "errorLengthRatio": 0,
        "position": {
          "substring": {
            "begin": 15,
            "end": 21
          },
          "fullstring": {
            "begin": 15,
            "end": 21
          }
        }
      }]
    }, {
      input: "my name is pierre dupont",
      output: [{
        "ngram": "pierre",
        "value": {
          "name": "pierre",
          "gender": ["m"],
          "language": ["french"],
          "frequency": 177.41
        },
        "len": 1,
        "errorLengthRatio": 0,
        "position": {
          "substring": {
            "begin": 11,
            "end": 17
          },
          "fullstring": {
            "begin": 11,
            "end": 17
          }
        }
      }]




    }, {
      input: "el nombre es sowmya dupond",
      output: [{
        "ngram": "sowmya",
        "value": {
          "name": "sowmya",
          "gender": ["f"],
          "language": ["tamil"],
          "frequency": 0
        },
        "len": 1,
        "errorLengthRatio": 0,
        "position": {
          "substring": {
            "begin": 13,
            "end": 19
          },
          "fullstring": {
            "begin": 13,
            "end": 19
          }
        }
      }]

    }, {
      input: "les media",
      output:

        [{
        "ngram": "media",
        "value": {
          "name": "medea",
          "gender": ["f"],
          "language": ["greek mythology (latinized)"],
          "frequency": 0.1
        },
        "len": 1,
        "errorLengthRatio": 0.2,
        "position": {
          "substring": {
            "begin": 4,
            "end": 9
          },
          "fullstring": {
            "begin": 4,
            "end": 9
          }
        }
      }]

    }, {
      input: "in grid",
      output: []
    }].map(test => {
      return parseNames(test.input).then(output => {
        //console.log("output: " + JSON.stringify(output));
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
