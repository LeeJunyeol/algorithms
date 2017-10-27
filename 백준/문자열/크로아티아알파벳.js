var input = require('fs').readFileSync('data/크로아티아알파벳').toString().trim().split('\n');

var str = input[0];

var re = /c\=|c\-|dz\=|d\-|lj|nj|s\=|z\=/g;

str = str.replace(re, 0);
console.log(str.length);
