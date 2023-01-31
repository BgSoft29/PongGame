var game = function(){
    let time = 30;
    let movement = 20;
    let movementBar = 20;
    let width = document.documentElement.clientWidth - movementBar*2;
    let height = document.documentElement.clientHeight;
    let controlGame;
    let player1;
    let player2;
    
    function start(){
        init();
        controlGame = setInterval(play, time)
    }

    function init(){
        ball.style.left = 0;
        ball.state = 1;
        ball.direction = 1; // right 1, left 2
        player1 = new Object();
        player2 = new Object();
        player1.keyPress = false;
        player1.keyCode = null;
        player2.keyPress = false;
        player2.keyCode = null;

    }

    function stop(){
        clearInterval(controlGame);
        document.body.style.background = 'red';
    }

    function play() {
        moveBall();
        moveBar();
        checkUfLost();
    }

    function checkUfLost(){
        if(ball.offsetLeft >= width){
            stop();
            console.log('Punto para jugador 1');
        }
        if(ball.offsetLeft <= 0){
            stop();
            console.log('Punto para jugador 2');
        }
    }

    function moveBall(){
        checkStateBall();
        switch (ball.state) {
            case 1: //derecha, abajo
                ball.style.left = (ball.offsetLeft + movement) + 'px';
                ball.style.top = (ball.offsetTop + movement) + 'px';
            break;
            case 2: //derecha, arriba
                ball.style.left = (ball.offsetLeft + movement) + 'px';
                ball.style.top = (ball.offsetTop - movement) + 'px';
            break;
            case 3: //izquierda, abajo
                ball.style.left = (ball.offsetLeft - movement) + 'px';
                ball.style.top = (ball.offsetTop + movement) + 'px';
            break;
            case 4: //izquierda, arriba
                ball.style.left = (ball.offsetLeft - movement) + 'px';
                ball.style.top = (ball.offsetTop - movement) + 'px';
            break;
        }
    }

    function checkStateBall(){

        // choques con las barras de los jugadores 1 y 2
        if(collidePlayer2()){
            ball.direction = 2;
            if(ball.state == 1) ball.state = 3;
            if(ball.state == 2) ball.state = 4;
        } else if (collidePlayer1()){
            ball.direction = 1;
            if( ball.state == 3 ) ball.state = 1;
            if( ball.state == 4 ) ball.state = 2;
        }

        // Programar choques con las paredes
        if(ball.direction === 1){
            if(ball.offsetTop >= (height - ball.clientHeight)) ball.state = 2;
            else if(ball.offsetTop <= 0) ball.state = 1;
        } else {
            if(ball.offsetTop >= height - ball.clientHeight) ball.state = 4;
            else if (ball.offsetTop <= 0) ball.state = 3;
        }
    }

    // Detectar si la posicion de la pelota choca con las barras de juego
    function collidePlayer1(){
        if(ball.offsetLeft <= bar1.clientWidth && ball.offsetTop >= bar1.offsetTop && ball.offsetTop <= (bar1.offsetTop + bar1.clientHeight)) {return true} ;
        return false;
    }

    function collidePlayer2(){
        if(ball.offsetLeft >= (width - bar2.clientWidth) && ball.offsetTop >= bar2.offsetTop && ball.offsetTop <= (bar2.offsetTop + bar2.clientHeight)) {return true} ;
        return false;
    }

    function moveBar(){
        if(player1.keyPress){
            if(player1.keyCode == 'q' && bar1.offsetTop >=0){
                bar1.style.top = (bar1.offsetTop - movementBar) + "px";
            }
            if(player1.keyCode == 'a' && (bar1.offsetTop + bar1.clientHeight)<= height){
                bar1.style.top = (bar1.offsetTop + movementBar) + "px";
            }
        }
        if(player2.keyPress){
            if(player2.keyCode == 'o' && bar2.offsetTop >=0){
                bar2.style.top = (bar2.offsetTop - movementBar) + "px";
            }
            if(player2.keyCode == 'l' && (bar2.offsetTop + bar2.clientHeight)<= height){
                bar2.style.top = (bar2.offsetTop + movementBar) + "px";
            }
        }
    }

    // Para leer cuando esta presionando
    document.onkeydown = function(e){
        e = e;
        switch (e.key) {
            case "q":
            case "a":
                player1.keyCode = e.key;
                player1.keyPress = true;
            case "o":
            case "l":
                player2.keyCode = e.key;
                player2.keyPress = true;
            break;
        }
    }
    // Para leer cuando se deja de presionar
    document.onkeyup = function(e){
        if(e.key == 'q' || e.key == 'a'){
            player1.keyPress = false;
            // console.log("se dejo de presionar a y q");
        } else if (e.key == 'o' || e.key == 'l'){
            player2.keyPress = false;
            // console.log("se dejo de presionar o o l");
        }
    }

    start();
}();