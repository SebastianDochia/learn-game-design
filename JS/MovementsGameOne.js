const startGame = () => {
    const canvas = document.getElementById('movementsGameOneCanvas');

    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0 ,0, 600, 300);

        let background = ctx.createLinearGradient(0, 0, 0 , 300);
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

        ctx.fillStyle = 'red';
        ctx.fillRect(10, 10, 50, 50);
    } else {
        alert("Your browser does not support <canvas>. You won't be able to play the example games.");
    }
    
    
}
