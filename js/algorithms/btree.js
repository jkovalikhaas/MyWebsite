
export default class BSTree {
    constructor(grid, width, height) {
        this.grid = grid;
        this.width = width;
        this.height = height;
        this.generateMaze();
    }

    generateMaze() {
        for(var i = 0; i < this.width; i ++) {
            for(var j = 0; j < this.height; j++) {
                var temp = this.grid[i][j];

                let index = Math.floor(Math.random() * 2);
                if(index == 0) {
                    this.north(temp);
                } else if(index == 1) {
                    this.east(temp);
                }
            }
        }
    }

    north(tile) {
        if(tile.neighbors[0] != null) tile.changeSide(0, 0);
        else {
            if (tile.neighbors[2] != null) this.east(tile);
        }
    }
    
    east(tile) {
        if(tile.neighbors[2] != null) tile.changeSide(2, 0);
        else {
            if(tile.neighbors[0] != null) this.north(tile);
        }
    }
}