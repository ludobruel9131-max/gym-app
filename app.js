// Liste des exercices par groupe musculaire
const exercises = {
  jambes: ["Squat", "Fentes", "Presse à cuisse", "Soulevé de terre jambes tendues", "Hip Thrust", "Élévation des mollets"],
  poitrine: ["Développé couché", "Pompes", "Développé incliné", "Écartés couchés", "Dips", "Pec Deck Machine"],
  dos: ["Tractions", "Tirage vertical", "Tirage horizontal", "Rowing à la barre", "Face Pull", "Hyperextensions"],
  epaules: ["Développé Militaire", "Push Press", "Développé Arnold", "Élévations frontales", "Élévations latérales", "Élévations buste penché"],
  bras: ["Curl haltères", "Curl barre", "Curl pupitre", "Curl concentré", "Extensions triceps poulie", "Dips triceps"],
  abdos: ["Crunch", "Relevé de jambes", "Sit-ups", "Russian Twist", "Planche"]
};

// Fonction pour générer un exercice aléatoire pour chaque groupe
function generateWorkout() {
  const workoutDiv = document.getElementById("workout");
  workoutDiv.innerHTML = ""; // vide avant de remplir

  for (let group in exercises) {
    const exerciseList = exercises[group];
    const randomIndex = Math.floor(Math.random() * exerciseList.length);
    const selectedExercise = exerciseList[randomIndex];

    const exerciseDiv = document.createElement("div");
    exerciseDiv.className = "exercise";

    exerciseDiv.innerHTML = `
      <span>${group.toUpperCase()}: ${selectedExercise}</span>
      <button onclick="changeExercise('${group}', this)">Changer</button>
    `;

    workoutDiv.appendChild(exerciseDiv);
  }
}

// Fonction pour changer un exercice d’un groupe spécifique
function changeExercise(group, button) {
  const exerciseList = exercises[group];
  const randomIndex = Math.floor(Math.random() * exerciseList.length);
  const newExercise = exerciseList[randomIndex];

  // Met à jour le texte du parent
  button.parentElement.querySelector("span").textContent = `${group.toUpperCase()}: ${newExercise}`;
}

// Génère le workout au chargement de la page
generateWorkout();
