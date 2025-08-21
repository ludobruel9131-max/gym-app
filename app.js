// Liste des exercices
const exercices = [
  "Pompes",
  "Squats",
  "Fentes",
  "Planche",
  "Abdos crunch",
  "Dips sur chaise",
  "Mountain climbers"
];

// Messages motivants
const messages = [
  "Bravo, tu gères ! 💪",
  "Encore une séance, tu progresses ! 🚀",
  "Tu es sur la bonne voie ! 🌟",
  "Chaque effort compte ! 🔥"
];

const app = document.getElementById("app");

// Choisir 5 exercices aléatoires
function genererSeance() {
  const copie = [...exercices];
  const seance = [];
  for (let i = 0; i < 5; i++) {
    const index = Math.floor(Math.random() * copie.length);
    seance.push(copie.splice(index, 1)[0]);
  }
  return seance;
}

// Afficher la séance
function afficherSeance() {
  app.innerHTML = ""; // Reset
  const seance = genererSeance();

  const titre = document.createElement("h2");
  titre.textContent = "Séance du jour";
  app.appendChild(titre);

  const liste = document.createElement("ul");
  seance.forEach(exo => {
    const li = document.createElement("li");
    li.textContent = exo;
    li.style.cursor = "pointer";

    // Timer
    const timer = document.createElement("span");
    timer.textContent = " ⏳ 30s";
    timer.style.marginLeft = "10px";
    li.appendChild(timer);

    // Cliquer pour lancer le chrono
    li.addEventListener("click", () => startTimer(timer, li));

    liste.appendChild(li);
  });
  app.appendChild(liste);

  // Message motivant
  const msg = document.createElement("p");
  msg.textContent = messages[Math.floor(Math.random() * messages.length)];
  msg.style.fontWeight = "bold";
  msg.style.marginTop = "15px";
  app.appendChild(msg);
}

// Timer pour chaque exercice
function startTimer(timerElement, liElement) {
  let time = 30;
  timerElement.textContent = ` ⏳ ${time}s`;
  liElement.style.textDecoration = "none";
  const interval = setInterval(() => {
    time--;
    timerElement.textContent = ` ⏳ ${time}s`;
    if (time <= 0) {
      clearInterval(interval);
      liElement.style.textDecoration = "line-through"; // Marquer comme fait
      timerElement.textContent = " ✅ Terminé !";
    }
  }, 1000);
}

// Initialisation
afficherSeance();
