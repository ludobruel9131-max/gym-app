import React, { useState } from "react";
import "./App.css";

// Liste d'exercices par catégorie
const exercises = {
  legs: [
    "Squat", "Fentes", "Presse à cuisse", "Extension de jambes", "Fentes Bulgares",
    "Montée sur banc", "Soulevé de terre jambes tendues", "Leg Curl", "Good Morning",
    "Soulevé de terre roumain", "Hip Thrust", "Glute Bridge", "Abduction de la hanche",
    "Élévation des mollets"
  ],
  push: [
    "Développé couché", "Pompes", "Développé incliné", "Écartés couchés", "Dips", "Pec Deck",
    "Développé Militaire", "Push Press", "Développé Arnold", "Élévations frontales",
    "Élévations latérales", "Élévations buste penché", "Face Pull",
    "Extensions triceps à la poulie", "Barre au front", "Dips triceps", "Extensions triceps haltère", "Kickback"
  ],
  pull: [
    "Tractions", "Tirage vertical", "Tirage horizontal", "Soulevé de terre",
    "Rowing à la barre", "Rowing avec haltères", "Face Pull", "Tirage vertical prise serrée",
    "Hyperextensions", "Curl avec haltères", "Curl à la barre", "Curl au pupitre", "Curl concentré", "Curl marteau"
  ],
  abs: [
    "Crunch", "Relevé de jambes", "Sit-ups", "Relevé de buste sur banc",
    "Russian Twist", "Crunch obliques", "Side Plank", "Planche", "Vacuums"
  ],
  fullbody: [
    "Burpees", "Soulevé de terre", "Squat", "Clean and Jerk", "Snatch", "Swing avec Kettlebell", "Tractions", "Pompes"
  ]
};

// Fonction pour tirer un exercice aléatoire d'une catégorie
const getRandomExercise = (category) => {
  const list = exercises[category];
  const index = Math.floor(Math.random() * list.length);
  return list[index];
};

function App() {
  // État pour chaque exercice de la séance du jour
  const [seance, setSeance] = useState({
    legs: getRandomExercise("legs"),
    push: getRandomExercise("push"),
    pull: getRandomExercise("pull"),
    abs: getRandomExercise("abs"),
    fullbody: getRandomExercise("fullbody")
  });

  // Fonction pour changer un exercice individuel
  const changeExercise
