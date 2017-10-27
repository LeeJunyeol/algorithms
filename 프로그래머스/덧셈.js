process.stdin.resume();
process.stdin.setEncoding('utf8');

var input = [];
var count = 0;
process.stdin.on('data', function(chunk) {
    input.push(parseInt(chunk.trim()));
    count++;
    if(count===2){
        console.log(input.reduce((c, v) => c+v,0));
        process.exit(0);
    }
});

process.stdin.on('end', function() {
});