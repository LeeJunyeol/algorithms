var Graph = (function(){
    // Vertex: 노드
    // Arc: 간선(엣지)
    function Vertex(key){
        this.next = null;
        this.arc = null;
        this.key = key;
        this.inTree = null;
    }
    function Arc(data, dest, capacity){
        this.nextArc = null;
        this.destination = dest;
        this.data = data;
        this.capacity = capacity;
        this.inTree = null;        
    }
    function Graph(){
        this.count = 0;
        this.first = null;
    }
    Graph.prototype.insertVertex = function (key){
        var vertex = new Vertex(key);
        var last = this.first;
        if(last){
            while(last.next !== null){
                last = last.next;
            }
            last.next = vertex;
        } else {
            this.first = vertex;
        }
        this.count++;        
    }
    
})