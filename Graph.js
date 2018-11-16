class Graph {

    constructor() {
        this.numVertices = 0
        this.adj = {}
    }

    addVertex(v) {
        this.adj[v] = []
        this.numVertices++
    }

    addEdge(v, w) {
        this.adj[v].push(w)
        // Undirected graph so must add opposite edge
        this.adj[w].push(v)
    }
    checkAdj(v){
        return this.adj[v]
    }
}

exports.Graph = Graph