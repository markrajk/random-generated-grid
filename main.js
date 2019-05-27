const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const grid = createGrid(400);
const tileSize = 10;

const mapWidth = canvas.width = grid[0].length * tileSize;
const mapHeight = canvas.height = grid.length * tileSize;

drawMap(grid);

//BASIC VISUAL REPRESENTATION OF THE GRID
function drawMap(grid) {
    for(let col = 0; col < grid.length; col++) {
        for(let row = 0; row < grid[col].length; row++) {
            let cell = grid[col][row];
            if(cell) {
                ctx.fillStyle = '#FFE4B5';
            } else {
                ctx.fillStyle = '#CD853F';
            }
            ctx.fillRect(row * tileSize, col*tileSize, tileSize, tileSize);
        }
    }
} 

//CREATE GRID FUNCTION
function createGrid(n) {
    const path = [];
    let cur = [0,0];
    let next;
    let minX = 0;
    let minY = 0;
    let maxX = 0;
    let maxY = 0;
    let dir;
    const border = 6;

    for(let i = 0; i < n; i++) {
        path.push([cur[0], cur[1]]);
        
        minX = cur[0] < minX ? cur[0] : minX;
        maxX = cur[0] > maxX ? cur[0] : maxX;
    
        minY = cur[1] < minY ? cur[1] : minY;
        maxY = cur[1] > maxY ? cur[1] : maxY;

        //CHECK DIRECTION
        function checkDirection() {
            dir = Math.floor(Math.random() * 4);
            next = cur;
            
            if(dir === 0) { //LEFT
                next[0] = next[0] - 1;
            }
            if(dir === 1) { //UP
                next[1] = next[1] - 1;
            }
            if(dir === 2) { //RIGHT
                next[0] = next[0] + 1;
            }
            if(dir === 3) { //DOWN
                next[1] = next[1] + 1;
            }
            
            //CHECK IF NEXT TILE POSSIBLE
            if(path.some((e) => e.toString() === next.toString())) {
                checkDirection();
            }else {
                cur = next;
            }
        }
        checkDirection();
    }

    //CREATE NEW PATH WITH NEW VALUES
    const newPath = path.map((e) => {
        return [e[0] + Math.abs(minX) + border/2, e[1] + Math.abs(minY) + border/2];
    })

    //CREATE EMPTY GRID
    const grid = new Array(Math.abs(minY) + Math.abs(maxY) + 1 + border).fill()
                .map(() => new Array(Math.abs(minX) + Math.abs(maxX) + 1 + border).fill()
                    .map(() => 0));

    //POPULATE GRID WITH NEW PATH
    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[i].length; j++) {
            if(newPath.some((e) => e[0] === j && e[1] === i)) {
                grid[i][j] = 1;
            }
        }
    }
    
    console.log(grid);
    return grid;
}