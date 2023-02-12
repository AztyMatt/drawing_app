window.addEventListener("load", () => {
    var canvas = document.querySelector("canvas");
    var context = canvas.getContext("2d");
    var lineWidth = 5;
    let painting = false;

    // Draw
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

    // Set environnement

    pencil();

    // Set pencil
    function pencil(){
        lineWidth = 5;
        context.globalCompositeOperation = 'source-over';

        canvas.addEventListener ('mouseenter',  event => {
            if ($("#pencil_cursor").is(":hidden")) {
                $("#pencil_cursor").toggle();
            }
            if ($("#eraser_cursor").is(":visible")) {
                $("#eraser_cursor").toggle();
            }

            $(document).mousemove(function(e){
                $('#pencil_cursor').css({"left" : (e.pageX + 'px'),"top" : (e.pageY   + 'px')});
            });
        });
    };
    document.getElementById("pencil").addEventListener('click', event => {
        pencil();
    });

    // Set eraser
    function eraser(){
        lineWidth = 30;
        context.globalCompositeOperation = 'destination-out';

        canvas.addEventListener ('mouseenter',  event => {
            if ($("#eraser_cursor").is(":hidden")) {
                $("#eraser_cursor").toggle();
            }
            if ($("#pencil_cursor").is(":visible")) {
                $("#pencil_cursor").toggle();
            }

            $(document).mousemove(function(e){
                $('#eraser_cursor').css({"left" : (e.pageX + 'px'),"top" : (e.pageY   + 'px')});
            });
        });
    };
    document.getElementById("eraser").addEventListener('click', event => {
        eraser();
    });

    //Remove all custom_cursor
    function custom_cursor(){
        $('#pencil_cursor').css({"display" : 'none'});
        $('#eraser_cursor').css({"display" : 'none'});
    }

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
    canvas.addEventListener ('mouseout', custom_cursor, false);

    //Save drawing
    var download = document.getElementById("download")
    download.addEventListener("click", function () {
        if (window.navigator.msSaveBlob){
            window.navigator.msSaveBlob(canvas.msToBlob(), "drawing_app.png")
        }else{
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.href = canvas.toDataURL();
            a.download = "drawing_app.png";
            a.click();
            document.body.removeChild(a);
        }
    });
});