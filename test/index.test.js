'use strict';

const chai = require('chai');
const expect = chai.expect;
const stoc = require('../');

describe('stoc', function() {
  it('should be able to parse string template to object', function() {
    expect(stoc('name gender')).to.deep.eq({ name: 1, gender: 1 });
    expect(stoc('{name gender}')).to.deep.eq({ name: 1, gender: 1 });
    expect(stoc('{ name gender }')).to.deep.eq({ name: 1, gender: 1 });
    expect(stoc(`
      {
        name
        gender
      }
    `)).to.deep.eq({ name: 1, gender: 1 });
  });

  it('should be able to parse string template with nested structure to object', function() {
    expect(stoc(`
      {
        name
        gender
        children {
          name
          age
          hobbies {
            name
            type
          }
        }
      }
    `)).to.deep.eq({
      name: 1,
      gender: 1,
      children: {
        name: 1,
        age: 1,
        hobbies: {
          name: 1,
          type: 1
        }
      }
    });
  });

  it('should be able to parse string template with name alias to object', function() {
    expect(stoc(`
      {
        name: nickname
        gender: sex
        age
        children {
          name
        }
      }
    `)).to.deep.eq({
      name: 'nickname',
      gender: 'sex',
      age: 1,
      children: {
        name: 1
      }
    });
  });

  it('should be able to parse compact string template to object', function() {
    expect(stoc('{name gender:sex age children{name}}')).to.deep.eq({
      name: 1,
      gender: 'sex',
      age: 1,
      children: {
        name: 1
      }
    });
  });

  it('should be able to rename fields', function() {
    expect(stoc('{name gender:sex age children:babies{name foods:eatables{name}}}')).to.deep.eq({
      name: 1,
      gender: 'sex',
      age: 1,
      children: 'babies',
      babies: {
        name: 1,
        foods: 'eatables',
        eatables: {
          name: 1
        }
      }
    });
  });
});
