let ctx2;
let canvas2;
let playerCH = new Image();
playerCH.src = 'resources/playerCH.png';
let enemyCH = new Image();
enemyCH.src = 'resources/enemyCH.png';
let playerHP = 100;
let enemyHP = 100;
let yourTurn = true;
let hitSound = document.createElement('audio');
hitSound.src = 'resources/hitSound.mp3';
let hitSound2 = document.createElement('audio');
hitSound2.src = 'resources/hitSound2.mp3';

document.addEventListener('DOMContentLoaded', () => {
    //getting the canvas and context after the DOM has loaded
    canvas2 = document.getElementById('tbGame');
    ctx2 = canvas2.getContext('2d');

    //drawing the initial image
    draw2();

    //detect the clicked button
    canvas2.addEventListener('mousedown', (e) => {
        if (yourTurn) {
            const rect = canvas.getBoundingClientRect();
            if (e.clientY - rect.top - 415 > 215 && e.clientY - rect.top - 415 < 295) {
                if (e.clientX - rect.left > 5 && e.clientX - rect.left < 295) {
                    weakAttack();
                } else if (e.clientX - rect.left > 305 && e.clientX - rect.left < 595) {
                    strongAttack();
                }
            }
        }
    });
});

const draw2 = () => {
    //reseting canvas
    ctx2.clearRect(0, 0, 600, 300);

    //drawing all the elements
    drawBG2();
    drawCharacters();
    enemyCH.addEventListener('load', function () {
        drawCharacters();
    });
    drawHUD();
};

const drawBG2 = () => {
    ctx2.fillStyle = 'black';
    ctx2.fillRect(0, 0, 600, 300);
};

const drawCharacters = () => {
    ctx2.drawImage(playerCH, 50, 10);
    ctx2.drawImage(enemyCH, 350, 10);
};

const drawHUD = () => {
    ctx2.fillStyle = 'rgb(102, 153, 255)';
    ctx2.fillRect(0, 210, 600, 90);
    drawHP();
    ctx2.fillStyle = 'blue';
    ctx2.strokeRect(5, 215, 290, 80);
    ctx2.strokeRect(305, 215, 290, 80);
    ctx2.font = '30px Arial';
    ctx2.fillText('Weak Attack', 60, 265);
    ctx2.fillText('Strong Attack', 360, 265);
};

const drawHP = () => {
    if (playerHP <= 0) {
        ctx2.filter = 'grayscale(100%)';
        ctx2.drawImage(playerCH, 50, 10);
        ctx2.filter = 'grayscale(0%)';
        ctx2.font = '30px Arial';
        ctx2.fillText('YOU LOSE', 230, 145);
    } else if (enemyHP <= 0) {
        ctx2.filter = 'grayscale(100%)';
        ctx2.drawImage(enemyCH, 350, 10);
        ctx2.filter = 'grayscale(0%)';
        ctx2.font = '30px Arial';
        ctx2.fillStyle = 'blue';
        ctx2.fillText('YOU WIN', 230, 145);
    }
    ctx2.fillStyle = 'black';
    ctx2.fillRect(60, 5, 100, 2);
    ctx2.fillRect(435, 15, 100, 2);
    ctx2.fillStyle = 'red';
    ctx2.fillRect(60, 5, playerHP, 2);
    ctx2.fillRect(435, 15, enemyHP, 2);
    ctx2.fillStyle = 'black';
    ctx2.fillRect(40, 5, 20, 2);
    ctx2.fillRect(415, 15, 20, 2);
};

const weakAttack = () => {
    yourTurn = false;
    hitSound.volume = 0.1;
    hitSound.play();

    ctx2.filter = 'brightness(300%)';
    ctx2.drawImage(enemyCH, 350, 10);
    enemyHP -= 10;

    resetEnemy();
};

const strongAttack = () => {
    yourTurn = false;
    hitSound.volume = 0.6;
    hitSound.playbackRate = 0.8;
    hitSound.play();

    ctx2.filter = 'contrast(300%)';
    ctx2.drawImage(enemyCH, 350, 10);
    enemyHP -= 20;

    resetEnemy();
};

const enemyAttack = () => {
    hitSound2.volume = 0.5;
    hitSound2.playbackRate = 1;
    hitSound2.play();

    ctx2.filter = 'invert(100%)';
    ctx2.drawImage(playerCH, 50, 10);
    playerHP -= 15;

    resetPlayer();

    setTimeout(() => (yourTurn = true), 1000);
};

const resetEnemy = () => {
    setTimeout(() => {
        ctx2.filter = 'none';
        ctx2.drawImage(enemyCH, 350, 10);
        drawHP();
        if (enemyHP > 0) enemyAttack();
    }, 650);
};

const resetPlayer = () => {
    setTimeout(() => {
        ctx2.filter = 'none';
        ctx2.drawImage(playerCH, 50, 10);
        drawHP();
    }, 650);
};
