let ctx;
let moveX = 0;
let moveY = 0;
const maxMoveX = 1.5;
const maxMoveY = 3;
const moveSpeed = 0.3;
const gravity = 0.05;
const friction = 0.95;
const jumpStrenght = 7.5;
let grounded = false;
let keys = {"ArrowLeft": false, "ArrowRight": false, " ": false};
let x=20;
let y=10;

document.addEventListener('DOMContentLoaded', () => {
    ctx = document.getElementById('movementsGameOneCanvas').getContext('2d');
    startGame();
});

document.addEventListener("keydown", function (e) {
    keys[e.key] = true;
});
document.addEventListener("keyup", function (e) {
    keys[e.key] = false;
});

const startGame = () => {
    draw();
}

const draw = () => {
    requestAnimationFrame(draw);
    
    ctx.save();
    ctx.clearRect(0, 0, 1200, 300);

    if(x > 300 && x < 900) {
        ctx.translate(300 - x, 0);
    } else if (x > 900){
        ctx.translate(-600, 0);
    }

    drawBG();

    ctx.fillStyle = 'red';
    ctx.fillRect(x, y, 50, 50);
    

    if (keys["ArrowRight"]) {
        if (moveX < maxMoveX) {
            moveX += moveSpeed;
        }
    }
    if (keys["ArrowLeft"]) {
        if (moveX > -maxMoveX) {
            moveX -= moveSpeed;
        }
    }
    if (keys[" "] && grounded) {
        if (moveY > -maxMoveY) {
            moveY -= jumpStrenght;
            grounded = false;
        }
    }

    x += moveX;
    y += moveY;

    if(grounded) {
        moveX *= friction;
    } else {
        moveY += gravity;
    }
    
    checkCollisions();
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

