var input = [];

let testCase;
let isFirst = true;

var rl = require('readline');
rl.createInterface(process.stdin, {})
    .on('line', function (line) {
        if (isFirst) {
            testCase = parseInt(line.trim());
            isFirst = false;
            return;
        } else {
            --testCase;
            console.log(wellMatched(line.trim())? "YES":"NO");
        }
        if (testCase === 0) {
            this.close();
            process.stdin.destroy();
        }
    });

function wellMatched(formula) {
    // 여는 괄호 문자들과 닫는 괄호 문자들
    const opening = "({[",
        closing = ")}]";

    // 이미 열린 괄호들을 순서대로 담는 스택
    let openStack = [];
    for (let i = 0; i < formula.length; ++i) {
        // 여는 괄호인지 닫는 괄호인지 확인한다.
        if (opening.includes(formula[i])) {
            // 여는 괄호라면 무조건 스택에 집어넣는다.
            openStack.push(formula[i]);
        } else {
            // 이 외의 경우 스택 맨 위의 문자와 맞춰보자.
            // 스택이 비어 있는 경우에는 실패
            if (openStack.length === 0) return false;
            // 서로 짝이 맞지 않아도 실패
            if (opening.indexOf(openStack.slice(-1)) != closing.indexOf(formula[i])) return false;
            // 짝을 맞춘 괄호는 스택에서 뺀다.
            openStack.pop();
        }
    }
    // 닫히지 않은 괄호가 없어야 성공
    return openStack.length === 0 ? true : false;
}

console.log(wellMatched("()()"));
console.log(wellMatched("({[}])"));
console.log(wellMatched("({}[(){}])"));