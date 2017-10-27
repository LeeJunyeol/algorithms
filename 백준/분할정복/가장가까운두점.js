var input = require('fs').readFileSync('data/가장가까운두점').toString().trim().split('\n');

var n = parseInt(input.shift().trim());

var i, j;
var points = [];
for(i = 0; i < n; i++){
    points.push(input.shift().trim().split(" ").map(function(v){return parseInt(v)}));
}

// 점을 x로 정렬한다.
points.sort(function(pointA, pointB){
    return pointB[0] - pointA[0];
})
console.log(points);

var distance = getDistance(points[points.length - 1], points[points.length - 2]);

for(i = n - 1; i > 1; i--){
    for(j = 0; j < i - 1; j++){
        var dx = Math.pow(points[i][0] - points[j][0], 2);
        if(dx > distance){
            points.splice(j, 1);
            j--;
        }
    }
}
console.log(points);
console.log(distance);

function getDistance(pointA, pointB){
    var x = pointA[0] - pointB[0];
    var y = pointA[1] - pointB[1];
    return x*x + y*y;
}

// 점들이 좌표 평면에 주어질 경우, 이 문제는 다음과 같은 재귀적인 분할 정복 알고리즘으로 O(n log n)안에 해결할 수 있다.
// 점들을 x좌표에 따라 오름차순으로 정렬한다.
// 점들이 두개의 같은 크기의 집합으로 나뉘도록 수직선 {\displaystyle x=x_{mid}} {\displaystyle x=x_{mid}}을 기준으로 양옆으로 분할한다.
// 왼쪽과 오른쪽의 점들의 집합에 대해 재귀적으로 문제를 해결한다. 이것을 통해 왼쪽과 오른쪽에서의 최근접 거리인 {\displaystyle d_{Lmin}} {\displaystyle d_{Lmin}} 와 {\displaystyle d_{Rmin}} {\displaystyle d_{Rmin}}을 찾을 수 있다.
// 하나의 점은 분할선 왼쪽에 존재하고, 다른 점은 분할선 오른쪽에 존재하는 쌍들 중 그 거리가 최소가 되는 쌍을 찾는다. 이것을 통해 {\displaystyle d_{LRmin}} {\displaystyle d_{LRmin}}을 찾을 수 있다.
// 최종적으로 찾고자 하는 최근접 거리는 {\displaystyle d_{Lmin},d_{Rmin},d_{LRmin}} {\displaystyle d_{Lmin},d_{Rmin},d_{LRmin}} 중 가장 짧은 거리이다.

// 다른 점은 (d*2d)크기의 직사각형 안에 존재해야 한다.
// 4번째 단계를 해결할 때 가능한 모든 쌍들을 탐색 해 본다면, 역시 제곱에 비례하는 시간이 필요할 것이다. 하지만 점들이 분포되어있는 특별한 성질을 이용한다면, 선형적 시간안에 해결될 수 있다. 3번 단계를 통해서, 가장 가까운 두 점은 {\displaystyle d=min(d_{Lmin},d_{Rmin})} {\displaystyle d=min(d_{Lmin},d_{Rmin})}보다 더 멀리 떨어져 있을 수는 없음을 알 수 있다. 따라서 분할선 왼쪽에 있는 각각의 점 {\displaystyle p} p에 대해서, {\displaystyle p} p의 {\displaystyle y} y좌표를 중심으로 하고 분할선 오른쪽에 존재하는 {\displaystyle (d,2d)} {\displaystyle (d,2d)} 크기의 직사각형 내부에 존재하는 점들에 대해서만 거리를 계산해도 된다. 이 직사각형은 최대 6개까지의 점만을 포함하기 때문에, 최대 {\displaystyle 6n} {\displaystyle 6n} 쌍의 점들에 대해서만 계산을 해도 충분히 최소 거리를 구할 수 있다. 
//이 알고리즘의 연산의 수행 횟수를 재귀식을 표현하면 {\displaystyle T(n)=2T(n/2)+O(n)} {\displaystyle T(n)=2T(n/2)+O(n)}으로 표현할 수 있으며, 마스터 정리에 따라 {\displaystyle O(nlogn)} {\displaystyle O(nlogn)}로 나타낼 수 있다.