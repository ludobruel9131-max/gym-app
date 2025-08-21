// Liste des exercices
const exercices = {
    jambes: ["Squat", "Fentes", "Presse à cuisse", "Extension de jambes", "Fentes Bulgares", "Step-up", "Soulevé de terre jambes tendues", "Leg Curl", "Good Morning", "Hip Thrust", "Glute Bridge", "Élévation mollets"],
    poitrine: ["Développé couché", "Pompes", "Développé incliné", "Écartés couchés", "Dips", "Pec Deck Machine"],
    dos: ["Tractions", "Tirage vertical", "Tirage horizontal", "Rowing barre", "Rowing haltères", "Face Pull", "Hyperextensions", "Soulevé de terre"],
    epaules: ["Développé militaire", "Push Press", "Développé Arnold", "Élévations frontales", "Élévations latérales", "Bent-over Lateral Raise", "Face Pull"],
    bras: ["Curl haltères", "Curl barre", "Curl pupitre", "Curl concentré", "Curl marteau", "Extensions triceps poulie", "Barre au front", "Dips triceps", "Kickback"],
    abdos: ["Crunch", "Relevé de jambes", "Sit-ups", "Gainage", "Russian Twist", "Side Plank", "Vacuums"],
    fullbody: ["Burpees", "Soulevé de terre", "Squat", "Clean and Jerk", "Snatch", "Swing Kettlebell", "Tractions", "Pompes"]
};

// Fonction pour générer un exercice aléatoire par catégorie
function genererSeance() {
    const seanceDiv = document.getElementById('seance');
    seanceDiv.innerHTML = ''; // vide la séance précédente

    for (let categorie in exercices) {
        const list = exercices[categorie];
        const randomExo = list[Math.floor(Math.random() * list.length)];

        const exoDiv = document.createElement('div');
        exoDiv.className = 'exercice';
        exoDiv.textContent = `${categorie.toUpperCase()}: ${randomExo}`;

        // bouton pour changer uniquement cet exercice
        const changerBtn = document.createElement('button');
        changerBtn.textContent = 'Changer';
        changerBtn.onclick = () => {
            const nouveauExo = list[Math.floor(Math.random() * list.length)];
            exoDiv.textContent = `${categorie.toUpperCase()}: ${nouveauExo}`;
            exoDiv.appendChild(changerBtn);
        };

        exoDiv.appendChild(changerBtn);
        seanceDiv.appendChild(exoDiv);
    }
}

// bouton général
document.getElementById('generer').addEventListener('click', genererSeance);
