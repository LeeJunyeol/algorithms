// 이 프로그램은 구간 A에서 구간 B로 가장 짧은 길로 가는 경우의 수를 구하는 프로그램이다. 
// 이 프로그램에서 A는 시작점, B는 도착점, S는 경유지를 말한다. 나머지는 0으로 표시하는데, A와 B, S, 0이 있는 위치는 모두 갈림길이다.

// 입력 예시(길의 형태)

// 4 4
// A000
// 0000
// 00S0
// 000B
// 출력 예시(최단경로의 경우의 수)

// 12
// 다음과 같이 최단경로의 경우의 수를 구하는 프로그램을 작성하라.(단, S의 개수는 마음대로 정해도 된다.)

process.stdin.setEncoding('utf8');

var input = [];
var isFirst = true;
var n = 0;
var m = 0;
var k = 0;
var count = 0;

process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if (chunk !== null) {
    process.stdout.write(`data: ${chunk}`);
  }
});


process.stdin.on('data', function (chunk) {
    if (isFirst) {
        var firstLine = chunk.trim().split(" ").map((v => parseInt(v)));
        n = firstLine[0];
        m = firstLine[1];
        k = firstLine[2];

        isFirst = false;
    } else {
        input.push(chunk.trim());
        count++;
    }

    if (count === k) {
        run();
        process.exit(0);
    }
});