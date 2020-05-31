const gridWidth = 10;
const gridHeight = 20;

createGridDivs(gridWidth, gridHeight);

$(document).ready(function () {
    let currentPosition = 4;
    
    const grid = $(".grid");
    let squares = Array.from(grid.find('div'));

    //Tetrominoes

    const lTetromino = [
        [1, gridWidth + 1, gridWidth * 2 + 1, 2],
        [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth * 2 + 2],
        [1, gridWidth + 1, gridWidth * 2 + 1, gridWidth * 2],
        [gridWidth, gridWidth * 2, gridWidth * 2 + 1, gridWidth * 2 + 2]
    ];

    const zTetromino = [
        [0, gridWidth, gridWidth+ 1, gridWidth * 2 + 1],
        [gridWidth + 1, gridWidth + 2, gridWidth * 2, gridWidth * 2 + 1],
        [0, gridWidth, gridWidth+ 1, gridWidth * 2 + 1],
        [gridWidth + 1, gridWidth + 2, gridWidth * 2, gridWidth * 2 + 1]
    ];

    const tTetromino = [
        [1, gridWidth, gridWidth + 1, gridWidth * 2],
        [1, gridWidth + 1, gridWidth + 2, gridWidth * 2 + 2],
        [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth * 2 + 1],
        [1, gridWidth, gridWidth + 1, gridWidth * 2 + 1]
    ];

    const oTetromino = [
        [0, 1, gridWidth, gridWidth + 1],
        [0, 1, gridWidth, gridWidth + 1],
        [0, 1, gridWidth, gridWidth + 1],
        [0, 1, gridWidth, gridWidth + 1]
    ];

    const iTetromino = [
        [1, gridWidth + 1, gridWidth * 2 + 1, gridWidth * 3 + 1],
        [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth + 3],
        [1, gridWidth + 1, gridWidth * 2 + 1, gridWidth * 3 + 1],
        [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth + 3]
    ];

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];


    // Randomly selects Tetromino

    let random = Math.floor(Math.random() * theTetrominoes.length);
    let currentRotation = Math.floor(Math.random() * 4);
    let current = theTetrominoes[random][currentRotation];


    // Draw the Shape

    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].addClass("block");
        });
    }

    //Undraw the Shape

    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].removeClass("block");
        });
    }

    // Move Tetromino Down a block every second
    function moveDown() {
        undraw();
        currentPosition += width;
        draw();
        freeze();
    }

    // Move Tetromino Left a block and Prevent Collisions with shapes
    function moveLeft() {
        undraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % gridWidth === width - 1)
    }

    // Stops the Tetromino once it reaches the end of the grid

    function freeze() {
        
    }


});

function createGridDivs(width, height) {
    size = width * height;
    for (var i = 0; i < size; i++)
        $(".grid").append($("<div>"));
}