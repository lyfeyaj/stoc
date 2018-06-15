# Stoc

String to object compiler for Javascript

## Usage

```javascript
const stoc = require('stoc');

stoc(`
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
`)

// or
stoc('{name gender children{name age hobbies{name type}}}')

// Output =>

{
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
}
```

Enjoy !
