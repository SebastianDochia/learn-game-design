let ctx;
let raf;
let canvas;
let moveX = 0;
let moveY = 0;
let x = 20;
let y = 10;
const maxMoveX = 1.5;
const maxMoveY = 3;
const moveSpeed = 0.3;
const gravity = 0.05;
const friction = 0.95;
const jumpStrenght = 7.5;
let grounded = false;
let keys = { 'ArrowLeft': false, 'ArrowRight': false, ' ': false };

document.addEventListener('DOMContentLoaded', () => {
    //getting the canvas and context after the DOM has loaded
    canvas = document.getElementById('movementsGameOneCanvas');
    ctx = canvas.getContext('2d');

    //drawing the initial image
    drawBG();
    drawRED();

    //adding events
    canvas.addEventListener('mouseenter', () => {
        //calling the first render
        raf = window.requestAnimationFrame(draw);
        document.addEventListener('keydown', keyDown);
        document.addEventListener('keyup', keyUp);
    });

    //removing events
    canvas.addEventListener('mouseleave', () => {
        window.cancelAnimationFrame(raf);
        document.removeEventListener('keydown', keyDown);
        document.removeEventListener('keyup', keyUp);

        //making sure no keys remain pressed after we remove the listners
        for(let key in keys){
            keys[key] = false;
        }
    });
});

const draw = () => {
    //calling next render
    raf = requestAnimationFrame(draw);

    //preparing canvas for next render
    ctx.save();
    ctx.clearRect(0, 0, 1200, 300);

    //adjusting camera
    if (x > 300 && x < 900) {
        ctx.translate(300 - x, 0);
    } else if (x > 900) {
        ctx.translate(-600, 0);
    }

    //drawing all the elements
    drawBG();
    drawRED();

    //detecting player movement and adjusting velocity
    if (keys['ArrowRight']) {
        if (moveX < maxMoveX) {
            moveX += moveSpeed;
        }
    }
    if (keys['ArrowLeft']) {
        if (moveX > -maxMoveX) {
            moveX -= moveSpeed;
        }
    }
    if (keys[' '] && grounded) {
        if (moveY > -maxMoveY) {
            moveY -= jumpStrenght;
            grounded = false;
        }
    }

    //setting the next position of RED based on velocity
    x += moveX;
    y += moveY;

    //detecting what force should be applied next frame
    if (grounded) {
        moveX *= friction;
    } else {
        moveY += gravity;
    }

    //chcking for collision
    checkCollisions();

    //going beck to the initioal canvas
    ctx.restore();
}

const checkCollisions = () => {
    checkFloor();
    checkWallLeft();
    checkWallRight();
}

const checkFloor = () => {
    if (y > 151) {
        y = 151;
        grounded = true;
    }
}

const checkWallLeft = () => {
    if (x < 0) {
        x = 0;
    }
}

const checkWallRight = () => {
    if (x > 1150) {
        x = 1150;
    }
}

let keyDown = (e) => {
    keys[e.key] = true;
    e.preventDefault();
}

let keyUp = (e) => {
    keys[e.key] = false;
}

const drawBG = () => {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 600, 300);

    let background = ctx.createLinearGradient(0, 0, 0, 300);
    background.addColorStop(0, '#00ABEB');
    background.addColorStop(0.65, '#fff');
    background.addColorStop(0.65, '#26C000');
    background.addColorStop(0.8, '#26C000');
    background.addColorStop(1, '#fff');
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, 1200, 300);

    ctx.beginPath();
    ctx.moveTo(0, 200);
    ctx.lineTo(1200, 200);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(100, 200);
    ctx.lineTo(90, 140);
    ctx.moveTo(340, 200);
    ctx.lineTo(350, 165);
    ctx.moveTo(555, 200);
    ctx.lineTo(544, 135);
    ctx.moveTo(890, 200);
    ctx.lineTo(900, 145);
    ctx.stroke();
}

const drawRED = () => {
    ctx.fillStyle = 'red';
    ctx.fillRect(x, y, 50, 50);
}