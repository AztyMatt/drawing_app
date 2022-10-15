window.addEventListener("load", () => {
    var canvas = document.querySelector("canvas");
    var context = canvas.getContext("2d");
    initialize();
    
    function initialize() {
        window.addEventListener('resize', resizeCanvas, false);
        resizeCanvas();
    }

    function redraw() {
        context.strokeStyle = 'red';
        context.lineWidth = '10';
        context.strokeRect(0, 0, window.innerWidth, window.innerHeight);
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        redraw();
    }

    //--------------------------------------------------------------------------//

    let painting = false;

    function startPosition(e){
        painting = true;
        draw(e);
    }

    function finishedPosition(){
        painting = false;
        context.beginPath();
    }

    function draw(e){
        if(!painting) return;
        context.lineWidth = 5;
        context.lineCap = "round";

        context.lineTo(e.clientX, e.clientY);
        context.stroke();
        context.beginPath();
        context.moveTo(e.clientX, e.clientY);
    }

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mousemove', draw);
});