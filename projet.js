/* ===================== FILMS ===================== */
let films = [

    { title: "Ratatouille", genre: "Animation", available: true },
    { title: "Inception", genre: "Action / Sci-Fi", available: true },
    { title: "Titanic", genre: "Romance / Drame", available: true },
    { title: "The Dark Knight", genre: "Action / Crime", available: true },
    { title: "Forrest Gump", genre: "Drame / Romance", available: true },
    { title: "Interstellar", genre: "Sci-Fi / Drame", available: true },
    { title: "Avatar", genre: "Action / Sci-Fi / Adventure", available: true },
    { title: "Joker", genre: "Drame / Thriller", available: true },
    { title: "The Godfather", genre: "Crime / Drame", available: true },
    { title: "Pulp Fiction", genre: "Crime / Drame", available: true },
    { title: "Gladiator", genre: "Action / Drame / Adventure", available: true },
    { title: "The Avengers", genre: "Action / Adventure / Sci-Fi", available: true },
    { title: "Wonder Woman", genre: "Action / Adventure / Fantasy", available: true },
    { title: "Toy Story 4", genre: "Animation / Adventure / Comedy", available: true },
    { title: "The Lion King", genre: "Animation / Drame / Adventure", available: true },
    { title: "Deadpool", genre: "Action / Comedy", available: true },
    { title: "Finding Nemo", genre: "Animation / Adventure / Comedy", available: true },
    { title: "The Incredibles", genre: "Animation / Action / Adventure", available: true },
    { title: "Avengers: Endgame", genre: "Action / Adventure / Sci-Fi", available: true },
    { title: "Parasite", genre: "Thriller / Drame", available: true },
    { title: "Shutter Island", genre: "Thriller / Drame", available: true },
    { title: "The Matrix", genre: "Action / Sci-Fi", available: true },
    { title: "La La Land", genre: "Romance / Musical", available: true },
    { title: "Fight Club", genre: "Drame / Thriller", available: true },
    { title: "The Shawshank Redemption", genre: "Drame", available: true },
    { title: "Black Panther", genre: "Action / Adventure / Sci-Fi", available: true },
    { title: "Doctor Strange", genre: "Action / Fantasy / Sci-Fi", available: true },
    { title: "Coco", genre: "Animation / Famille / Musical", available: true },
    { title: "The Wolf of Wall Street", genre: "Drame / Biographie", available: true },
    { title: "Django Unchained", genre: "Western / Drame / Action", available: true }

];
const moviesContainer = document.getElementById("moviesContainer");
const filmSelect = document.getElementById("filmSelect");



/* ===================== NAVIGATION ===================== */
function showSection(id) {
    document.querySelectorAll(".section").forEach(s => s.style.display = "none");
    document.getElementById(id).style.display = "block";
}

function showForm() { document.getElementById("reservationForm").style.display = "block"; }

/* ===================== RESERVATION ===================== */
function reserver() {
    const nom = document.getElementById("nom").value.trim();
    const places = parseInt(document.getElementById("places").value);
    const film = filmSelect.value;

    if (!nom || !places || !film) {
        document.getElementById("message").innerText = "Veuillez remplir tous les champs.";
        return;
    }

    let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    reservations.push({ nom, film, places });
    localStorage.setItem("reservations", JSON.stringify(reservations));

    document.getElementById("message").innerText =
        `Merci ${nom}, votre réservation pour "${film}" (${places} place(s)) est confirmée ✅`;

    updateCount();
    updateDashboard();
    showSection("seats");
    createSeats();
}

function updateCount() {
    const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    document.getElementById("count").innerText = reservations.length;
}

/* ===================== THEME ===================== */
function toggleTheme() {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");
}

/* ===================== SALLE ===================== */
const seatGrid = document.getElementById("seatGrid");
let selectedSeats = [];

function createSeats() {
    seatGrid.innerHTML = "";
    let occupied = JSON.parse(localStorage.getItem("occupiedSeats")) || [];

    for (let i = 1; i <= 40; i++) {
        const seat = document.createElement("div");
        seat.classList.add("seat");
        if (occupied.includes(i)) seat.classList.add("occupied");

        seat.innerText = i;
        seat.onclick = () => toggleSeat(i, seat);
        seatGrid.appendChild(seat);
    }
}

function toggleSeat(number, seat) {
    if (seat.classList.contains("occupied")) return;
    seat.classList.toggle("selected");

    if (selectedSeats.includes(number)) selectedSeats = selectedSeats.filter(n => n !== number);
    else selectedSeats.push(number);
}

function confirmSeats() {
    if (selectedSeats.length === 0) {
        document.getElementById("seatMessage").innerText = "Veuillez sélectionner au moins une place.";
        return;
    }

    let occupied = JSON.parse(localStorage.getItem("occupiedSeats")) || [];
    occupied = occupied.concat(selectedSeats);
    localStorage.setItem("occupiedSeats", JSON.stringify(occupied));

    document.getElementById("seatMessage").innerText = "🎉 Places réservées : " + selectedSeats.join(", ");
    selectedSeats = [];
    createSeats();
    updateChart();
    updateDashboard();
}

/* ===================== DASHBOARD LOCAL ===================== */
function updateDashboard() {
    document.getElementById("dashFilms").innerText = films.length;

    const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    document.getElementById("dashReservations").innerText = reservations.length;

    const occupied = JSON.parse(localStorage.getItem("occupiedSeats")) || [];
    document.getElementById("dashSeats").innerText = occupied.length;

    if (reservations.length > 0) {
        const last = reservations[reservations.length - 1];
        document.getElementById("lastReservation").innerText =
            `${last.nom} – ${last.film} (${last.places} places)`;
    }
}
let chartInstance=null;
function updateChart() {
    const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    const canvas = document.getElementById("filmsChart");
    const ctx = canvas.getContext("2d");

    // 🔴 S'il n'y a PLUS de réservations → supprimer le graphique
    if (reservations.length === 0) {
        if (chartInstance) {
            chartInstance.destroy();
            chartInstance = null;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
    }

    // 🟢 Calcul des places par film
    const placesPerFilm = {};
    reservations.forEach(r => {
        placesPerFilm[r.film] = (placesPerFilm[r.film] || 0) + r.places;
    });

    // Supprimer l'ancien chart avant d'en créer un nouveau
    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(placesPerFilm),
            datasets: [{
                label: 'Nombre de places réservées',
                data: Object.values(placesPerFilm),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}




/* ===================== DASHBOARD OMDB ===================== */
async function fetchMovieDetails(title) {
    try {
        const apiKey = "b159f5ba";
        const response = await fetch(
            `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`
        );
        const data = await response.json();
        if (data.Response === "False") return null;
        return data;
    } catch {
        return null;
    }
}


async function updateDashboardWithAPI() {
    const dashboardAPI = document.getElementById("dashAPI");
    dashboardAPI.innerHTML = "<p>Chargement...</p>";

    for (let film of films) {

        if (!film.apiTitle) {
            dashboardAPI.innerHTML += `
                <p>🎬 ${film.title} : Informations non disponibles</p>
            `;
            continue;
        }

        const details = await fetchMovieDetails(film.apiTitle);

        if (!details) {
            dashboardAPI.innerHTML += `
                <p>🎬 ${film.title} : ❌ Introuvable dans OMDB</p>
            `;
            continue;
        }

        dashboardAPI.innerHTML += `
            <p>
                🎬 <strong>${film.title}</strong><br>
                ⭐ IMDb : ${details.imdbRating}<br>
                🎥 Réalisateur : ${details.Director}
            </p>
        `;
    }
}
function resetAll() {
    if (!confirm("Voulez-vous vraiment tout réinitialiser ?")) return;

    localStorage.removeItem("reservations");
    localStorage.removeItem("occupiedSeats");

    updateCount();
    updateDashboard();
    updateChart();
    createSeats();

    document.getElementById("lastReservation").innerText = "—";
    alert("✅ Données réinitialisées avec succès !");
}
async function afficherFilms() {
    moviesContainer.innerHTML = "";
    filmSelect.innerHTML = "";

    for (let film of films) {
        const details = await fetchMovieDetails(film.title);

        let poster = details?.Poster && details.Poster !== "N/A"
            ? details.Poster
            : "https://via.placeholder.com/300x450?text=No+Image";

        moviesContainer.innerHTML += `
            <div class="movie">
                <img src="${poster}" alt="${film.title}">
                <p>${film.title}</p>
                <small>${film.genre}</small>
                <small>⭐ IMDb: ${details?.imdbRating || "N/A"}</small>
            </div>
        `;

        filmSelect.innerHTML += `<option value="${film.title}">${film.title} - ${film.genre}</option>`;
    }
}



/* ===================== INIT ===================== */

updateCount();
updateChart();
updateDashboard();
updateDashboardWithAPI();
afficherFilms();
showSection("films");
