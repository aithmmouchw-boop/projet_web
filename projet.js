const filmHoraires = {
    "Ratatouille": ["10:00", "14:00", "17:00"],
    "Inception": ["12:00", "18:00", "21:00"],
    "Titanic": ["09:00", "15:00", "20:00"],
    "The Dark Knight": ["11:00", "16:00", "20:00"],
    "Forrest Gump": ["10:00", "14:00", "18:00"],
    "Interstellar": ["12:00", "16:00", "20:00"],
    "Avatar": ["10:00", "13:00", "17:00", "21:00"],
    "Joker": ["11:00", "15:00", "19:00"],
    "The Godfather": ["10:00", "14:00", "18:00"],
    "Pulp Fiction": ["12:00", "16:00", "20:00"],
    "Gladiator": ["09:00", "13:00", "17:00", "21:00"],
    "The Avengers": ["11:00", "15:00", "19:00", "22:00"],
    "Wonder Woman": ["10:00", "14:00", "18:00"],
    "Toy Story 4": ["09:00", "12:00", "15:00", "18:00"],
    "The Lion King": ["10:00", "13:00", "16:00", "19:00"],
    "Deadpool": ["11:00", "14:00", "18:00", "21:00"],
    "Finding Nemo": ["09:00", "12:00", "15:00", "18:00"],
    "The Incredibles": ["10:00", "13:00", "16:00", "19:00"],
    "Avengers: Endgame": ["11:00", "15:00", "19:00", "22:00"],
    "Parasite": ["12:00", "16:00", "20:00"],
    "Shutter Island": ["10:00", "14:00", "18:00"],
    "The Matrix": ["11:00", "15:00", "19:00", "22:00"],
    "La La Land": ["09:00", "13:00", "17:00", "20:00"],
    "Fight Club": ["10:00", "14:00", "18:00", "21:00"],
    "The Shawshank Redemption": ["09:00", "13:00", "17:00"],
    "Black Panther": ["11:00", "15:00", "19:00", "22:00"],
    "Doctor Strange": ["10:00", "14:00", "18:00", "21:00"],
    "Coco": ["09:00", "12:00", "15:00", "18:00"],
    "The Wolf of Wall Street": ["11:00", "15:00", "19:00"],
    "Django Unchained": ["10:00", "14:00", "18:00", "21:00"]
};

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
const seatGrid = document.getElementById("seatGrid");
let selectedSeats = [];
let currentSessionKey = "";

/* ===================== NAVIGATION ===================== */
function showSection(id){
    document.querySelectorAll(".section").forEach(s => s.style.display = "none");
    document.getElementById(id).style.display = "block";
}
function showForm(){ document.getElementById("reservationForm").style.display = "block"; }
// Planning automatique des heures pour tous les films
const horaires = ["09:00", "12:00", "15:00", "18:00", "21:00"];

// Remplit le select des heures en fonction du film choisi
function updateHeureSelect() {
    const heureSelect = document.getElementById("heureSelect");
    heureSelect.innerHTML = ""; // vider avant de remplir
    horaires.forEach(h => {
        const option = document.createElement("option");
        option.value = h;
        option.textContent = h;
        heureSelect.appendChild(option);
    });
}
// Met à jour le select des heures en fonction du film choisi
function updateHeureSelect() {
    const film = filmSelect.value;
    const heureSelect = document.getElementById("heureSelect");
    heureSelect.innerHTML = ""; // vide avant de remplir

    if(filmHoraires[film]){
        filmHoraires[film].forEach(h => {
            const option = document.createElement("option");
            option.value = h;
            option.textContent = h;
            heureSelect.appendChild(option);
        });
    }
}

// Quand le film change, mettre à jour automatiquement les horaires
filmSelect.addEventListener("change", updateHeureSelect);


// Quand le film change, on met à jour les heures
filmSelect.addEventListener("change", updateHeureSelect);


/* ===================== RESERVATION ===================== */
function reserver(){
    const nom = document.getElementById("nom").value.trim();
    const places = parseInt(document.getElementById("places").value);
    const film = filmSelect.value;
    const heure = document.getElementById("heureSelect").value;

    if(!nom || !places || !film || !heure){
        document.getElementById("message").innerText="Veuillez remplir tous les champs.";
        return;
    }

    // clé unique pour la séance film+heure
    const currentSessionKey = film + "_" + heure;

    // récupère toutes les réservations existantes
    let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    reservations.push({nom, film, heure, places});
    localStorage.setItem("reservations", JSON.stringify(reservations));

    // récupère les sièges déjà occupés pour cette séance
    let allOccupied = JSON.parse(localStorage.getItem("occupiedSeats")) || {};
    if(!allOccupied[currentSessionKey]) allOccupied[currentSessionKey] = [];
    // pour le moment on ne réserve pas de sièges précis, on met un nombre fictif
    allOccupied[currentSessionKey] = allOccupied[currentSessionKey].concat(Array.from({length: places}, (_,i)=>i+1+allOccupied[currentSessionKey].length));
    localStorage.setItem("occupiedSeats", JSON.stringify(allOccupied));

    document.getElementById("message").innerText = `🎉 ${nom}, réservation confirmée pour "${film}" à ${heure} (${places} place(s))`;

    updateCount();
    updateDashboard();
    showSection("seats");
    createSeats();
}


/* ===================== SEATS ===================== */
function createSeats(){
    seatGrid.innerHTML="";
    const allOccupied = JSON.parse(localStorage.getItem("occupiedSeats"))||{};
    const currentSessionKey = filmSelect.value + "_" + document.getElementById("heureSelect").value;
    const occupied = allOccupied[currentSessionKey] || [];

    for(let i=1;i<=40;i++){
        const seat = document.createElement("div");
        seat.classList.add("seat");
        if(occupied.includes(i)) seat.classList.add("occupied");
        seat.innerText=i;
        seat.onclick = ()=>toggleSeat(i, seat);
        seatGrid.appendChild(seat);
    }
}


function toggleSeat(number, seat){
    if(seat.classList.contains("occupied")) return;
    seat.classList.toggle("selected");
    if(selectedSeats.includes(number)) selectedSeats = selectedSeats.filter(n=>n!==number);
    else selectedSeats.push(number);
}

function confirmSeats(){
    if(selectedSeats.length===0){
        document.getElementById("seatMessage").innerText="Veuillez sélectionner au moins une place.";
        return;
    }

    let allOccupied = JSON.parse(localStorage.getItem("occupiedSeats"))||{};
    let occupied = allOccupied[currentSessionKey]||[];
    occupied = occupied.concat(selectedSeats);
    allOccupied[currentSessionKey]=occupied;
    localStorage.setItem("occupiedSeats", JSON.stringify(allOccupied));

    document.getElementById("seatMessage").innerText="🎉 Places réservées : "+selectedSeats.join(", ");
    selectedSeats=[]; 
    createSeats(); 
    updateDashboard(); 
    updateChart();
}

/* ===================== DASHBOARD ===================== */
function updateCount(){
    const reservations = JSON.parse(localStorage.getItem("reservations"))||[];
    document.getElementById("count").innerText=reservations.length;
}

let chartInstance=null;
function updateDashboard(){
    document.getElementById("dashFilms").innerText = films.length;

    const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    document.getElementById("dashReservations").innerText = reservations.length;

    // Total de places réservées
    const totalPlaces = reservations.reduce((sum,r)=>sum + r.places, 0);
    document.getElementById("dashSeats").innerText = totalPlaces;

    if(reservations.length > 0){
        const last = reservations[reservations.length - 1];
        document.getElementById("lastReservation").innerText = `${last.nom} – ${last.film} (${last.places} places) à ${last.heure}`;
    }
}


function updateChart(){
    const reservations = JSON.parse(localStorage.getItem("reservations"))||[];
    const canvas=document.getElementById("filmsChart");
    const ctx=canvas.getContext("2d");

    if(reservations.length===0){
        if(chartInstance){ chartInstance.destroy(); chartInstance=null; }
        ctx.clearRect(0,0,canvas.width,canvas.height);
        return;
    }

    const placesPerFilm={};
    reservations.forEach(r=>{ placesPerFilm[r.film]=(placesPerFilm[r.film]||0)+r.places; });

    if(chartInstance){ chartInstance.destroy(); }

    chartInstance=new Chart(ctx,{
        type:'bar',
        data:{
            labels:Object.keys(placesPerFilm),
            datasets:[{
                label:'Places réservées',
                data:Object.values(placesPerFilm),
                backgroundColor:'#1fd8fdff',
                borderWidth:1
            }]
        },
        options:{ responsive:true, scales:{ y:{ beginAtZero:true } } }
    });
}

/* ===================== THEME ===================== */
function toggleTheme(){ 
    document.body.classList.toggle("dark"); 
    document.body.classList.toggle("light"); 
}

/* ===================== OMDB ===================== */
async function fetchMovieDetails(title){
    try{
        const apiKey="b159f5ba";
        const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`);
        const data = await response.json();
        if(data.Response==="False") return null;
        return data;
    }catch{ return null; }
}

async function updateDashboardWithAPI(){
    const dashboardAPI=document.getElementById("dashAPI"); 
    dashboardAPI.innerHTML="<p>Chargement...</p>";

    for(let film of films){
        const details = await fetchMovieDetails(film.title);
        dashboardAPI.innerHTML += `
            <p>🎬 <strong>${film.title}</strong> – IMDb: ${details?.imdbRating||"N/A"} – Réalisateur: ${details?.Director||"N/A"}</p>
        `;
    }
}

/* ===================== RESET ===================== */
function resetAll(){
    if(!confirm("Voulez-vous vraiment tout réinitialiser ?")) return;
    localStorage.removeItem("reservations");
    localStorage.removeItem("occupiedSeats");
    updateCount(); 
    updateDashboard(); 
    updateChart();
    createSeats();
    document.getElementById("lastReservation").innerText="—";
    alert("✅ Données réinitialisées avec succès !");
}

/* ===================== INIT ===================== */
async function afficherFilms(){
    moviesContainer.innerHTML="";
    filmSelect.innerHTML="";

    for(let film of films){
        const details = await fetchMovieDetails(film.title);
        let poster = details?.Poster && details.Poster!=="N/A"? details.Poster : "https://via.placeholder.com/300x450?text=No+Image";

        // Affichage des horaires sur la carte du film
        let horaires = filmHoraires[film.title]?.join(", ") || "Non défini";

        moviesContainer.innerHTML+=`
            <div class="movie">
                <img src="${poster}" alt="${film.title}">
                <p>${film.title}</p>
                <small>${film.genre}</small>
                <small>⭐ IMDb: ${details?.imdbRating||"N/A"}</small>
                <small>🕒 Horaires: ${horaires}</small>
            </div>
        `;
        filmSelect.innerHTML+=`<option value="${film.title}">${film.title} - ${film.genre}</option>`;
    }

    updateHeureSelect(); // met à jour automatiquement le premier film
}


updateCount();
updateChart();
updateDashboard();
updateDashboardWithAPI();
afficherFilms();
showSection("films");
