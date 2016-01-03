'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _moonshine = require('@datagica/moonshine');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultDatabase = require('./database');

var ParseNames = (function (_EntityParser) {
  (0, _inherits3.default)(ParseNames, _EntityParser);

  function ParseNames() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {
      toIndex: 'name',
      overlapping: false,
      fuzzy: 0,
      maxResults: 1
    } : arguments[0];
    (0, _classCallCheck3.default)(this, ParseNames);
    return (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(ParseNames).call(this, opts));
  }

  return ParseNames;
})(_moonshine.EntityParser);

var singletonInstance = new ParseNames();
singletonInstance.db.load(defaultDatabase);
var singletonMethod = function singletonMethod(input, opts) {
  return singletonInstance.parse(input, opts);
};

module.exports = singletonMethod;
module.exports.default = singletonMethod;
module.exports.parseNames = singletonInstance;
module.exports.ParseNames = ParseNames;