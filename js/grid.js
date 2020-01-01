import Tile from './tile.js';

export default class Grid {
    constructor(width, height, size, c) {
        this.width = width;
        this.height = height;
        this.size = size;
        this.c = c;

        this.current = null;   // current node
        this.grid = this.createGrid();
        this.setStartEnd();
        this.neighborTiles();
    }

    createGrid() {
        var index = 0;
        var array = Array(this.width);
        for(var i = 0; i < this.width; i++) {
            var temp = Array(this.height);
            for(var j = 0; j < this.height; j++) {
                temp[j] = new Tile(this.c, i, j, this.size, 0, index);
                index = index + 1;
            }
            array[i] = temp;
        }
        return array;
    }

    setStartEnd() {
        const start = Math.floor(Math.random() * this.height);
        const end   = Math.floor(Math.random() * this.height);

        this.setCurrent(0, start);
        this.grid[this.width - 1][end].value = 3;
    }

    neighborTiles() {
        for (var i = 0; i < this.width; i++) {
            for (var j = 0; j < this.height; j++) {
                var north = null;
                if(j - 1 >= 0) north = this.grid[i][j - 1];
                var south = null;
                if(j + 1 < this.height) south = this.grid[i][j + 1];
                var east = null;
                if(i + 1 < this.width) east = this.grid[i + 1][j];
                var west = null;
                if(i - 1 >= 0) west = this.grid[i - 1][j];

                this.grid[i][j].setNeighbors(north, south, east, west);
            }
        }
    }

    setCurrent(x, y) {
        this.current = this.grid[x][y];
        if (this.grid[x][y].value == 3) return;
        this.current.setVal(4);
    }
}