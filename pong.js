// amélioration possible 1 : faire en sorte d'avoir une fonction start game qui lorqu'on appui une touche ou clique un bouton je jaux se lance pour éviter la duplication  de code ...

// amélioration possible 2 : avoir un historique des scores (localstorage ?)

// amelioration 3 : pouvoir personaliser la taille de la raquette et la vitesse de la balle
const canvas = document.getElementById("demo");
const ctx = canvas.getContext("2d");

let scoreDisplay = document.getElementById("score");
let score = 0;
let scoreInterval = null;

let tailleBarre=50;
let speedX=-1;               // vitesse de la balle
let speedY=-1;               // vitesse de la balle
let leftPaddle = false;
let rightPaddle = false;
let coYPaddle=canvas.height-5;
let coXPaddle=(canvas.width/2)-(tailleBarre/2); // position de la raquette (axe des abscisses X)
let rafId;                       // identifiant de la boucle d'animation

let gameStarted=false;
let x = (canvas.width/2) ;                      // position de la balle (axe des abscisses X)
let y = canvas.height-20;                    // position de la balle (axe des ordonnées Y)


function drawBall() {
    ctx.fillStyle = "orange";
    //dessin de la balle
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
}

function drawRectangle() {
    ctx.fillStyle = "orange";
    //dessin de la balle
    ctx.beginPath();
    ctx.fillRect(coXPaddle, coYPaddle, tailleBarre, 2);
    ctx.fill();
}

// Lance le compteur de score à chaque démarrage du jeu
function startScoreCounter() {
    if (!scoreInterval) {
        scoreInterval = setInterval(() => {
            if (gameStarted && speedY !== 0 && speedX !== 0) {
                score++;
                updateScoreDisplay();
            }
        }, 1000);
    }
}

function update() {

    ctx.clearRect(0, 0, canvas.width, canvas.height) // efface l'écran
    drawBall();
    drawRectangle();
    if (rightPaddle && coXPaddle < canvas.width - tailleBarre) {
        coXPaddle += 2; // Déplace la barre vers la droite
    }
    if (leftPaddle && coXPaddle > 0) {
        coXPaddle -= 2; // Déplace la barre vers la gauche
    }
    if (gameStarted===false) {
        speedX = 0;
        speedY = 0; 
    }

    x += speedX;
    y += speedY;
    console.log(x);
    if (x > canvas.width - 15) {
        speedX *= -1;
    }else if (x < 15) {
        speedX *= -1;
    }
    if (y<10){
        speedY*=-1;
    }
    //renvoi de la balle si elle touche la raquette
    if (y +5 > coYPaddle - 4 && x > coXPaddle && x < coXPaddle + tailleBarre) {
        //random de la vitesse en Y pour éviter les trajectoires trop prévisibles
        let randomSpeed = Math.random()/5; // entre 0 et 0.2
        speedY *= -1;
        console.log('speedY avant modif : '+speedY);
        if (Math.abs(speedY) < 7) { 
            speedY -=(randomSpeed)*3;
            if (randomSpeed<0.05 || randomSpeed>0.15){ 
                speedX += randomSpeed*3;
            } else {
                speedX -= randomSpeed*3;
            }
        }
    }
    //arrete la balle si elle touche le bas du canvas
    if (y > canvas.height-11) {
        speedY = 0;
        speedX = 0;
        alert("Game Over ! Votre score est de : " + score);
        restartGame();
    }  
}
function loop() {
    update();
    rafId = requestAnimationFrame(loop); // planifie la prochaine frame
}



droite.addEventListener('mousedown', () => {
        rightPaddle = true;
        if (!gameStarted){
        gameStarted = true;
        startScoreCounter();
        let randomSpeedinit  = Math.random() * 0.25 + 0.5; // entre 0.5 et 0.75
        let randomGaucheDroiteinit = Math.random() < 0.5 ? 1 : 2;
        if (randomGaucheDroiteinit === 1) {
            speedX = -1 + randomSpeedinit;
            speedY = -1 ;
        }else {
            speedX = (-1 + randomSpeedinit)*(-1);
            speedY = -1 ;
        }
    }
});
gauche.addEventListener('mousedown', () => {
        leftPaddle = true;
        if (!gameStarted){
        gameStarted = true;
        startScoreCounter();
        let randomSpeedinit  = Math.random() * 0.25 + 0.5; // entre 0.5 et 0.75
        let randomGaucheDroiteinit = Math.random() < 0.5 ? 1 : 2;
        if (randomGaucheDroiteinit === 1) {
            speedX = -1 + randomSpeedinit;
            speedY = -1 ;
        }else {
            speedX = (-1 + randomSpeedinit)*(-1);
            speedY = -1 ;
        }
    }
});


droite.addEventListener('touchstart', () => {
        rightPaddle = true;
        if (!gameStarted){
        gameStarted = true;
        startScoreCounter();
        let randomSpeedinit  = Math.random() * 0.25 + 0.5; // entre 0.5 et 0.75
        let randomGaucheDroiteinit = Math.random() < 0.5 ? 1 : 2;
        if (randomGaucheDroiteinit === 1) {
            speedX = -1 + randomSpeedinit;
            speedY = -1 ;
        }else {
            speedX = (-1 + randomSpeedinit)*(-1);
            speedY = -1 ;
        }
    }
});

gauche.addEventListener('touchstart', () => {
        leftPaddle = true;
        if (!gameStarted){
        gameStarted = true;
        startScoreCounter();
        let randomSpeedinit  = Math.random() * 0.25 + 0.5; // entre 0.5 et 0.75
        let randomGaucheDroiteinit = Math.random() < 0.5 ? 1 : 2;
        if (randomGaucheDroiteinit === 1) {
            speedX = -1 + randomSpeedinit;
            speedY = -1 ;
        }else {
            speedX = (-1 + randomSpeedinit)*(-1);
            speedY = -1 ;
        }
    }
});



droite.addEventListener('mouseup', () => rightPaddle = false);
gauche.addEventListener('mouseup', () => leftPaddle = false);

droite.addEventListener('mouseleave', () => rightPaddle = false);
gauche.addEventListener('mouseleave', () => leftPaddle = false);

droite.addEventListener('touchend', () => rightPaddle = false);
gauche.addEventListener('touchend', () => leftPaddle = false);

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        rightPaddle = true;
        if (!gameStarted){
        gameStarted = true;
        startScoreCounter();
        let randomSpeedinit  = Math.random() * 0.25 + 0.5; // entre 0.5 et 0.75
        let randomGaucheDroiteinit = Math.random() < 0.5 ? 1 : 2;
        if (randomGaucheDroiteinit === 1) {
            speedX = -1 + randomSpeedinit;
            speedY = -1 ;
        }else {
            speedX = (-1 + randomSpeedinit)*(-1);
            speedY = -1 ;
        }
    }
    }
    if (event.key === 'ArrowLeft') {
        leftPaddle = true;
        if (!gameStarted){
        gameStarted = true;
        startScoreCounter(); 
        let randomSpeedinit = Math.random() * 0.8 + 0.1; // entre 0.1 et 0.9; 
        let randomGaucheDroiteinit = Math.random() < 0.5 ? 1 : 2;
        if (randomGaucheDroiteinit === 1) {
            speedX = -1 + randomSpeedinit;
            speedY = -1 ;
        }else {
            speedX = (-1 + randomSpeedinit)*(-1);
            speedY = -1 ;
        }
    }
}
});
function updateScoreDisplay() {
    scoreDisplay.textContent = score;
}
document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowRight') {
        rightPaddle = false;
    }
    if (event.key === 'ArrowLeft') {
        leftPaddle = false;
    }
});


function restartGame() {
    score = 0;
    updateScoreDisplay();
    x = canvas.width / 2;
    y = canvas.height - 20;
    coXPaddle = (canvas.width / 2) - (tailleBarre / 2);
    speedX = -1;
    speedY = -1;
    gameStarted = false;
    leftPaddle = false;
    rightPaddle = false;
    if (scoreInterval) {
        clearInterval(scoreInterval);
        scoreInterval = null;
    }
}
let restartGameButton = document.getElementById('stop');
restartGameButton.addEventListener('click', () => {
    restartGame();
     if (!gameStarted){
        gameStarted = true;
        startScoreCounter();
        let randomSpeedinit  = Math.random() * 0.25 + 0.5; // entre 0.5 et 0.75
        let randomGaucheDroiteinit = Math.random() < 0.5 ? 1 : 2;
        if (randomGaucheDroiteinit === 1) {
            speedX = -1 + randomSpeedinit;
            speedY = -1 ;
        }else {
            speedX = (-1 + randomSpeedinit)*(-1);
            speedY = -1 ;
        }
    } // recharge la page
});

// démarrer l'animation
loop();