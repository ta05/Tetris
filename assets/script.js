const gridWidth = 10;
const gridHeight = 20;

createGridDivs(gridWidth, gridHeight);

$(document).ready(function () {
    
    
});

function createGridDivs(width, height) {
    size = width * height;
    for (var i = 0; i < size; i++)
        $(".grid").append("<div>");
}