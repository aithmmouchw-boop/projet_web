// Liste des films
const films = [
    { title: "Avatar", genre: "Science-fiction", img: "images/avatar.jpg", available: true },
    { title: "Inception", genre: "Thriller", img: "images/inception.jpg", available: false },
    { title: "Titanic", genre: "Romance", img: "images/titanic.jpg", available: true },
    { title: "Spider-Man : No Way Home", genre: "Action", img: "images/spiderman.jpg", available: true }
];

// Génération dynamique des films et du select
const moviesContainer = document.getElementById("moviesContainer");
const filmSelect = document.getElementById("filmSelect");

films.forEach(film => {
    // Ajouter films au container
    moviesContainer.innerHTML += `
        <div class="movie ${film.available ? '' : 'unavailable'}">
            <img src="${film.img}" alt="${film.title}">
            <p>${film.title} - ${film.genre} ${film.available ? '' : '(Indisponible)'}</p>
        </div>
    `;
    // Ajouter options dans le select uniquement si disponible
    if(film.available) {
        filmSelect.innerHTML += `<option value="${film.title}">${film.title} - ${film.genre}</option>`;
    }
});

// Afficher une section
function showSection(sectionId) {
    document.querySelectorAll(".section").forEach(section => section.style.display = "none");
    document.getElementById(sectionId).style.display = "block";
}

// Afficher formulaire
function showForm() {
    document.getElementById("reservationForm").style.display = "block";
}

// Réserver
function reserver() {
    const nom = document.getElementById("nom").value;
    const places = document.getElementById("places").value;
    const film = filmSelect.value;

    if(nom === "" || places === "" || film === "") {
        document.getElementById("message").innerText = "Veuillez remplir tous les champs.";
        return;
    }

    // Vérifier disponibilité
    const selectedFilm = films.find(f => f.title === film);
    if(!selectedFilm.available) {
        document.getElementById("message").innerText = `Désolé, "${film}" n'est pas disponible pour le moment.`;
        return;
    }

    // Enregistrer réservation
    let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    reservations.push({nom, places, film});
    localStorage.setItem("reservations", JSON.stringify(reservations));

    document.getElementById("message").innerText = 
        `Merci ${nom}, votre réservation de ${places} place(s) pour "${film}" a été enregistrée.`;

    updateCount();
}

// Mode sombre / clair
function toggleTheme() {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");
}

// Compteur de réservations
function updateCount() {
    let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    document.getElementById("count").innerText = reservations.length;
}

// Initialisation
showSection("films");
updateCount();

