'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _parseNames = require('../../lib/parse-names');

var _parseNames2 = _interopRequireDefault(_parseNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chai = require('chai');
chai.use(require('chai-fuzzy'));
var expect = chai.expect;

describe('@datagica/parse-names', function () {

  it('should validate names', function (done) {
    _promise2.default.all([{
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
    }].map(function (test) {
      return (0, _parseNames2.default)(test.input).then(function (output) {
        //console.log("output: " + JSON.stringify(output));
        expect(output).to.be.like(test.output);
        return _promise2.default.resolve(true);
      });
    })).then(function (finished) {
      done();
    }).catch(function (exc) {
      console.error(exc);
    });
  });
  it('should detect names in full sentences', function (done) {
    _promise2.default.all([{
      input: "mon prénom est julian bilcke",
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
    }].map(function (test) {
      return (0, _parseNames2.default)(test.input).then(function (output) {
        //console.log("output: " + JSON.stringify(output));
        expect(output).to.be.like(test.output);
        return _promise2.default.resolve(true);
      });
    })).then(function (finished) {
      done();
    }).catch(function (exc) {
      console.error(exc);
    });
  });
});