
export default class RecursiveBacktracker {
     constructor(grid, width, height, start) {
        this.grid = grid;
        this.width = width;
        this.height = height;

        this.seen = this.initSeen();
        this.generateMaze(start);
     }

     generateMaze(start) {
        var stack = [];
        this.addToStack(stack, start)

        while(stack.length > 0) {
            var current = stack[stack.length - 1];
            var neighbors = this.getNeighbors(current);
            
            if(neighbors.length == 0) {
                stack.pop();
            } else {
                var randIndex = Math.floor(Math.random() * neighbors.length);
                this.addToStack(stack, current.neighbors[neighbors[randIndex]]);
                current.changeSide(neighbors[randIndex], 0);
            }
        }
     }

     // returns array of a tile's unseen neighbors
     getNeighbors(tile) {
         var array = [];
         for(var i = 0; i < tile.neighbors.length; i++) {
             const current = tile.neighbors[i];
             if(current == null) continue;
             if(this.seen[current.index] == 0) 
                array.push(i);
         }
         return array;
     }

     // adds to stack array and marks as seen
     addToStack(stack, elem) {
         stack.push(elem);
         this.seen[elem.index] = 1;
     }

     initSeen() {
         var array = Array(this.width * this.height);
         for(var i = 0; i < array.length; i ++) array[i] = 0;
         return array;
     }
}