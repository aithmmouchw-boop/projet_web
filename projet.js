const films = [
    { title: "Ratatouille 2007", genre: "Animation / Comédie / Famille", img:"", available: true },
    { title: "Casablanca", genre: "Romance", img: "", available: false },
    { title: "Five Feet Apart", genre: "Romance", img: "", available: true },
    { title: "Majid", genre: "Drame", img: "", available: true },
    { title: "HudutsuzSevda", genre: "Action", img: "", available: true },
    { title: "Avatar", genre: "Action", img: "images/avatar.jpg", available: false },
    { title: "Casa Street", genre: "Comédie / Drame", img: "", available: true },
    { title: "Luck", genre: "Animation", img: "", available: true },
    { title: "Nowhere", genre: "Thriller / Drame", img: "images/nowhere.jpg", available: true },
    { title: "The Beauty and the Beast", genre: "Romance / Fantastique / Musical", img:"", available: false },
    { title: "Divergente", genre: "Action", img: "", available: true },
    { title: "K2", genre: "Action", img: "", available: true }
];


const moviesContainer = document.getElementById("moviesContainer");
const filmSelect = document.getElementById("filmSelect");

// afficher les films
films.forEach(film => {
    moviesContainer.innerHTML += `
        <div class="movie ${film.available ? "" : "unavailable"}">
            <img src="${film.img}">
            <p>${film.title}</p>
            <small>${film.genre}</small>
            ${!film.available ? "<p>Indisponible</p>" : ""}
        </div>
    `;

    if (film.available) {
        filmSelect.innerHTML += `
            <option value="${film.title}">
                ${film.title} - ${film.genre}
            </option>`;
    }
});

// navigation
function showSection(id) {
    document.querySelectorAll(".section").forEach(s => s.style.display = "none");
    document.getElementById(id).style.display = "block";
}

// afficher formulaire
function showForm() {
    document.getElementById("reservationForm").style.display = "block";
}

// réservation
function reserver() {
    const nom = document.getElementById("nom").value.trim();
    const places = document.getElementById("places").value;
    const film = filmSelect.value;

    if (!nom || !places || !film) {
        document.getElementById("message").innerText =
            "Veuillez remplir tous les champs.";
        return;
    }

    const selectedFilm = films.find(f => f.title === film);

    if (!selectedFilm.available) {
        document.getElementById("message").innerText =
            "Ce film n'est pas disponible.";
        return;
    }

    let reservations = JSON.parse(localStorage.getItem("reservations")) || [];

    reservations.push({ nom, film, places });
    localStorage.setItem("reservations", JSON.stringify(reservations));

    document.getElementById("message").innerText =
        `Merci ${nom}, votre réservation pour "${film}" (${places} place(s)) est confirmée ✅`;

    updateCount();
    showSection("seats");
createSeats();

}

// compteur
function updateCount() {
    const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    document.getElementById("count").innerText = reservations.length;
}

// thème clair / sombre
function toggleTheme() {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");
}

// initialisation
showSection("films");
updateCount();
// ----- SALLE DE CINÉMA -----

const seatGrid = document.getElementById("seatGrid");
let selectedSeats = [];

// créer 40 sièges
function createSeats() {
    seatGrid.innerHTML = "";

    let occupied = JSON.parse(localStorage.getItem("occupiedSeats")) || [];

    for (let i = 1; i <= 40; i++) {
        const seat = document.createElement("div");
        seat.classList.add("seat");

        if (occupied.includes(i)) {
            seat.classList.add("occupied");
        }

        seat.innerText = i;

        seat.addEventListener("click", () => toggleSeat(i, seat));
        seatGrid.appendChild(seat);
    }
}

function toggleSeat(number, seat) {
    if (seat.classList.contains("selected")) {
        seat.classList.remove("selected");
        selectedSeats = selectedSeats.filter(n => n !== number);
    } else {
        seat.classList.add("selected");
        selectedSeats.push(number);
    }
}

// confirmation
function confirmSeats() {
    if (selectedSeats.length === 0) {
        document.getElementById("seatMessage").innerText =
            "Veuillez sélectionner au moins une place.";
        return;
    }

    let occupied = JSON.parse(localStorage.getItem("occupiedSeats")) || [];
    occupied = occupied.concat(selectedSeats);

    localStorage.setItem("occupiedSeats", JSON.stringify(occupied));

    document.getElementById("seatMessage").innerText =
        "🎉 Réservation confirmée : places " + selectedSeats.join(", ");

    selectedSeats = [];
    createSeats();
}

