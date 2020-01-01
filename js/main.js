import Tile from './tile.js';
import Grid from './grid.js';

import BSTree from './algorithms/btree.js';
import RecursiveBacktracker from './algorithms/recursiveBacktracker.js';

var canvas = document.querySelector('canvas');
var context = canvas.getContext("2d"); // canvas context
// other divs
var nav = document.getElementById('nav');

// init variables
var tilesize = 0;
var complete = false;
const defaultWidth = 17;
const defaultHeight = 11;
const center_x = 9;
const center_y = 6;
// user variables
const width = 30;
const height = 30;

// initial window sizes
drawElements();

// get grid
const maze = new Grid(width, height, tilesize, context);
var grid = maze.grid;
var current = maze.current;
// new BSTree(grid, width, height);
new RecursiveBacktracker(grid, width, height, maze.randomCell());

drawTiles();

// single click
function pressed(e) {
    if(complete) return;
    
    if(e.key == "ArrowUp" || e.key == "w") {
        if(current.neighbors[0] != null && current.sides[0] == 0) {
            grid[current.x][current.y].setVal(1);
            maze.setCurrent(current.x, current.y - 1);
        }
    } else if(e.key == "ArrowDown" || e.key == "s") {
        if(current.neighbors[1] != null && current.sides[1] == 0) {
            grid[current.x][current.y].setVal(1);
            maze.setCurrent(current.x, current.y + 1);
        }
    } else if (e.key == "ArrowRight" || e.key == "d") {
        if (current.neighbors[2] != null && current.sides[2] == 0) {
            grid[current.x][current.y].setVal(1);
            maze.setCurrent(current.x + 1, current.y);
        }
    } else if (e.key == "ArrowLeft" || e.key == "a") {
        if (current.neighbors[3] != null && current.sides[3] == 0) {
            grid[current.x][current.y].setVal(1);
            maze.setCurrent(current.x - 1, current.y);
        }
    } else {
        return;
    }

    current = maze.current;
    if(current.value == 3) {
        complete = true;
        alert("You Completed the Maze!\nRefresh for New Maze");
    }
    drawTiles();
}

function click(e) {
    if (complete) return;

    const x = parseInt((e.clientX - offset(canvas).left) / tilesize);
    const y = parseInt((e.clientY - offset(canvas).top) / tilesize); 
    // get x/y offset based on current pos
    var xOffset = 0;
    if (current.x - center_x >= 0) {
        xOffset = current.x - center_x + 1;
    } 
    if (current.x + center_x >= width) {
        xOffset = width - defaultWidth;
    }
    var yOffset = 0;
    if (current.y - center_y >= 0) {
        yOffset = current.y - center_y + 1;
    }
    if (current.y + center_y >= height) {
        yOffset = height - defaultHeight;
    }

    const relativeX = xOffset + x;
    const relativeY = yOffset + y;
    if (grid[relativeX][relativeY].value == 1) {
        current.setVal(1);
        maze.setCurrent(relativeX, relativeY);
        current = maze.current;
    }

    drawTiles();
}

// gets mouse click posistion in relationship too canvas
canvas.addEventListener('click', click);
// key listeners
document.addEventListener('keyup', pressed(false));
document.addEventListener('keydown', pressed);

function drawTiles() {
    // starting x of drawn area
    var start_x = 0;
    if (current.x - center_x >= 0) {
        start_x = current.x - center_x + 1;
    }
    var start_y = 0;
    if (current.y - center_y >= 0) {
        start_y = current.y - center_y + 1;
    }
    var end_x = start_x + defaultWidth;
    if (current.x + center_x >= width) {
        end_x = width;
        start_x = width - defaultWidth;
    }
    var end_y = start_y + defaultHeight;
    if (current.y + center_y >= height) {
        end_y = height;
        start_y = height - defaultHeight;
    }

    // drawing indexes
    var x = 0;
    var y = 0;
    for (var i = start_x; i < end_x; i++) {
        for (var j = start_y; j < end_y; j++) {
            grid[i][j].draw(x * tilesize, y * tilesize);
            y = y + 1;
        }
        x = x + 1;
        y = 0; // reset y
    }
}

// draws main elements
function drawElements() {
    const size = Math.min(window.innerWidth, window.innerHeight) / 3 * 2;
    tilesize = size / defaultHeight;

    canvas.width = tilesize * defaultWidth;
    canvas.height = size;
}

// gets offset of element
function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}