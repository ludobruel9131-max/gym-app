import React, { useState } from 'react';

const exercises = {
  "Jambes et Fessiers": [
    "Squat", "Fentes", "Presse à cuisse", "Extension de jambes",
    "Fentes Bulgares", "Montée sur banc", "Soulevé de terre jambes tendues",
    "Leg Curl", "Good Morning", "Soulevé de terre roumain", "Hip Thrust",
    "Glute Bridge", "Soulevé de terre", "Abduction de la hanche",
    "Élévation des mollets", "Élévation des mollets assis"
  ],
  "Poitrine": [
    "Développé couché", "Pompes", "Développé incliné",
    "Écartés couchés", "Dips pour la poitrine", "Pec Deck Machine"
  ],
  "Dos": [
    "Tractions", "Tirage vertical", "Tirage horizontal",
    "Soulevé de terre", "Rowing à la barre", "Rowing avec haltères",
    "Face Pull", "Tirage vertical prise serrée", "Hyperextensions", "Good Morning"
  ],
  "Épaules": [
    "Développé Militaire", "Push Press", "Développé Arnold",
    "Élévations frontales", "Élévations latérales", "Élévations buste penché",
    "Face Pull"
  ],
  "Bras": [
    "Curl avec haltères", "Curl à la barre", "Curl au pupitre",
    "Curl concentré", "Curl marteau", "Extensions triceps à la poulie",
    "Barre au front", "Dips pour les triceps", "Extensions triceps avec haltère",
    "Kickback"
  ],
  "Abdos": [
    "Crunch", "Relevé de jambes", "Sit-ups", "Relevé de buste sur banc décliné",
    "Gainage inversé", "Russian Twist", "Crunch obliques", "Side Plank",
    "Planche", "Vacuums"
  ],
  "Full Body": [
    "Burpees", "Soulevé de terre", "Squat", "Clean and Jerk", "Snatch",
    "Swing avec Kettlebell", "Tractions", "Pompes"
  ]
};

function App() {
  // état pour chaque type de séance
  const [push, setPush] = useState([
    { name: "Exercice 1", category: "Poitrine" },
    { name: "Exercice 2", category: "Épaules" },
    { name: "Exercice 3", category: "Bras" }
  ]);

  const [pull, setPull] = useState([
    { name: "Exercice 1", category: "Dos" },
    { name: "Exercice 2", category: "Bras" },
    { name: "Exercice 3", category: "Épaules" }
  ]);

  const [legs, setLegs] = useState([
    { name: "Exercice 1", category: "Jambes et Fessiers" }
  ]);

  const handleChange = (list, setList, index) => {
    const category = list[index].category;
    const options = exercises[category];
    const randomExo = options[Math.floor(Math.random() * options.length)];
    const newList = [...list];
    newList[index].name = randomExo;
    setList(newList);
  };

  const renderExercises = (list, setList, title) => (
    <div>
      <h2>{title}</h2>
      {list.map((ex, i) => (
        <div key={i}>
          {ex.name} ({ex.category})
          <button onClick={() => handleChange(list, setList, i)}>Changer</button>
        </div>
      ))}
      <hr />
    </div>
  );

  return (
    <div>
      <h1>Séance du Jour - Push/Pull/Legs</h1>
      {renderExercises(push, setPush, "Push")}
      {renderExercises(pull, setPull, "Pull")}
      {renderExercises(legs, setLegs, "Jambes / Fessiers")}
    </div>
  );
}

export default App;
