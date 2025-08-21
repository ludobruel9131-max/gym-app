const exercisesPool = {
  'Push': ['Pompes', 'Développé couché', 'Dips'],
  'Legs': ['Squats', 'Fentes', 'Soulevé de terre jambes tendues'],
  'Core': ['Abdos', 'Gainage', 'Crunchs'],
  'Pull': ['Tractions', 'Rowing', 'Curl biceps']
};

let currentDay = 'Lundi';
let exercises = [];
let weeklyHistory = JSON.parse(localStorage.getItem('weeklyHistory')) || [];
let restTimer = null;
let restTime = 80; // 1min20 en secondes

const exerciseList = document.getElementById('exerciseList');
const historyList = document.getElementById('historyList');
const progressFill = document.getElementById('progressFill');

function getRandomExercise(type) {
  const pool = exercisesPool[type];
  return pool[Math.floor(Math.random() * pool.length)];
}

function generateSession() {
  return [
    { name: getRandomExercise('Push'), sets: 3, reps: 12, doneSets: 0 },
    { name: getRandomExercise('Pull'), sets: 3, reps: 10, doneSets: 0 },
    { name: getRandomExercise('Legs'), sets: 3, reps: 15, doneSets: 0 },
    { name: getRandomExercise('Core'), sets: 2, reps: 20, doneSets: 0 }
  ];
}

function renderExercises() {
  exerciseList.innerHTML = '';
  exercises.forEach((ex, index) => {
    const div = document.createElement('div');
    div.className = 'exercise';
    div.innerHTML = `
      ${ex.name} - ${ex.doneSets}/${ex.sets} sets (${ex.reps} reps)
      <button onclick="startSet(${index})">+1 set</button>
      <div id="rest${index}" style="margin-top:5px; color:#b5a05b;"></div>
    `;
    exerciseList.appendChild(div);
  });
  updateProgress();
}

function startSet(index) {
  if (exercises[index].doneSets >= exercises[index].sets) return;

  exercises[index].doneSets += 1;
  weeklyHistory.push({day: currentDay, name: exercises[index].name, reps: exercises[index].reps});
  localStorage.setItem('weeklyHistory', JSON.stringify(weeklyHistory));
  renderExercises();
  renderHistory();

  startRest(index);
}

function startRest(index) {
  clearInterval(restTimer);
  let remaining = restTime;
  const restDiv = document.getElementById(`rest${index}`);
  restDiv.textContent = `Repos : ${Math.floor(remaining/60)}:${String(remaining%60).padStart(2,'0')}`;

  restTimer = setInterval(() => {
    remaining--;
    restDiv.textContent = `Repos : ${Math.floor(remaining/60)}:${String(remaining%60).padStart(2,'0')}`;
    if (remaining <= 0) {
      clearInterval(restTimer);
      restDiv.textContent = 'Repos terminé ✅';
    }
  }, 1000);
}

function renderHistory() {
  historyList.innerHTML = '';
  weeklyHistory.forEach(entry => {
    const li = document.createElement('li');
    li.textContent = `${entry.day} - ${entry.name} (${entry.reps} reps)`;
    historyList.appendChild(li);
  });
}

function changeDay(day) {
  currentDay = day;
  exercises = generateSession();
  renderExercises();
}

function updateProgress() {
  const totalSets = exercises.reduce((sum, ex) => sum + ex.sets, 0);
  const doneSets = exercises.reduce((sum, ex) => sum + ex.doneSets, 0);
  const percent = totalSets === 0 ? 0 : Math.round((doneSets / totalSets) * 100);
  progressFill.style.width = percent + '%';
  progressFill.textContent = percent + '%';
}

// initialisation
exercises = generateSession();
renderExercises();
renderHistory();
