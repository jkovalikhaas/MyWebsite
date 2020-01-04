
export default class LongestPath {
    constructor(grid, width, height, start) {
        this.grid = grid;
        this.width = width;
        this.height = height;
        this.start = start;

        this.seen = this.initSeen();
        this.generateCosts(this.start);
    }

    generateCosts(current) {
        if(this.allSeen()) return;
        // check all neighbors of current node
        for(var i = 0; i < 4; i++) {
            // skips if neighbor is null or has wall or has been seen
            if(current.neighbors[i] == null) continue;
            if(current.sides[i] == 1) continue;
            const temp = current.neighbors[i];
            if(this.seen[temp.x][temp.y] > 0 || temp.index == this.start.index) continue;
            this.seen[temp.x][temp.y] = this.seen[current.x][current.y] + 1;
            // recursively call next tile
            this.generateCosts(temp);
        }
    }

    // returns max path lenght from seen list
    maxPath() {
        var max = 0;
        var current = null;
        for (var i = 0; i < this.width; i++) {
            for (var j = 0; j < this.height; j++) {
                if(this.seen[i][j] > max) {
                    max = this.seen[i][j];
                    current = this.grid[i][j];
                }
            }
        }
        return current;
    }

    // checks if seen is full (all but start node val > 0)
    allSeen() {
        for (var i = 0; i < this.width; i++) {
            for (var j = 0; j < this.height; j++) {
                if (i == this.start.x && j == this.start.y) continue;
                if (this.seen[i][j] == 0) return false;
            }
        }
        return true;
    }

    // inits seen list of distance from start (seen if val > 0)
    initSeen() {
        var array = new Array(this.width);
        for(var i = 0; i < array.length; i++) {
            var temp = new Array(this.height);
            for(var j = 0; j < temp.length; j++) {
                temp[j] = 0;
            }
            array[i] = temp;
        }
        return array;
    }

    // prints seen array
    printSeen() {
        for (var i = 0; i < this.height; i++) {
            var temp = '';
            for (var j = 0; j < this.width; j++) {
                temp = temp + ' ' + this.seen[j][i].toString();
            }
            console.log(temp);
        }
    }
}