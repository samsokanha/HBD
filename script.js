
const screens = document.querySelectorAll(".screen");
const candles = document.querySelectorAll(".candle");
const cakeStatus = document.getElementById("cake-status");
const blowButton = document.getElementById("blow-btn");
const surpriseOverlay = document.getElementById("surprise-overlay");

let toastTimer;

// Change screens with a smooth transition.
function goToScreen(screenNumber) {
  screens.forEach((screen) => {
    screen.classList.remove("active");
  });

  const nextScreen = document.getElementById(`screen${screenNumber}`);

  if (nextScreen) {
    nextScreen.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

// Light or turn off an individual candle.
function toggleCandle(candle) {
  candle.classList.toggle("lit");
  updateCakeStatus();
}

// Light all five candles.
function lightCandles() {
  candles.forEach((candle) => {
    candle.classList.add("lit");
  });

  blowButton.disabled = false;
  blowButton.style.opacity = "1";

  cakeStatus.textContent = "Make a wish, baby! ✨💗";
}

// Update the message based on the candle states.
function updateCakeStatus() {
  const litCount = document.querySelectorAll(".candle.lit").length;

  if (litCount === 0) {
    cakeStatus.textContent = "All candles are out! 💨";
    blowButton.disabled = true;
    blowButton.style.opacity = "0.5";
  } else {
    cakeStatus.textContent = `${litCount} candle(s) glowing for you! 💗`;
    blowButton.disabled = false;
    blowButton.style.opacity = "1";
  }
}

// Blow out the candles and show the big surprise.
function blowCandles() {
  const litCount = document.querySelectorAll(".candle.lit").length;

  if (litCount === 0) {
    showToast("Light the candles first, baby! 🕯️");
    return;
  }

  candles.forEach((candle) => {
    candle.classList.remove("lit");
  });

  updateCakeStatus();
  cakeStatus.textContent = "Your wish is flying to the stars! ✨";

  // Show the birthday surprise popup.
  surpriseOverlay.classList.remove("hidden");

  // Create lots of floating hearts.
  for (let i = 0; i < 30; i++) {
    setTimeout(createFloatingHeart, i * 70);
  }

  // Drop birthday confetti.
  createConfetti();

  showToast("Surprise, birthday boy! I love you! 💖");
}

// Close the popup and go to Screen 3.
function closeSurprise() {
  surpriseOverlay.classList.add("hidden");
  goToScreen(3);
}

// Create floating hearts.
function createFloatingHeart() {
  const heartsContainer = document.getElementById("floating-hearts");
  const heart = document.createElement("span");

  const symbols = ["💗", "💕", "💖", "💘", "❤️", "🌸"];
  heart.className = "floating-heart";
  heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];

  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${16 + Math.random() * 22}px`;
  heart.style.setProperty("--duration", `${4 + Math.random() * 4}s`);

  heartsContainer.appendChild(heart);

  heart.addEventListener("animationend", () => {
    heart.remove();
  });
}

// Keep hearts floating in the background.
setInterval(createFloatingHeart, 700);

// Create falling confetti.
function createConfetti() {
  const symbols = ["💗", "💕", "💖", "✨", "🎉", "🌸"];

  for (let i = 0; i < 55; i++) {
    setTimeout(() => {
      const piece = document.createElement("span");

      piece.className = "birthday-confetti";
      piece.textContent = symbols[
        Math.floor(Math.random() * symbols.length)
      ];

      piece.style.left = `${Math.random() * 100}%`;
      piece.style.fontSize = `${16 + Math.random() * 20}px`;
      piece.style.setProperty(
        "--duration",
        `${2.5 + Math.random() * 2}s`
      );

      document.body.appendChild(piece);

      piece.addEventListener("animationend", () => {
        piece.remove();
      });
    }, i * 35);
  }
}

// Show a small notification.
function showToast(message) {
  const toast = document.getElementById("toast");

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Create a small burst of hearts when the page is clicked.
document.addEventListener("click", (event) => {
  // Avoid creating extra hearts when clicking buttons.
  if (event.target.closest("button")) {
    return;
  }

  const symbols = ["💗", "💕", "💖"];

  for (let i = 0; i < 5; i++) {
    const heart = document.createElement("span");

    heart.className = "click-heart";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    heart.style.left = `${event.clientX}px`;
    heart.style.top = `${event.clientY}px`;
    heart.style.setProperty("--x", `${(Math.random() - 0.5) * 150}px`);
    heart.style.setProperty("--y", `${(Math.random() - 0.5) * 150}px`);

    document.body.appendChild(heart);

    heart.addEventListener("animationend", () => {
      heart.remove();
    });
  }
});

// Start with the first screen.
goToScreen(1);
updateCakeStatus();


// SCREEN 5: send animated kisses.
let totalKisses = 0;

function sendKisses() {
  totalKisses++;
  const counter = document.getElementById("kissCounter");
  const message = document.getElementById("kissMessage");
  const character = document.querySelector(".anime-photo");

  if (counter) counter.textContent = `Kisses delivered: ${totalKisses} ♡`;
  if (message) {
    const messages = [
      "A kiss for my favorite person 💋",
      "Mwahhh! I love you, baby! 💗",
      "One more kiss, just for you! 💋",
      "Sending you all my love! 💕"
    ];
    message.textContent = messages[(totalKisses - 1) % messages.length];
  }

  if (character) {
    character.classList.remove("kiss-pop");
    void character.offsetWidth;
    character.classList.add("kiss-pop");
  }

  createKissParticles(14);
}

function createKissParticles(amount) {
  const container = document.getElementById("kissParticles");
  if (!container) return;

  const symbols = ["♡", "♥", "💋", "✧", "💕", "💗"];
  for (let i = 0; i < amount; i++) {
    const particle = document.createElement("span");
    particle.className = "floating-kiss";
    particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    particle.style.left = `${5 + Math.random() * 90}%`;
    particle.style.animationDelay = `${Math.random() * 0.55}s`;
    container.appendChild(particle);
    setTimeout(() => particle.remove(), 3500);
  }
}

/* Floating hearts, flowers, and sparkles */
function createRomanticParticle() {
  const symbols = ["💗", "💕", "💖", "🌸", "🌷", "🌺", "✨"];
  const particle = document.createElement("span");

  particle.className = "romantic-particle";
  particle.textContent =
    symbols[Math.floor(Math.random() * symbols.length)];

  particle.style.left = `${Math.random() * 100}vw`;
  particle.style.fontSize = `${16 + Math.random() * 18}px`;

  const duration = 6 + Math.random() * 6;
  particle.style.animationDuration = `${duration}s`;

  document.body.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, duration * 1000);
}

// Create a new floating decoration every 800 milliseconds.
setInterval(createRomanticParticle, 800);

