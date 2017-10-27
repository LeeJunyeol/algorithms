function findLargestSquare(board) {
    var answer = 0;

    var valArr = [];
    var endPoint = board[0].length;
    for (let i = 0; i < board.length; i++) {
        var newRow = [];
        for (let j = 0; j < endPoint; j++) {
            if (board[i][j] === 'X') {
                newRow.push(0);
            } else {
                newRow.push(1);
            }
        }
        endPoint = 1;
        valArr.push(newRow);
    }
    for (let i = 1; i < board.length; i++) {
        for (let j = 1; j < board[i].length; j++) {
            if (board[i][j] !== 'X') {
                valArr[i].push(Math.min.apply(null, [valArr[i - 1][j - 1], valArr[i - 1][j], valArr[i][j - 1]]) + 1);
            } else {
                valArr[i].push(0);
            }
            if (answer < valArr[i][j]) {
                answer = valArr[i][j];
            }
        }
    }
    return answer * answer;
}

//아래 코드는 테스트를 위한 출력 코드 입니다.
var testBoard = [
    ['X', 'O', 'O', 'O', 'X'],
    ['X', 'O', 'O', 'O', 'O'],
    ['X', 'X', 'O', 'O', 'O'],
    ['X', 'X', 'O', 'O', 'O'],
    ['X', 'X', 'X', 'X', 'X']
];
// var testBoard = [
//     ['X', '1', '1', '1', 'X'],
//     ['X', '1', '2', '2', '1'],
//     ['X', 'X', '1', '2', '2'],
//     ['X', 'X', '1', '2', '3'],
//     ['X', 'X', 'X', 'X', 'X']
// ];

console.log(findLargestSquare(testBoard));