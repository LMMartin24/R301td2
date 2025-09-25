const canvas = document.getElementById("demo");
const ctx = canvas.getContext("2d");

let x = 20;                      // position de la balle (axe des abscisses X)
let y = 20;     // centrage vertical dans le canvas
let speedX = 2; 
let speedY=2;               // vitesse de la balle
let leftPaddle = false;
let rightPaddle = false;
let coYPaddle=canvas.height-5;
let coXPaddle=canvas.width/2;
let rafId;                       // identifiant de la boucle d'animation
let tailleBarre=40;


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

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height) // efface l'écran
    drawBall();
    drawRectangle();
    if (rightPaddle && coXPaddle < canvas.width - tailleBarre) {
        coXPaddle += 5; // Déplace la barre vers la droite
    }
    if (leftPaddle && coXPaddle > 0) {
        coXPaddle -= 5; // Déplace la barre vers la gauche
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
    if (y +5 > coYPaddle - 5 && x > coXPaddle && x < coXPaddle + tailleBarre) {
        //random de la vitesse en Y pour éviter les trajectoires trop prévisibles
        let randomSpeedY = Math.random() * 10;
        speedY *= -1;
        speedY -=(randomSpeedY/40)+1;
    }
    //arrete la balle si elle touche le bas du canvas
    if (y > canvas.height-11) {
        speedY = 0;
        speedX = 0;
    }   
}
function loop() {
    update();
    rafId = requestAnimationFrame(loop); // planifie la prochaine frame
}



// possibilité d'arrêter l'animation avec le bouton 'stop'
let stopAnimation = document.getElementById('stop');
stopAnimation.addEventListener('click', () => {
    cancelAnimationFrame(rafId)
})

droite.addEventListener('mousedown', () => rightPaddle = true);
gauche.addEventListener('mousedown', () => leftPaddle = true);

droite.addEventListener('mouseup', () => rightPaddle = false);
gauche.addEventListener('mouseup', () => leftPaddle = false);

droite.addEventListener('mouseleave', () => rightPaddle = false);
gauche.addEventListener('mouseleave', () => leftPaddle = false);

// démarrer l'animation
loop();