let n;
let map = new Array(30);
for(let i = 0; i < 30; i++){
    map[i].fill(new Array(30));
}
let visit = new Array(30).fill(0);

function DFS(vertex){
   let i;

   visit[vertex] = 1;
   for (i = 1; i <= n; i++)    {
       if (map[v][i] == 1 && !visit[i])    {
           console.log("%d에서 %d로 이동", v, i);
           DFS(i);        // 재귀 !        재귀라서 나아갈 곳이 없으면 다시 돌아온다.
       }
   }
}

process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if (isFirst) {
  } else {
      
  }
  if (chunk !== null) {
    process.stdout.write(`data: ${chunk}`);
  }
});

function main(){
   let start;
   let v1, v2;

   scanf("%d%d", &n, &start);

   while (1)
   {
       scanf("%d%d", &v1, &v2);
       if (v1 == -1 && v2 == -1)    {
           break;
       }
       map[v1][v2] = map[v2][v1] = 1;
   }

   DFS(start);

   return 0;
}
