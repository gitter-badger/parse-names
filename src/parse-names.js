import { EntityParser } from '@datagica/moonshine';

const defaultDatabase = require('./database');

class ParseNames extends EntityParser {
  constructor(opts = {
    toIndex: 'name'
  }) {
    super(opts);
  }
}

const singletonInstance = new ParseNames({})
singletonInstance.db.load(defaultDatabase);
const singletonMethod = function(input, opts) {
  return singletonInstance.parse(input, opts)
}

module.exports = singletonMethod
module.exports.default = singletonMethod
module.exports.parseNames = singletonInstance
module.exports.ParseNames = ParseNames
