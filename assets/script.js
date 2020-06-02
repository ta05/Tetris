
const width = 10;
const height = 20;

const displayWidth = 4;

createPreviewGrid(displayWidth, displayWidth);
createGridDivs(width, height);

$(document).ready(function () {
    let currentPosition = 4;

    const grid = $(".grid");
    const displaySquares = $("div.preview-grid");
    const scoreDisplay = $(".score-display");
    const levelDisplay = $(".level-display");

    const blockClass = ["lBlock", "zBlock", "tBlock", "oBlock", "iBlock", "sBlock", "jBlock"]

    let squares = Array.from(grid.find('div'));
    let timerId;

    var score = 0;
    var linesCleared = 0;
    var lines = 0;
    var level = 0;


    const scoreMultiplier = {
        1: 40,
        2: 100,
        3: 300,
        4: 1200
    }; 

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

    $(document).keydown(control);

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

    // Draw the Shape

    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add("block");
            squares[currentPosition + index].classList.add(blockClass[random]);
        });
    }

    //Undraw the Shape

    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove("block");
            squares[currentPosition + index].classList.remove(blockClass[random]);
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
    }

    // Stops the Tetromino once it reaches the end of the grid or another block.

    function freeze() {
        if (current.some(index => squares[currentPosition + index + width].classList.contains("block3") || squares[currentPosition + index + width].classList.contains("block2"))) {
            current.forEach(index => squares[index + currentPosition].classList.add("block2"));

            random = nextRandom;
            nextRandom = Math.floor(Math.random() * theTetrominoes.length);
            current = theTetrominoes[random][currentRotation];
            currentPosition = 4;
            draw();
            gameOver();
            addScore();
            displayShape();
        }

    }


    // Show preview of next tetromino in displaySquares

    const displayIndex = 0;
    let nextRandom = 0;
    
    const smallTetrominoes = [
        [0, 1, displayWidth + 1, displayWidth * 2 + 1], // lBlock
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], // zBlock
        [1, displayWidth, displayWidth + 1, displayWidth + 2], // tBlock
        [0, 1, displayWidth, displayWidth + 1], // oBlock
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1], // iBlock
        [1, displayWidth, displayWidth + 1, displayWidth * 2], // sBlock
        [1, 2, displayWidth + 1, displayWidth * 2 + 1] // jBlock
    ];

    function displayShape() {
        displaySquares.children().each(function () {
            console.log($(this)[0]);
            $(this)[0].classList = [];
            console.log($(this)[0]);
        });
        smallTetrominoes[nextRandom].forEach(index => {
            displaySquares[0].children[displayIndex + index].classList.add("block");
            displaySquares[0].children[displayIndex + index].classList.add(blockClass[nextRandom]);
            console.log(displaySquares[0].children[displayIndex + index].classList);
        })
    }

    $("#start-btn").click(function () {
        draw();
        levelDisplay.text("Level " + level);
        scoreDisplay.text("Score " + score);
        timerId = setInterval(moveDown, 1000);
        nextRandom = Math.floor(Math.random() * theTetrominoes.length);
        displayShape();
        $(this).css("pointer-events", "none");
    });

    // Add Score

    function addScore() {
        for (currentIndex = 0; currentIndex < height * width - 1; currentIndex += width){
            var row = [];
            for (i = 0; i < width; i++)
                row.push(currentIndex + i);
            
            if (row.every(index => squares[index].classList.contains("block2"))) {
                lines++;

                row.forEach(index => {
                    squares[index].classList = [];
                })

                // Splice Array

                const squaresRemoved = squares.splice(currentIndex, width);
                squares = squaresRemoved.concat(squares);
                squares.forEach(cell => grid.append(cell));
            }
        }

        // Calculate and Display Score
        if (lines > 0) {
            score += scorer(level, lines);
            scoreDisplay.text("Score " + score);
        }

        // Level Up
        levelUp(lines);
        lines = 0;
    }

    // Game Over function

    function gameOver() {
        if (current.some(index => squares[currentPosition + index].classList.contains("block2"))) {
            scoreDisplay.text("Game Over! Score " + score);
            clearInterval(timerId);
        }
    }

    function scorer(level, lines) {
        return (level + 1) * scoreMultiplier[lines];
    }

    function levelUp(lines) {
        linesCleared += lines;
        if (parseInt(linesCleared / 10) >= 1) {
            level++;
            linesCleared = 0;
            levelDisplay.text("Level " + level);
        }
    }
});

function createGridDivs(width, height) {
    for (var i = 0; i < height; i++)
        for (var j = 0; j < width; j++) {
            var divEl = $("<div>");
            if (i == height - 1)
                divEl.addClass("block3");
            $(".grid").append(divEl);
        }
}

function createPreviewGrid(width, height) {
    for (var i = 0; i < height; i++)
        for (var j = 0; j < width; j++)
            $(".preview-grid").append($("<div>"));
}