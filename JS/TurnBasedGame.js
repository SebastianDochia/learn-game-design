let ctx;
let raf;
let canvas;

document.addEventListener('DOMContentLoaded', () => {
    //getting the canvas and context after the DOM has loaded
    canvas = document.getElementById('tbGame');
    ctx = canvas.getContext('2d');

    canvas.addEventListener('mouseenter', () => {
        //calling the first render
        raf = window.requestAnimationFrame(draw);
    });

    canvas.addEventListener('mouseleave', () => {
        //stop the game when mouse leaves the canvas
        window.cancelAnimationFrame(raf);
    });
});

const draw = () => {
    //calling next render
    raf = requestAnimationFrame(draw);
};
