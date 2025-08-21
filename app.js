// Liste des exercices
const exercises = {
    jambes: ["Squat", "Fentes", "Presse à cuisse", "Leg Curl", "Hip Thrust", "Élévation des mollets"],
    poitrine: ["Développé couché", "Pompes", "Développé incliné", "Écartés couchés", "Dips", "Pec Deck"],
    dos: ["Tractions", "Tirage vertical", "Tirage horizontal", "Soulevé de terre", "Rowing à la barre", "Face Pull"],
    epaules: ["Développé Militaire", "Push Press", "Développé Arnold", "Élévations frontales", "Élévations latérales", "Élévations buste penché"],
    bras: ["Curl haltères", "Curl barre", "Curl pupitre", "Extensions triceps poulie", "Barre au front", "Kickback"],
    abdos: ["Crunch", "Relevé de jambes", "Sit-ups", "Planche", "Russian Twist", "Side Plank"]
};

// Fonction pour générer la séance
function generateSeance() {
    const seanceDiv = document.getElementById("seance");
    seanceDiv.innerHTML = ""; // vide avant de générer

    for (const [muscle, list] of Object.entries(exercises)) {
        const exoDiv = document.createElement("div");
        exoDiv.className = "exercise";

        const exoName = document.createElement("span");
        // Choisit un exercice aléatoire
        exoName.textContent = `${muscle.toUpperCase()}: ${list[Math.floor(Math.random() * list.length)]}`;
        exoDiv.appendChild(exoName);

        const btn = document.createElement("button");
        btn.textContent = "Changer cet exercice";
        btn.addEventListener("click", () => {
            exoName.textContent = `${muscle.toUpperCase()}: ${list[Math.floor(Math.random() * list.length)]}`;
        });
        exoDiv.appendChild(btn);

        seanceDiv.appendChild(exoDiv);
    }
}

// Génère la séance au chargement
window.onload = generateSeance;
