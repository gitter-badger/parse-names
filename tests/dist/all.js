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
    _promise2.default.all([{ input: "julian", output: "julian" }, { input: "pierre", output: "pierre" }, { input: "les", output: undefined }, { input: "media", output: undefined }, { input: "grid", output: undefined }].map(function (test) {
      return (0, _parseNames2.default)(test.input).then(function (output) {
        console.log("output: " + JSON.stringify(output));
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
    _promise2.default.all([{ input: "mon prénom est julian bilcke", output: "julian" }, { input: "my name is pierre dupont", output: "pierre" }, { input: "el nombre es sowmya dupond", output: "sowmya" }, { input: "les media", output: undefined }, { input: "in grid", output: undefined }].map(function (test) {
      return (0, _parseNames2.default)(test.input).then(function (output) {
        console.log("output: " + JSON.stringify(output));
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