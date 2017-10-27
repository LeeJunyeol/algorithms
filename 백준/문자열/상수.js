var input = require('fs').readFileSync('data/상수').toString().trim().split('\n');

var mn = input[0].split(" ");
var a = mn[0];  
var b = mn[1];

a = parseInt(a.split("").reverse().join(""));
b = parseInt(b.split("").reverse().join(""));
console.log((a > b)? a : b);