
class Node {
    constructor(tile, cost, level, parent) {
        this.tile = tile;
        this.cost = cost;
        this.level = level;
        this.parent = parent;
    }
}

export default class AStar {
    constructor(grid, width, height, start, end) {
        this.grid = grid;
        this.width = width;
        this.height = height;
        this.start = new Node(start, -1, 0, null);
        this.end = end;
    }

    manhattanDistance(tile) {
        return Math.abs(tile.x - this.end.x) + Math.abs(tile.y - this.end.y);
    }
    // gets next valid move
    getMove(tile, dir) {
        if (tile.neighbors[dir] != null && tile.sides[dir] == 0) return dir;
        else return -1;
    }

    addQueue(queue, node) {
        const length = queue.length;
        // if queue is empty or node cost is least push to queue
        if(queue.length == 0 || node.cost < queue[length - 1].cost) {
            queue.push(node);
            return queue;
        }
        var index = 0;
        // find next largest node
        for(var i = 0; i < length; i++) {
            if(node.cost < queue[i].cost) {
                index = i;
                break;
            }
        }
        // add to queue at index
        var temp = new Array(length + 1);
        temp[index] = node;
        for(var i = 0; i < temp.length; i++) {
            if(i < index) temp[i] = queue[i];
            else if(i > index) temp[i] = queue[i - 1];
        }
        return temp;
    }

    generateSolution() {
        var queue = [this.start];
        var seen = this.initSeen();
        while(queue.length != 0) {
            const current = queue.pop();    // remove top of list
            seen[current.tile.x][current.tile.y] = true;  // set current node to seen
            // solution found
            if(current.tile.index == this.end.index) {
                return this.solutionPath(current);
            }
            // looks at possible moves
            for(var i = 0; i < 4; i++) {
                const move = this.getMove(current.tile, i);
                if(move == -1) continue;
                const temp = current.tile.neighbors[move];
                // skips if seen
                if(seen[temp.x][temp.y]) continue;
                const cost = this.manhattanDistance(current.tile);
                const newNode = new Node(temp, cost, current.level + 1, current);
                queue = this.addQueue(queue, newNode);
            }
        }
        return [];
    }

    // returns solution path of tiles from end node
    solutionPath(node) {
        var array = []
        var current = node;
        while(current != null) {
            array.push(current.tile);
            current = current.parent;
        }
        return array;
    }

    // init seen array
    initSeen() {
        var array = new Array(this.width);
        for(var i = 0; i < array.length; i++) {
            var temp = new Array(this.height);
            for(var j = 0; j < temp.width; j++) {
                temp[j] = false;
            }
            array[i] = temp;
        }
        return array;
    }
}