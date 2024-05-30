const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 640;
canvas.height = 640;
const middleWidth = canvas.width / 2;
const middleHeight = canvas.height / 2;

ctx.fillStyle="black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const middleWheele = loadImage("./images/battle/wheele-middle.png");
const wheeleImage = loadImage("./images/battle/wheele.png")

let isRotating = false;

function loadImage(src) {
    var img = new Image();
    img.src = src;
    return img;
}

// https://www.geeksforgeeks.org/how-to-get-the-coordinates-of-a-mouse-click-on-a-canvas-element/
function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return {x: x, y: y};
}

//ctx.drawImage(middleWheele, 0, 0);

// https://stackoverflow.com/questions/17411991/html5-canvas-rotate-image
function drawImageCenter(image, x, y, cx, cy, scale, rotation){
    ctx.setTransform(scale, 0, 0, scale, x, y); // sets scale and origin
    // ctx.rotate(0)
    ctx.rotate(rotation);
    ctx.drawImage(image, -cx, -cy);
    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
} 

ctx.drawImage(wheeleImage, 0, 0)
ctx.drawImage(middleWheele, 0 , 0);
drawImageCenter(wheeleImage, middleWidth, middleHeight, middleWidth, middleHeight, 1, 0);

var prevRotation = 0
function rotateWheel() {
    var mouseCoords = getMousePosition(canvas, event);
    console.log(mouseCoords);
    console.log(middleWidth, middleHeight);
    
    var rectCoords = {
        x: mouseCoords.x - middleWidth,
        y: (mouseCoords.y - middleHeight) * -1
    }

    const prevRectCoords = {
        x: prevMouseCoords.x - middleWidth,
        y: (prevMouseCoords.y - middleHeight) * -1
    };
    
    console.log(rectCoords);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(middleWheele, 0 , 0);

    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(middleWidth, middleHeight);
    ctx.lineTo(mouseCoords.x, mouseCoords.y);
    ctx.stroke();
    ctx.closePath();
    
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2
    function calcAngle(x, y) {
        return Math.atan2(y, x);
    }

    const prevAngle = calcAngle(prevRectCoords.x, prevRectCoords.y);
    const currentAngle = calcAngle(rectCoords.x, rectCoords.y);
    const angleDifference = currentAngle - prevAngle;

    prevRotation += angleDifference;

    var rotateCalculuation = Math.atan2(rectCoords.y, rectCoords.x);
    console.log(rotateCalculuation);

    drawImageCenter(wheeleImage, middleWidth, middleHeight, middleWidth, middleHeight, 1, prevRotation);
    
    
    prevMouseCoords = mouseCoords
};

let currentMouseCoords = { x: 0, y: 0 };

canvas.addEventListener('pointerdown', (event) => {
    isRotating = true;
    prevMouseCoords = getMousePosition(canvas, event);
    rotateWheel();
});

canvas.addEventListener('pointermove', (event) => {
    if (isRotating) {
        rotateWheel();
    }
});

canvas.addEventListener('pointerup', () => {
    isRotating = false;
});