'use strict';

module.exports = function stoc(str) {
  str = (str || '').replace(/\s/g, ' ').trim();

  if (str.indexOf('{') !== 0) str = '{' + str + '}';

  str = str
    .replace(/(\{|\})/g, ' $1 ')
    .replace(/: +/g, ':')
    .replace(/(:\w+) +/g, '$1,')
    .replace(/([^ {}:,]+)/g, '"$1"')
    .replace(/\} */g, ' },')
    .replace(/, \}/g, ',}')
    .replace(/ *\{ */g, ':{')
    .replace(/ +/g, ':1,')
    .replace(/^: */, '')
    .replace(/ *,$/, '')
    .replace(/, *\}/g, '}');

  return JSON.parse(str);
};
