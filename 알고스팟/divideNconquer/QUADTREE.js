var input = [];

var rl = require('readline');
rl.createInterface(process.stdin, {})
    .on('line', function (line) {
        input.push(line.trim());
        if(+input[0] === input.length - 1){
            this.close();
        }
    }).on('close', function () {
        for (var i = 1; i <= +input[0]; i++){
            var str = input[i].trim();
            var strIter = str[Symbol.iterator]();
            console.log(reverse(strIter));
        }
    });

function reverse(stringItr) {
    var head = stringItr.next();
    if (head.value === 'b' || head.value === 'w') {
        return head.value;
    }
    var upperLeft = reverse(stringItr);
    var upperRight = reverse(stringItr);
    var lowerLeft = reverse(stringItr);
    var lowerRight = reverse(stringItr);

    // 각각 위와 아래 조각들의 위치를 바꾼다.
    return "x" + lowerLeft + lowerRight + upperLeft + upperRight;
}