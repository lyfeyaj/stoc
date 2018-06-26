Stoc
====

[![Build Status](https://travis-ci.org/lyfeyaj/stoc.svg?branch=master)](https://travis-ci.org/lyfeyaj/stoc)
[![npm version](https://badge.fury.io/js/stoc.svg)](https://badge.fury.io/js/stoc)
[![npm](https://img.shields.io/npm/dt/stoc.svg)]()
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/lyfeyaj/stoc/master/LICENSE.md)

String to object compiler for Javascript

## Installation

```bash
npm install stoc

# or

yarn install stoc
```

## Usage

```javascript
const stoc = require('stoc');

stoc(`
  {
    name
    gender
    children {
      name: nickname
      age
      hobbies: habits {
        name
        type
      }
    }
  }
`)

// or
stoc('{name gender children{name:nickname age hobbies:habits{name type}}}')

// Output =>

{
  name: 1,
  gender: 1,
  children: {
    name: 'nickname',
    age: 1,
    hobbies: 'habits',
    habits: {
      name: 1,
      type: 1
    }
  }
}
```

Enjoy !
