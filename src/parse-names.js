import ParseEntities from '@datagica/parse-entities';

const defaultDatabase = require('./database');

class ParseNames extends ParseEntities {
  constructor(opts = {
    toIndex: 'name',
    overlapping: false,
    fuzzy: 0,
    maxResults: 1
  }) {
    super(opts);
  }
}

const singletonInstance = new ParseNames()
singletonInstance.db.load(defaultDatabase);
const singletonMethod = function(input, opts) {
  return singletonInstance.parse(input, opts)
}

module.exports = singletonMethod
module.exports.default = singletonMethod
module.exports.parseNames = singletonInstance
module.exports.ParseNames = ParseNames
