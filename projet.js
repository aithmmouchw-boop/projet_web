/******************** HORAIRES ********************/
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

/******************** FILMS ********************/
let films = JSON.parse(localStorage.getItem("films")) || [
  { title: "Ratatouille", genre: "Animation" },
  { title: "Inception", genre: "Action / Sci-Fi" },
  { title: "Titanic", genre: "Romance / Drame" },
  { title: "The Dark Knight", genre: "Action / Crime" },
  { title: "Forrest Gump", genre: "Drame / Romance" },
  { title: "Interstellar", genre: "Sci-Fi / Drame" },
  { title: "Avatar", genre: "Action / Sci-Fi / Adventure" },
  { title: "Joker", genre: "Drame / Thriller" },
  { title: "The Godfather", genre: "Crime / Drame" },
  { title: "Pulp Fiction", genre: "Crime / Drame" },
  { title: "Gladiator", genre: "Action / Drame / Adventure" },
  { title: "The Avengers", genre: "Action / Adventure / Sci-Fi" },
  { title: "Wonder Woman", genre: "Action / Adventure / Fantasy" },
  { title: "Toy Story 4", genre: "Animation / Adventure / Comedy" },
  { title: "The Lion King", genre: "Animation / Drame / Adventure" },
  { title: "Deadpool", genre: "Action / Comedy" },
  { title: "Finding Nemo", genre: "Animation / Adventure / Comedy" },
  { title: "The Incredibles", genre: "Animation / Action / Adventure" },
  { title: "Avengers: Endgame", genre: "Action / Adventure / Sci-Fi" },
  { title: "Parasite", genre: "Thriller / Drame" },
  { title: "Shutter Island", genre: "Thriller / Drame" },
  { title: "The Matrix", genre: "Action / Sci-Fi" },
  { title: "La La Land", genre: "Romance / Musical" },
  { title: "Fight Club", genre: "Drame / Thriller" },
  { title: "The Shawshank Redemption", genre: "Drame" },
  { title: "Black Panther", genre: "Action / Adventure / Sci-Fi" },
  { title: "Doctor Strange", genre: "Action / Fantasy / Sci-Fi" },
  { title: "Coco", genre: "Animation / Famille / Musical" },
  { title: "The Wolf of Wall Street", genre: "Drame / Biographie" },
  { title: "Django Unchained", genre: "Western / Drame / Action" }
];


let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
let selectedSeats = [];
let currentSessionKey = "";
let chart;

/******************** NAVIGATION ********************/
function showSection(id){
  document.querySelectorAll(".section").forEach(s => s.style.display="none");
  document.getElementById(id).style.display="block";
}

function toggleTheme(){
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
}

function showForm(){
  document.getElementById("reservationForm").style.display="block";
}

/******************** FILMS ********************/
async function renderFilms(list = films){
  const container = document.getElementById("moviesContainer");
  const filmSelect = document.getElementById("filmSelect");

  container.innerHTML = "";
  filmSelect.innerHTML = "";

  for(let index = 0; index < list.length; index++){
    const film = list[index];

    // 🔹 جلب تفاصيل الفيلم من API
    const details = await fetchMovieDetails(film.title);

    // 🔹 poster أو صورة بديلة
    const poster = details?.Poster && details.Poster !== "N/A"
      ? details.Poster
      : "https://via.placeholder.com/300x450?text=No+Poster";

    container.innerHTML += `
      <div class="movie">
        <img src="${poster}" alt="${film.title}">
        <p>${film.title}</p>
        <small>${film.genre}</small>
        <small>🕒 ${filmHoraires[film.title]?.join(", ") || "N/A"}</small>

        <div class="movie-actions">
          <button onclick="showFilmDetails(${index})">ℹ️</button>
          <button onclick="editFilm(${index})">✏️</button>
          <button onclick="deleteFilm(${index})">🗑️</button>
        </div>
      </div>
    `;

    filmSelect.innerHTML += `<option value="${film.title}">${film.title}</option>`;
  }

  updateHeureSelect();
}

//******************** FILM DETAILS ********************/
function showFilmDetails(index){
  const film = films[index];
  alert(`
🎬 Titre : ${film.title}
🎭 Genre : ${film.genre}
🕒 Horaires : ${filmHoraires[film.title]?.join(", ") || "N/A"}
  `);
}


function addFilm(){
  const title = newFilmTitle.value.trim();
  const genre = newFilmGenre.value.trim();
  if(!title || !genre) return alert("Champs requis");

  films.push({title, genre});
  localStorage.setItem("films", JSON.stringify(films));
  renderFilms();
  updateDashboard();
}

function deleteFilm(index){
  if(!confirm("Supprimer ce film ?")) return;
  films.splice(index,1);
  localStorage.setItem("films", JSON.stringify(films));
  renderFilms();
  updateDashboard();
}

/******************** HORAIRES ********************/
function updateHeureSelect(){
  const film = filmSelect.value;
  const heureSelect = document.getElementById("heureSelect");
  heureSelect.innerHTML = "";

  (filmHoraires[film] || ["10:00","14:00","18:00"]).forEach(h=>{
    heureSelect.innerHTML += `<option value="${h}">${h}</option>`;
  });
}
// 🔄 Réinitialiser le formulaire après confirmation
document.getElementById("nom").value = "";
document.getElementById("places").value = "";
filmSelect.selectedIndex = 0;
updateHeureSelect();

/******************** RÉSERVATION ********************/
function reserver(){
  const nomInput = document.getElementById("nom");
  const placesInput = document.getElementById("places");
  const filmInput = filmSelect;
  const heureInput = heureSelect;

  const nom = nomInput.value.trim();
  const places = parseInt(placesInput.value);
  const film = filmInput.value;
  const heure = heureInput.value;

  if(!nom || !places || !film || !heure){
    message.innerText="❌ Champs invalides";
    return;
  }

  currentSessionKey = film + "_" + heure;

  reservations.push({ nom, film, heure, places });
  localStorage.setItem("reservations", JSON.stringify(reservations));

  message.innerText = "✅ Réservation confirmée";

  renderReservations();
  updateDashboard();
  showSection("seats");
  createSeats();

  /* ✅ RESET DES CHAMPS POUR NOUVELLE RÉSERVATION */
  nomInput.value = "";
  placesInput.value = "";
  filmInput.selectedIndex = 0;
  updateHeureSelect();
}

function renderReservations(){
  const list = document.getElementById("reservationList");
  list.innerHTML = "";

  reservations.forEach((r,i)=>{
    list.innerHTML += `
      <div>
        ${r.nom} - ${r.film} (${r.heure}) - ${r.places}
        <button onclick="deleteReservation(${i})">🗑️</button>
      </div>
    `;
  });

  count.innerText = reservations.length;
}

function deleteReservation(i){
  if(!confirm("Supprimer ?")) return;
  reservations.splice(i,1);
  localStorage.setItem("reservations", JSON.stringify(reservations));
  renderReservations();
  updateDashboard();
}

/******************** SEATS ********************/
function createSeats(){
  seatGrid.innerHTML="";
  const allOccupied = JSON.parse(localStorage.getItem("occupiedSeats"))||{};
  const occupied = allOccupied[currentSessionKey]||[];

  for(let i=1;i<=40;i++){
    const seat = document.createElement("div");
    seat.className="seat";
    if(occupied.includes(i)) seat.classList.add("occupied");
    seat.innerText=i;
    seat.onclick=()=>toggleSeat(i,seat);
    seatGrid.appendChild(seat);
  }
}

function toggleSeat(n, seat){
  if(seat.classList.contains("occupied")) return;
  seat.classList.toggle("selected");
  selectedSeats.includes(n) ? selectedSeats=selectedSeats.filter(x=>x!==n) : selectedSeats.push(n);
}

function confirmSeats(){
  if(!selectedSeats.length) return seatMessage.innerText="Sélectionnez des places";

  let allOccupied = JSON.parse(localStorage.getItem("occupiedSeats"))||{};
  allOccupied[currentSessionKey] = (allOccupied[currentSessionKey]||[]).concat(selectedSeats);
  localStorage.setItem("occupiedSeats", JSON.stringify(allOccupied));

  seatMessage.innerText="🎉 Places: "+selectedSeats.join(", ");
  selectedSeats=[];
  createSeats();
}
//******************** TRI FILMS ********************/
function sortFilmsAZ(){
  films.sort((a,b)=>a.title.localeCompare(b.title));
  renderFilms();
}

function sortFilmsZA(){
  films.sort((a,b)=>b.title.localeCompare(a.title));
  renderFilms();
}
//******************** ÉDITION FILMS ********************/
function editFilm(index){
  const newTitle = prompt("Nouveau titre :", films[index].title);
  const newGenre = prompt("Nouveau genre :", films[index].genre);
  if(!newTitle || !newGenre) return;

  films[index].title = newTitle;
  films[index].genre = newGenre;

  localStorage.setItem("films", JSON.stringify(films));
  renderFilms();
  updateDashboard();
}


/******************** DASHBOARD ********************/
function updateDashboard(){
  dashFilms.innerText = films.length;
  dashReservations.innerText = reservations.length;
  dashSeats.innerText = reservations.reduce((s,r)=>s+r.places,0);

  lastReservation.innerText = reservations.length ?
    `${reservations.at(-1).nom} - ${reservations.at(-1).film}` :
    "Aucune réservation";

  renderChart();
}

function renderChart(){
  const stats={};
  reservations.forEach(r=> stats[r.film]=(stats[r.film]||0)+r.places);

  if(chart) chart.destroy();

  const ctx = filmsChart.getContext("2d");
  chart = new Chart(ctx,{
    type:"bar",
    data:{labels:Object.keys(stats), datasets:[{label:"Places", data:Object.values(stats)}]}
  });
}
//******************** RECHERCHE FILMS ********************/
function searchFilm(){
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const filtered = films.filter(f =>
    f.title.toLowerCase().includes(keyword) ||
    f.genre.toLowerCase().includes(keyword)
  );
  renderFilms(filtered);
}

/******************** OMDB API ********************/
async function fetchMovieDetails(title){
  try{
    const res = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=b159f5ba`);
    const data = await res.json();
    if(data.Response==="False") return null;
    return data;
  }catch{ return null; }
}

async function updateDashboardWithAPI(){
  dashAPI.innerHTML="Chargement...";
  for(let film of films){
    const d = await fetchMovieDetails(film.title);
    dashAPI.innerHTML += `<p>${film.title} ⭐ ${d?.imdbRating||"N/A"}</p>`;
  }
}

/******************** RESET ********************/
function resetAll(){
  if(!confirm("Tout supprimer ?")) return;
  localStorage.clear();
  reservations=[];
  renderReservations();
  updateDashboard();
}

/******************** INIT ********************/
renderFilms();
renderReservations();
updateDashboard();
updateDashboardWithAPI();
showSection("films");