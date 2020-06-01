const width = 10;
const height = 20;

createGridDivs(width, height);

$(document).ready(function () {
    let currentPosition = 4;
    
    const grid = $(".grid");
    let squares = Array.from(grid.find('div'));

    // Assign functions to keycodes

    function control(e) {
        switch (e.keyCode) {
            case 39:
                moveRight();
                break;
            case 38:
                rotate();
                break;
            case 37:
                moveLeft();
                break;
            case 40:
                moveDown();
                break;
        }
    }

    $(document).keyup(control);

    // Tetrominoes: Clockwise Rotation

    const lBlock = [
        [0, 1, width + 1, width * 2 + 1],
        [2, width, width + 1, width + 2],
        [1, width + 1, width * 2 + 1, width * 2 + 2],
        [width, width + 1, width + 2, width * 2]
    ];

    const zBlock = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width+ 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
    ];

    const tBlock = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ];

    const oBlock = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ];

    const iBlock = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [2, width + 2, width * 2 + 2, width * 3 + 2],
        [width * 2, width * 2 + 1, width * 2 + 2, width * 2 + 3]
    ];

    const sBlock = [
        [1, width, width + 1, width * 2],
        [width + 1, width * 2 + 2, width, width * 2 + 1],
        [1, width, width + 1, width * 2],
        [width + 1, width * 2 + 2, width, width * 2 + 1]
    ];

    const jBlock = [
        [1, 2, width + 1, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2, width * 2 + 1],
        [width, width + 1, width + 2, 0]
    ];

    const theTetrominoes = [lBlock, zBlock, tBlock, oBlock, iBlock, sBlock, jBlock];


    // Randomly selects Tetromino

    let random = Math.floor(Math.random() * theTetrominoes.length);
    let currentRotation = Math.floor(Math.random() * 4);
    let current = theTetrominoes[random][currentRotation];

    console.log(random);

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
        currentPosition += width;
        draw();
        freeze();
    }

    // Move Tetromino right a block and prevent collisions with shapes
    
    function moveRight() {
        undraw();
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1);
        if (!isAtRightEdge)
            currentPosition += 1;
        if (current.some(index => squares[currentPosition + index].classList.contains("block2")))
            currentPosition -= 1;
        draw();
    }

    // Move Tetromino left a block and prevent collisions with shapes

    function moveLeft() {
        undraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);
        if (!isAtLeftEdge)
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
        console.log(currentRotation);
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