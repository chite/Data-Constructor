class Node {
    constructor(val, priority) {
        this.val = val;
        this.priority = priority;
    }
}

//MinBiHeap is a heap class and contains insert() and extract() methods for efficiently storing and extracting Nodes in order (min to max).
class MinBiHeap {
    constructor() {
        this.values = [];
    }

    insert(entry, priority) {
        let newNode = new Node(entry, priority);
        const values = this.values;
        values.push(newNode);

        function bubbleUp() {

            let index = values.length - 1;
            const node = values[index];

            while (index > 0) {
                let parentIndex = Math.floor((index - 1) / 2);
                let parent = values[parentIndex];

                if (node.priority >= parent.priority)
                    break;

                values[parentIndex] = node;
                values[index] = parent;
                index = parentIndex;
            }
        }

        bubbleUp();
    }

    extract() {

        const values = this.values
        const min = this.values[0];
        const end = this.values.pop();

        function bubbleDown() {
            let index = 0;
            const element = values[0];

            while (index < values.length - 1) {
                let leftIndex = 2 * index + 1;
                let rightIndex = 2 * index + 2;
                let leftChild, rightChild;
                let swap = null;

                if (leftIndex < values.length) {
                    leftChild = values[leftIndex];
                    if (leftChild.priority < element.priority)
                        swap = leftIndex;
                }

                if (rightIndex < values.length) {
                    rightChild = values[rightIndex];
                    if ((swap === null && rightChild.priority < element.priority) ||
                        (swap !== null && rightChild.priority < leftChild.priority)) {
                        swap = rightIndex;
                    }
                }
                if (swap === null)
                    break;

                values[index] = values[swap];
                values[swap] = element;

                index = swap;
            }
        }

        if (values.length > 0) {
            this.values[0] = end;
            bubbleDown();
        }
        return min;
    }

};

//Graph is a weighted graph class with common methods for adding and removing nodes and edges 
//- addVertex(), removeVertex(), addEdge(), removeEdge()
//as well as iterative Breadth First Search and Depth First Search traversal methods - dfsTraversalI(), bfsTraversalI()
//and a shortestPath() (aka Dijkstra's) method for finding the shortest path between 2 nodes in the graph.
class Graph {
    constructor() {
        this.adjList = {};
    }

    addVertex(vertex) {
        if (!this.adjList[vertex])
            this.adjList[vertex] = [];
        else
            console.log("vertex exists")
    }

    removeVertex(vertex) {
        while (this.adjList[vertex].length) {
            const adjVertex = this.adjList[vertex].pop();
            this.removeEdge(vertex, adjVertex);
        }
        delete this.adjList[vertex];
    }

    addEdge(v1, v2, weight) {
        if (this.adjList[v1] && this.adjList[v2]) {
            this.adjList[v1].push({ node: v2, weight });
            this.adjList[v2].push({ node: v1, weight });
        }
        else
            console.log("error adding edge");
    }

    removeEdge(v1, v2) {
        if (this.adjList[v1] && this.adjList[v2]) {
            this.adjList[v1] = this.adjList[v1].filter(entry => entry !== v2);
            this.adjList[v2] = this.adjList[v2].filter(entry => entry !== v1);
        }
        else
            console.log("error removing edge");
    }

    dfsTraversalI(vertexIn) {
        const results = [];
        const visited = {};
        const stack = [vertexIn];
        let currentVert;

        visited[vertexIn] = true;

        while (stack.length) {
            currentVert = stack.pop();
            results.push(currentVert);

            this.adjList[currentVert].forEach(edge => {
                if (!visited[edge]) {
                    visited[edge] = true;
                    stack.push(edge);
                }
            });
        }

        return results;
    }

    bfsTraversalI(vertexIn) {
        const results = [];
        const visited = {};
        const queue = [vertexIn];
        let currentVert;

        visited[vertexIn] = true;

        while (queue.length) {
            currentVert = queue.shift();
            results.push(currentVert);

            this.adjList[currentVert].forEach(edge => {
                if (!visited[edge]) {
                    visited[edge] = true;
                    queue.push(edge);
                }
            });
        }

        return results;
    }

    //Dijkstrka's
    shortestPath(start, end) {
        const nodes = new MinBiHeap();
        const distances = {};
        const previous = {};
        let path = [];
        let smallest;

        //build initial state
        for (let vert in this.adjList) {
            if (vert === start) {
                //distance to starting node is 0
                distances[vert] = 0;
                nodes.insert(vert, 0);
            } else {
                //all distances to other nodes are infinity
                distances[vert] = Infinity;
                nodes.insert(vert, Infinity);
            }
            //all previous nodes set to null
            previous[vert] = null;
        }

        //While we still have nodes to visit...
        while (nodes.values.length) {

            //extract a node from the heap
            smallest = nodes.extract().val;

            //Stopping case:
            //Finish building the final state and break
            if (smallest === end) {
                while (previous[smallest]) {
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                break;
            }

            if (smallest || distances[smallest] !== Infinity) {
                for (let neighbor in this.adjList[smallest]) {
                    //find neighbors
                    let nextNode = this.adjList[smallest][neighbor];

                    //calculate new dist to node
                    let nodeVal = distances[smallest] + nextNode.weight;
                    let nextNeighbor = nextNode.node;

                    if (nodeVal < distances[nextNeighbor]) {
                        //update new smallest distance to neighbor
                        distances[nextNeighbor] = nodeVal;
                        //update previous
                        previous[nextNeighbor] = smallest;
                        //insert in PQ with new priority;
                        nodes.insert(nextNeighbor, nodeVal);
                    }
                }
            }
        }
        return path.concat(smallest).reverse();
    }
}

module.exports = Graph;