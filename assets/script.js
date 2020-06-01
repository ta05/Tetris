const gridWidth = 10;
const gridHeight = 20;

createGridDivs(gridWidth, gridHeight);

$(document).ready(function () {
    let currentPosition = 4;
    
    const grid = $(".grid");
    let squares = Array.from(grid.find('div'));

    // Assign functions to keycodes

    function control(e) {
        switch (e.keyCode) {
            case 39:
                console.log("Right Key Pressed");
                moveRight();
                break;
            case 38:
                console.log("Up Key Pressed");
                rotate();
                break;
            case 37:
                console.log("Left Key Pressed");
                moveLeft();
                break;
            case 40:
                console.log("Down Key Pressed");
                moveDown();
                break;
        }
    }

    $(document).keyup(control);

    // Tetrominoes

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
            squares[currentPosition + index].classList.add("block");
        });
    }

    //Undraw the Shape

    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove("block");
        });
    }

    // Move Tetromino Down a block every second
    function moveDown() {
        undraw();
        currentPosition += gridWidth;
        draw();
        freeze();
    }

    // Move Tetromino right a block and prevent collisions with shapes
    
    function moveRight() {
        undraw();
        const isAtRightEdge = current.some(index => (currentPosition + index) % gridWidth === gridWidth - 1);
        if (isAtRightEdge)
            currentPosition += 1;
        if (current.some(index => squares[currentPosition + index].classList.contains("block2")))
            currentPosition -= 1;
        draw();
    }

    // Move Tetromino left a block and prevent collisions with shapes

    function moveLeft() {
        undraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % gridWidth === 0);
        if (isAtLeftEdge)
            currentPosition -= 1;
        if (current.some(index => squares[currentPosition + index].classList.contains("block2")))
            currentPosition += 1;
        draw();
    }

    // Rotate Tetromino

    function rotate() {
        undraw();
        currentRotation++;
        if (currentRotation === current.length)
            currentRotation = 0;
        current = theTetrominoes[random][currentRotation];
        draw();
    }

    // Stops the Tetromino once it reaches the end of the grid

    function freeze() {
        
    }

    draw();


});

function createGridDivs(width, height) {
    size = width * height;
    for (var i = 0; i < size; i++)
        $(".grid").append($("<div>"));
}