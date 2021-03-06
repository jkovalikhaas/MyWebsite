import Grid from './grid.js';

import BSTree from './algorithms/btree.js';
import RecursiveBacktracker from './algorithms/recursiveBacktracker.js';

import AStar from './algorithms/astar.js';
import LongestPath from './algorithms/longestPath.js';

var canvas = document.querySelector('canvas');
var context = canvas.getContext("2d"); // canvas context

const goButton = document.querySelector('.go');
goButton.addEventListener('click', createMaze);

const solveButton = document.querySelector('.solve');
solveButton.addEventListener('click', solveMaze);

// init variables
var tilesize = 0;
var complete = false;
const defaultWidth = 17;
const defaultHeight = 11;
const center_x = 9;
const center_y = 6;
// main vars
var maze = null;
var grid = null;
var current = null;
// user variables
var width = defaultWidth;
var height = defaultHeight;
calcSize(0);

createMaze();

export function calcSize(s) {
    if(s == 0) {
        width = defaultWidth;
        height = defaultHeight;
    } else if(s == 1) {
        width = 20;
        height = 20;
    } else if(s == 2) {
        width = 40;
        height = 40;
    } else if(s == 3) {
        width = 75;
        height = 75;
    } else if(s == 4) {
        width = 120;
        height = 120;
    }
}

function solveMaze() {
    const path = new AStar(grid, width, height, maze.current, maze.end).generateSolution();
    for(var i = 1; i < path.length - 1; i++) {
        grid[path[i].x][path[i].y].setVal(5);
    }
    drawTiles();
}

function move(dir) {
    if (dir == "ArrowUp" || dir == "w") {
        if (current.neighbors[0] != null && current.sides[0] == 0) {
            grid[current.x][current.y].setVal(1);
            maze.setCurrent(current.x, current.y - 1);
        }
    } else if (dir == "ArrowDown" || dir == "s") {
        if (current.neighbors[1] != null && current.sides[1] == 0) {
            grid[current.x][current.y].setVal(1);
            maze.setCurrent(current.x, current.y + 1);
        }
    } else if (dir == "ArrowRight" || dir == "d") {
        if (current.neighbors[2] != null && current.sides[2] == 0) {
            grid[current.x][current.y].setVal(1);
            maze.setCurrent(current.x + 1, current.y);
        }
    } else if (dir == "ArrowLeft" || dir == "a") {
        if (current.neighbors[3] != null && current.sides[3] == 0) {
            grid[current.x][current.y].setVal(1);
            maze.setCurrent(current.x - 1, current.y);
        }
    } else {
        return;
    }

    current = maze.current;
    if (current.value == 3) {
        complete = true;
        alert("You Completed the Maze!\nRefresh for New Maze");
    }
    drawTiles();
}

// single click
function pressed(e) {
    if(complete) return;
    move(e.key);
}

function relativePos(x, y) {
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
    return [xOffset + x, yOffset + y];
}

function tele(x, y) {
    if (complete) return;

    if (grid[x][y].value == 1) {
        current.setVal(1);
        maze.setCurrent(x, y);
        current = maze.current;
    }

    drawTiles();
}

function click(e) {
    const x = parseInt((e.clientX - offset(canvas).left) / tilesize);
    const y = parseInt((e.clientY - offset(canvas).top) / tilesize);

    const newPos = relativePos(x, y);
    const relativeX = newPos[0];
    const relativeY = newPos[1];
    tele(relativeX, relativeY);
}

function getQuad(x, y) {
    const quad_x = Math.floor(center_x / 2);
    const quad_y = Math.floor(center_y / 2);
    const x_strip = x >= quad_x && x < center_x + quad_x;
    const y_strip = y >= quad_y && y < center_y + quad_y;

    if (y < center_y && x_strip) return 0;
    else if (y > center_y && x_strip) return 1;
    else if (x < center_x && y_strip) return 2;
    else if (x > center_x && y_strip) return 3;
}

function touched(e) {
    if(e.touches == null) return;
    if(e.touches.length > 1) return;    // only works with 1 touch

    const current = e.touches[0];
    const x = parseInt((current.clientX - offset(canvas).left) / tilesize);
    const y = parseInt((current.clientY - offset(canvas).top) / tilesize);
    
    const newPos = relativePos(x, y);
    const relativeX = newPos[0];
    const relativeY = newPos[1];

    if(grid[relativeX][relativeY] == 1) tele(relativeX, relativeY);
    else {
        const quadrant = getQuad(x, y);
        if (quadrant == 0) move("w");
        else if (quadrant == 1) move("s");
        else if (quadrant == 2) move("a");
        else if (quadrant == 3) move("d");
    }
}

// touch listeners for phone
canvas.addEventListener('touchstart', touched);
canvas.addEventListener('touchend', touched(false));
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

// creates maze
function createMaze() {
    drawElements();

    maze = new Grid(width, height, tilesize, context);
    grid = maze.grid;
    current = maze.current;
    // new BSTree(grid, width, height);
    new RecursiveBacktracker(grid, width, height, maze.randomCell());

    const longestPath = new LongestPath(grid, width, height, current);
    const farNode = longestPath.maxPath();
    maze.setEnd(farNode.x, farNode.y);
    drawTiles();
}

// gets offset of element
function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}