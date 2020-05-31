const gridWidth = 10;
const gridHeight = 20;

createGridDivs(gridWidth, gridHeight);

$(document).ready(function () {
    const grid = $(".grid");

    //Tetrominoes

    const lTetromino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ];

    const zTetromino = [
        [0, width, width+ 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width+ 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
    ];

    const tTetromino = [
        [1, width, width + 1, width * 2],
        [1, width + 1, width + 2, width * 2 + 2],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ];

    const oTetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ];

    const iTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ];

    const theTerominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];


    // Randomly selects Tetromino

    let random = Math.floor(Math.random() * theTerominoes.length);
    
});

function createGridDivs(width, height) {
    size = width * height;
    for (var i = 0; i < size; i++)
        $(".grid").append($("<div>"));
}