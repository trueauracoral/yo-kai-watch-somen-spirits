const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 320;
canvas.height = 240;
const middleWidth = canvas.width / 2;
const middleHeight = canvas.height / 2;

const radius = middleHeight / 2;

ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const border = loadImage("./images/battle/border.png")

var balls = [];
var counter = 0;

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
    return { x: x, y: y };
}

// https://stackoverflow.com/questions/17411991/html5-canvas-rotate-image
function drawImageCenter(image, x, y, cx, cy, scale, rotation) {
    ctx.setTransform(scale, 0, 0, scale, x, y);
    ctx.rotate(rotation);
    ctx.drawImage(image, -cx, -cy);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}

class dot { 
    constructor(pos, velocity, radius, angle) {
        this.pos = pos;
        this.velocity = velocity;
        this.radius = radius;
        this.angle = angle;
    }

    update() {
        this.pos.y += this.velocity.y * Math.sin(this.angle);
        this.pos.x += this.velocity.x * Math.cos(this.angle);
    };

    draw() {
        ctx.fillStyle = "#edbc34";
        //ctx.fillRect(this.pos.x, this.pos.y, this.radius, this.radius);
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    };
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}  

function getSpawn() {
    return {
        x: getRandom(40, canvas.width - 40),
        y: getRandom(0, canvas.height)
    };
}

var randomSpawn = getSpawn();
console.log(randomSpawn);
const Dot = new dot(
    getSpawn(),
    vec2(2, 2),
    19,
    getRandom(0, 2 * Math.PI)
);

function startGame() {
    gameLoop();
}

function vec2(x, y) {
    return {x: x, y: y};
}

function gameUpdate() {
    Dot.update();
    counter++;
    console.log(counter);
    if (counter % 32 == 0) {
        balls.push(new dot(
            getSpawn(),
            vec2(2, 2),
            19,
            getRandom(0, 2 * Math.PI)
        ));
    }
    for (var i = 0; i < balls.length; i++) {
        balls[i].update();
    }
    console.log(balls);
}

function gameDraw() {
    ctx.beginPath();
    ctx.arc(middleWidth, middleHeight, middleHeight - 4, 0, 2 * Math.PI);
    ctx.fillStyle = "#7a4b4b";
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#242655";
    ctx.stroke();
    
    for (var i = 0; i < balls.length; i++) {
        balls[i].draw();
    }

    ctx.drawImage(border, 0, 0)
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    window.requestAnimationFrame(gameLoop);

    gameUpdate();
    gameDraw()
}
gameLoop();

canvas.addEventListener('pointerdown', (event) => {
    prevMouseCoords = getMousePosition(canvas, event);
});