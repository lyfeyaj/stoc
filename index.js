'use strict';

const LEFT_CURLY_BRACE = '{';
const RIGHT_CURLY_BRACE = '}';
const BLANK_SPACE = ' ';
const COLON = ':';
const RETURN_SYMBAL = '\n';
const TAB_SYMBAL = '\t';

function stoc(str) {
  let _str = (str || '').trim();

  if (!str) return {};

  let prefixLength = 0;

  // auto add left and right curly braces
  if (_str.charAt(0) !== LEFT_CURLY_BRACE) {
    _str = LEFT_CURLY_BRACE + _str + RIGHT_CURLY_BRACE;
    prefixLength = 1;
  }

  // parse result object container
  const result = {};

  // current parsing object
  let obj = result;

  let property = '';
  let lastUsedToken = '';
  let phase = 'property';

  // stack to temporary store object tree
  const stack = [];

  let isLeftCurlyBrace = false;
  let isBlank = false;
  let isNotBlank = false;
  let isRightCurlyBrace = false;
  let isColon = false;

  // syntax check for colon
  let disallowColon = 0;
  let propertyRequired = false;

  // iterate all characters
  let i = 0;
  while (i < _str.length) {
    let _char = _str.charAt(i);

    i++;

    isBlank = _char === BLANK_SPACE || _char === TAB_SYMBAL || _char === RETURN_SYMBAL;
    isNotBlank = !isBlank;
    isLeftCurlyBrace = _char === LEFT_CURLY_BRACE;
    isRightCurlyBrace = _char === RIGHT_CURLY_BRACE;
    isColon = _char === COLON;

    // when reach left curly brace, push current object into stack
    if (isLeftCurlyBrace) stack.push(obj);

    if (
      isLeftCurlyBrace ||
      isBlank ||
      isRightCurlyBrace ||
      isColon
    ) {
      // chack syntax after colon
      if (propertyRequired && isNotBlank) {
        throw new SyntaxError(`Unexpected token at position ${i - prefixLength - 1}`);
      }

      // when in 'rename' phase, mark property as rename
      if (phase === 'rename' && lastUsedToken && property) {
        obj[lastUsedToken] = property;

        // remember and clear used property
        lastUsedToken = property;
        property = ''

        // change phase to 'property'
        phase = 'property';

        if (disallowColon) disallowColon--;
      }

      // add property as object property
      if (phase === 'property') {
        if (property) {
          // when reach left curly brace, mark as {}; otherwise mark as 1
          if (isLeftCurlyBrace) {
            obj = obj[property] = {};
          } else {
            obj[property] = 1;
          }
          lastUsedToken = property;
          property = '';

          if (disallowColon) disallowColon--;
        } else {
          // in case renamed property has children
          if (isLeftCurlyBrace && lastUsedToken) {
            obj = obj[lastUsedToken] = {};
            lastUsedToken = '';
          }
        }
      }

      // when reach right curly brace, pop out parent object
      if (isRightCurlyBrace) {
        obj = stack.pop();

        if (obj === undefined) {
          throw new SyntaxError(`Unexpected token } at position ${i - prefixLength - 1}`);
        }
      }

      // when reach colon, mark as rename phase
      if (isColon) {
        phase = 'rename';
        propertyRequired = true;

        // check colon syntax
        if (disallowColon) {
          throw new SyntaxError(`Unexpected token : at position ${i - prefixLength - 1}`);
        }

        disallowColon = 2;
      } else if (isNotBlank) {
        phase = 'property';
      }
    } else {
      if (propertyRequired) propertyRequired = false;
      property = property + _char;
    }

  }

  // check whether curly braces are closed properly
  if (stack.length) throw new SyntaxError(`Unclosed curly brace in "${str}"`);

  return result;
}

module.exports = stoc;
