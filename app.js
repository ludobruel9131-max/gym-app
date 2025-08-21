<script>
const exercisesPool = {
  'Push': ['Pompes', 'Développé couché', 'Dips'],
  'Legs': ['Squats', 'Fentes', 'Soulevé de terre jambes tendues'],
  'Core': ['Abdos', 'Gainage', 'Crunchs'],
  'Pull': ['Tractions', 'Rowing', 'Curl biceps']
};

let currentDay = 'Lundi';
let exercises = [];
let weeklyHistory = JSON.parse(localStorage.getItem('weeklyHistory')) || [];
let weeklySessions = JSON.parse(localStorage.getItem('weeklySessions')) || {
  'Lundi': false, 'Mardi': false, 'Mercredi': false, 'Jeudi': false, 'Vendredi': false, 'Samedi': false, 'Dimanche': false
};

const exerciseList = document.getElementById('exerciseList');
const historyList = document.getElementById('historyList');
const progressFill = document.getElementById('progressFill');
const weeklyProgress = document.getElementById('weeklyProgress');

function getRandomExercise(type) {
  const pool = exercisesPool[type];
  return pool[Math.floor(Math.random() * pool.length)];
}

function generateSession() {
  return [
    { name: getRandomExercise('Push'), sets: 3, reps: 12, doneSets: 0, timer: 60 },
    { name: getRandomExercise('Pull'), sets: 3, reps: 10, doneSets: 0, timer: 60 },
    { name: getRandomExercise('Legs'), sets: 3, reps: 15, doneSets: 0, timer: 90 },
    { name: getRandomExercise('Core'), sets: 2, reps: 20, doneSets: 0, timer: 45 }
  ];
}

function renderExercises() {
  exerciseList.innerHTML = '';
  exercises.forEach((ex, index) => {
    const doneClass = ex.doneSets === ex.sets ? 'style="text-decoration: line-through; color: #777;"' : '';
    const div = document.createElement('div');
    div.className = 'exercise';
    div.innerHTML = `
      <span ${doneClass}>${ex.name} - ${ex.doneSets}/${ex.sets} sets (${ex.reps} reps)</span>
      <button onclick="markDone(${index})">+1 set</button>
      <button onclick="startTimer(${index})">⏱ Timer</button>
      <span id="timer${index}"></span>
    `;
    exerciseList.appendChild(div);
  });
  updateProgress();
  updateWeeklyProgress();
}

function markDone(index) {
  if (exercises[index].doneSets < exercises[index].sets) {
    exercises[index].doneSets += 1;
    weeklyHistory.push({day: currentDay, name: exercises[index].name, reps: exercises[index].reps});
    localStorage.setItem('weeklyHistory', JSON.stringify(weeklyHistory));
    checkCompleteSession();
    renderExercises();
    renderHistory();
    showMotivation();
  }
}

function checkCompleteSession() {
  const allDone = exercises.every(ex => ex.doneSets === ex.sets);
  if (allDone && !weeklySessions[currentDay]) {
    weeklySessions[currentDay] = true;
    localStorage.setItem('weeklySessions', JSON.stringify(weeklySessions));
    alert(`🎉 Tu as terminé ta séance du ${currentDay} !`);
  }
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

function updateWeeklyProgress() {
  const totalDays = Object.keys(weeklySessions).length;
  const doneDays = Object.values(weeklySessions).filter(done => done).length;
  const percent = Math.round((doneDays / totalDays) * 100);
  weeklyProgress.style.width = percent + '%';
  weeklyProgress.textContent = percent + '% séances complètes';
}

function showMotivation() {
  const messages = [
    "Bien joué ! 💪",
    "Continue comme ça ! 🔥",
    "Tu progresses chaque jour ! 🌟",
    "Encore un set de plus ! 👊"
  ];
  const msg = messages[Math.floor(Math.random() * messages.length)];
  alert(msg);
}

function startTimer(index) {
  let time = exercises[index].timer;
  const timerSpan = document.getElementById('timer' + index);
  timerSpan.textContent = ` ⏳ ${time}s`;
  const interval = setInterval(() => {
    time--;
    timerSpan.textContent = ` ⏳ ${time}s`;
    if (time <= 0) {
      clearInterval(interval);
      timerSpan.textContent = ' ✅ Terminé';
      alert(`${exercises[index].name} terminé !`);
    }
  }, 1000);
}

// Initialisation
exercises = generateSession();
renderExercises();
renderHistory();
</script>
