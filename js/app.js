var modal = document.querySelector(".modal");
var closeButton = document.querySelector(".close-button");
var canvas = document.querySelector('canvas');
let restartGame = document.querySelector('.restart');
let up = document.getElementById('up');
let down = document.getElementById('down');
let right = document.getElementById('right');
let left = document.getElementById('left');

// Enemies our player must avoid
class Enemy {
  constructor(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    //set enemy speed
    this.speed = 100 + Math.random()*400;
  };
  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    //dt is defined in engine.js
    this.x += this.speed * dt;
    // return enemy to left
    if (this.x > 700) {
      this.x = -100;
    };
    // colliding section
    if (Math.abs(this.x - player.x) < 55 && Math.abs(this.y - player.y) < 81) {
      player.resetPlayer();
      lives.pop();// Take one heart
      numberOfLives -= 1;
      if (numberOfLives > 0){
          player.resetPlayer();
      }
      else {setTimeout(function(){
        //alert ('GAME OVER!');
        modal.classList.toggle("show-modal");
      },500)};
        //closeButton.addEventListener("click", toggleModal);
        //window.addEventListener("click", windowOnClick);
        restartGame.addEventListener("click",startAgain);

    };
  };
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player{
  constructor(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
  }
  //adding methods
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
  update() {};
  handleInput(key) {
    if (key === 'left' && this.x > 0) { this.x += -100};
    if (key === 'right' && this.x < 599) {this.x += 100};
    if (key === 'up'  && this.y > -25 ) {this.y += -80};
    if (key === 'down' && this.y < 450) {this.y += 80};
    if (this.y === -30) {
      setTimeout(function() {
          alert ('YOU ARE SAFE!'); //TO DO : Pop up window with "style GREAT"
          startAgain();
        },300)};
  };
  handleButton(button) {
    if (button === "leftPlayer" && this.x > 0) { this.x += -100};
    if (button === "rightPlayer" && this.x < 599) {this.x += 100};
    if (button === "upPlayer"  && this.y > -25 ) {this.y += -80};
    if (button === "downPlayer" && this.y < 450) {this.y += 80};
    if (this.y === -30) {
      setTimeout(function() {
          alert ('YOU ARE SAFE!'); //TO DO : Pop up window with "style GREAT"
          startAgain();
        },300)};
  }

  // bring the player to the start position
  resetPlayer() {
      this.x = 300;
      this.y = 450;
    };
};
// This class adds hearts on the screen
class Hearts{
  constructor (x,y) {
    this.sprite = 'images/Heart.png';
    this.x = x;
    this.y = y;
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
  update() {};
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemy1 = new Enemy(-100,63);
const enemy2 = new Enemy(-200,146);
const enemy3 = new Enemy(-150,229);
const enemy4 = new Enemy(-100,312);
const allEnemies = [enemy1, enemy2, enemy3, enemy4];
const player = new Player(300,450);
//add an array with hearts
const live1 = new Hearts(0,-40);
const live2 = new Hearts(80,-40);
const live3 = new Hearts(160,-40);
let lives = [live1, live2, live3];
let numberOfLives = 3;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

down.addEventListener('click',function(){player.handleButton("downPlayer")});
up.addEventListener('click', function(){player.handleButton("upPlayer")});

right.addEventListener('click',function(){player.handleButton("rightPlayer")});
left.addEventListener('click',function(){player.handleButton("leftPlayer")});


// this function restarts the game
function startAgain(){
  modal.classList.toggle("show-modal");
  lives = [live1, live2, live3];
  numberOfLives = 3;
  player.resetPlayer();
};
