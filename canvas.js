window.addEventListener("load", () => {
    var canvas = document.querySelector("canvas");
    var context = canvas.getContext("2d");
    var lineWidth = 5;
    let painting = false;

    // Paint
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
        context.lineWidth = lineWidth;
        context.lineCap = "round";

        context.lineTo(e.clientX - canvas.getBoundingClientRect().x, e.clientY - canvas.getBoundingClientRect().y);
        context.stroke();
        context.strokeStyle = 'black';
        context.beginPath();
        context.moveTo(e.clientX - canvas.getBoundingClientRect().x, e.clientY - canvas.getBoundingClientRect().y);
    }

    // Erase
    var erase = document.getElementById("erase");
    erase.addEventListener('click', event => {
        lineWidth = 20;
        context.globalCompositeOperation = 'destination-out';
        canvas.classList.toggle("erase");
    });

    // Clear
    var clear = document.getElementById("clear");
    clear.addEventListener('click', event => {
        context.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Situations
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener ('mouseout', finishedPosition, false);
});