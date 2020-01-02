// maze tile class

export default class Tile {
    constructor(c, x, y, size, value, index) {
        this.c = c;
        this.x = x;
        this.y = y;
        this.size = size;
        this.value = value;
        this.index = index;

        this.cvsX = x * size;
        this.cvsY = y * size;
        this.maxX = this.cvsX + this.size;
        this.maxY = this.cvsY + this.size;

        this.sides = [1, 1, 1, 1];
        this.neighbors = Array(4);
        this.wallColor = 'black';
    }

    // control shapes appearence 
    draw(x=this.cvsX, y=this.cvsY) {
        if (this.value == 0) {
            // 'empty' tile
            this.c.fillStyle = 'gray';
        } else if (this.value == 1) {
            // seen
            this.c.fillStyle = 'orange';
        } else if (this.value == 2) {
            // wall
            this.c.fillStyle = this.wallColor;
        } else if (this.value == 3) {
            // end tile
            this.c.fillStyle = 'red';
        } else if (this.value == 4) {
            // selected tile
            this.c.fillStyle = 'yellow';
        } else if (this.value == 5) {
            // search algorithm
            this.c.fillStyle = 'rgba(0, 255, 131, 1.0)';
        }
        this.c.fillRect(x, y, this.size, this.size);
        this.c.strokeStyle = this.wallColor;
        this.c.lineWidth = 1;
        this.c.strokeRect(x, y, this.size, this.size);

        this.drawBox(x, y);
    }

    // creates a line
    line(direction, x, y) {
        this.c.beginPath();
        this.c.strokeStyle = this.wallColor;
        this.c.lineWidth = 8;
        if(direction == 0) {
            // north
            this.c.moveTo(x, y);
            this.c.lineTo(x + this.size, y);
        } else if(direction == 1) {
            // south
            this.c.moveTo(x, y + this.size);
            this.c.lineTo(x + this.size,y + this.size);
        } else if(direction == 2) {
            // east
            this.c.moveTo(x + this.size, y);
            this.c.lineTo(x + this.size, y + this.size);
            
        } else if(direction == 3) {
            // west
            this.c.moveTo(x, y);
            this.c.lineTo(x, y + this.size);
        }
        this.c.stroke()
    }

    // draws box with lines
    drawBox(x, y) {
        for(var i = 0; i < this.sides.length; i++) {
            if(this.sides[i] == 1) {
                this.line(i, x, y);
            }
        }
    }

    changeSide(side, val) {
        this.sides[side] = val;
        if(side == 0) {
            // north
            if(this.neighbors[0] != null) this.neighbors[0].sides[1] = val;
        } if(side == 1) {
            // south
            if(this.neighbors[1] != null) this.neighbors[1].sides[0] = val;
        } if(side == 2) {
            // east
            if(this.neighbors[2] != null) this.neighbors[2].sides[3] = val;
        } if(side == 3) {
            // west
            if(this.neighbors[3] != null) this.neighbors[3].sides[2] = val;
        }
        this.draw();
    }

    setVal(val) {
        this.value = val;
        this.draw();
    }

    setNeighbors(north, south, east, west) {
        this.neighbors = [north, south, east, west];
    }
}