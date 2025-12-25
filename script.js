// Game state
const game = {
  helicopter: null,
  velocityX: 0,
  velocityY: 0,
  positionX: 15,
  positionY: 50,
  speed: 0.15,
  maxVelocity: 0.5,
  friction: 0.9,
  keys: {
    up: false,
    down: false,
    left: false,
    right: false,
  },
};

// Get the audio element from HTML
const bgMusic = document.getElementById("bg-music");

// Track whether audio has started
let audioStarted = false;

// Start audio on first user interaction
document.addEventListener("keydown", () => {
  if (!audioStarted) {
    bgMusic.play();
    audioStarted = true;
  }
});

// Initialize game
function init() {
  game.helicopter = document.getElementById("heli");
  gameLoop();

  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);
}

// Handle key press
function handleKeyDown(e) {
  switch (e.key) {
    case "ArrowUp":
      game.keys.up = true;
      e.preventDefault();
      break;
    case "ArrowDown":
      game.keys.down = true;
      e.preventDefault();
      break;
    case "ArrowLeft":
      game.keys.left = true;
      e.preventDefault();
      break;
    case "ArrowRight":
      game.keys.right = true;
      e.preventDefault();
      break;
  }
}

// Handle key release
function handleKeyUp(e) {
  switch (e.key) {
    case "ArrowUp":
      game.keys.up = false;
      e.preventDefault();
      break;
    case "ArrowDown":
      game.keys.down = false;
      e.preventDefault();
      break;
    case "ArrowLeft":
      game.keys.left = false;
      e.preventDefault();
      break;
    case "ArrowRight":
      game.keys.right = false;
      e.preventDefault();
      break;
  }
}

// Game loop
function gameLoop() {
  // Update velocity based on keys
  if (game.keys.up) game.velocityY -= game.speed;
  if (game.keys.down) game.velocityY += game.speed;
  if (game.keys.left) game.velocityX -= game.speed;
  if (game.keys.right) game.velocityX += game.speed;

  // Limit max velocity
  game.velocityX = Math.max(
    -game.maxVelocity,
    Math.min(game.maxVelocity, game.velocityX)
  );
  game.velocityY = Math.max(
    -game.maxVelocity,
    Math.min(game.maxVelocity, game.velocityY)
  );

  // Apply friction
  game.velocityX *= game.friction;
  game.velocityY *= game.friction;

  // Update position
  game.positionX += game.velocityX;
  game.positionY += game.velocityY;

  // Keep helicopter in bounds
  if (game.positionX < 0) {
    game.positionX = 0;
    game.velocityX = 0;
  } else if (game.positionX > 100) {
    game.positionX = 100;
    game.velocityX = 0;
  }

  if (game.positionY < 0) {
    game.positionY = 0;
    game.velocityY = 0;
  } else if (game.positionY > 100) {
    game.positionY = 100;
    game.velocityY = 0;
  }

  // Calculate tilt based on horizontal velocity
  const tilt = (game.velocityX / game.maxVelocity) * 15;

  // Update helicopter position and rotation
  game.helicopter.style.left = `${game.positionX}%`;
  game.helicopter.style.top = `${game.positionY}%`;
  game.helicopter.style.transform = `translate(-50%, -50%) rotateZ(${tilt}deg)`;

  requestAnimationFrame(gameLoop);
}

window.addEventListener("load", init);
