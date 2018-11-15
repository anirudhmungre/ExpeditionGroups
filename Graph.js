export class Graph {  
    constructor(numVertices){
        this.numVertices = numVertices
        this.AdjList = new Map()
    }
    addVertex = (v) => { 
        this.AdjList.set(v, null)
        this.numVertices++ 
    } 
    addEdge = (v, w) => {
        this.AdjList.get(v).push(w)
        // Undirected graph so must add opposite edge
        this.AdjList.get(w).push(v)  
    }
} 