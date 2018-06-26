/* eslint-disable */
'use strict';

const stoc = require('../');
const humanize = require('humanize-number');

let prev = Date.now(), start = Date.now();
let ops = 5000;
let results = [];
let str = `
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
`;
let bytes = new Buffer(str).byteLength;
let ms;
let totalOpts = ops * 100;

for (let i = 1; i <= totalOpts; i++) {
  stoc(str);

  if (i % ops == 0) {
    ms = Date.now() - prev;
    let sec = ms / 1000;
    let persec = ops / sec | 0;
    results.push(persec);
    process.stdout.write('\r  [' + persec + ' ops/s] [' + i + ']');
    prev = Date.now();
  }
}

function min(arr) {
  return arr.reduce(function(min, n){
    return n < min
      ? n
      : min;
  });
}

function median(arr) {
  arr = arr.sort();
  return arr[arr.length / 2 | 0];
}

function done(){
  let ms = Date.now() - start;
  let avg = totalOpts / (ms / 1000);
  console.log('\n');
  console.log('      min: %s ops/s', humanize(min(results)));
  console.log('     mean: %s ops/s', humanize(avg | 0));
  console.log('   median: %s ops/s', humanize(median(results)));
  console.log('    total: %s ops in %ds', humanize(totalOpts), ms / 1000);
  console.log('  through: %d mb/s', ((avg * bytes) / 1024 / 1024).toFixed(2));
  console.log();
  process.exit();
}

done(results);
