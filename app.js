const exercises = [
  { name: "Développé couché", muscle: "Pectoraux" },
  { name: "Tractions", muscle: "Dos" },
  { name: "Squats", muscle: "Jambes" },
  { name: "Fentes", muscle: "Jambes" },
  { name: "Curl biceps", muscle: "Bras" },
  { name: "Extensions triceps", muscle: "Bras" },
  { name: "Élévations latérales", muscle: "Épaules" },
  { name: "Abdos crunch", muscle: "Abdos" },
  { name: "Gainage", muscle: "Abdos" },
];

function generateWorkout() {
  const workout = [];
  const musclesWorked = new Set();

  while (workout.length < 5) {
    const random = exercises[Math.floor(Math.random() * exercises.length)];
    if (!musclesWorked.has(random.muscle)) { 
      workout.push(random);
      musclesWorked.add(random.muscle);
    }
  }

  return workout;
}

function displayWorkout() {
  const workoutSection = document.getElementById("dashboard");
  const workout = generateWorkout();

  let html = "<h3>Séance du jour :</h3><ul>";
  workout.forEach(ex => {
    html += `<li>${ex.name} (${ex.muscle}) <button onclick="swapExercise('${ex.name}')">Changer</button></li>`;
  });
  html += "</ul>";

  workoutSection.innerHTML = html;
}

function swapExercise(exerciseName) {
  const index = exercises.findIndex(e => e.name === exerciseName);
  let newExercise;

  do {
    newExercise = exercises[Math.floor(Math.random() * exercises.length)];
  } while (newExercise.name === exerciseName);

  exercises[index] = newExercise;
  displayWorkout();
}

window.onload = displayWorkout;
