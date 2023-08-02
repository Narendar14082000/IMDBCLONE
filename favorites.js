const apiKey = '84e110f5';
const contentContainer = document.getElementById("content");

// Fetch movie details from the OMDB API
async function fetchMovieDetails(imdbID) {
    const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;
    const response = await fetch(apiUrl);// Send a request to the API URL
    const data = await response.json();// Parse the response data as JSON
    return data;// Return the movie details object
}

// Display movie details
function displayMovieDetails(movie) {
    contentContainer.innerHTML = `
        <div class="card">
            <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title} Poster">
            <div class="card-body">
                <h5 class="card-title">${movie.Title}</h5>
                <p class="card-text">Year: ${movie.Year}</p>
                <p class="card-text">Rated: ${movie.Rated}</p>
                <p class="card-text">Director: ${movie.Director}</p>
               
                <button class="btn btn-danger remove-favorite" data-imdbid="${movie.imdbID}">Remove</button>
            </div>
        </div>
    `;
}

// Retrieve IMDb ID from query parameter
function getImdbIDFromQuery() {
    // Get the "imdbID" query parameter from the URL
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get("imdbID"); // Return the IMDb ID
}

// Get favorite movies from local storage
function getFavoriteMovies() {
     // Retrieve the favorite movies array from local storage or return an empty array
    return JSON.parse(localStorage.getItem("favoriteMovies")) || [];
}

// Display favorite movies
async function displayFavoriteMovies() {
    // Get the list of favorite movies
    const favoriteMovies = getFavoriteMovies();
    // Clear previous content
    contentContainer.innerHTML = "";
  // Loop through favorite movies and display their details
    for (const imdbID of favoriteMovies) {
         // Fetch movie details for each IMDb ID
        const movieDetails = await fetchMovieDetails(imdbID);
        // Create a new <div> element for the movie card
        const movieCard = document.createElement("div");
        // Add CSS classes to the movie card
        movieCard.classList.add("movie-card", "mb-3");
        movieCard.innerHTML = ` <!-- Create a card displaying movie details -->
            <div class="card">
                <img src="${movieDetails.Poster}" class="card-img-top" alt="${movieDetails.Title} Poster">
                <div class="card-body">
                    <h5 class="card-title">${movieDetails.Title}</h5>
                    <p class="card-text">Year: ${movieDetails.Year}</p>
                    <p class="card-text">Rated: ${movieDetails.Rated}</p>
                    <p class="card-text">Director: ${movieDetails.Director}</p>
                    <button class="btn btn-danger remove-favorite" data-imdbid="${movieDetails.imdbID}">Remove from Favorites</button>
                </div>
            </div>
        `;
        contentContainer.appendChild(movieCard);// Append the movie card to the content container
    }

    // Attach event listeners to the "Remove from Favorites" buttons
    const removeButtons = document.querySelectorAll(".remove-favorite");
    removeButtons.forEach(button => {
        button.addEventListener("click", removeFromFavorites);
    });
}

// Event listener for removing from favorites
function removeFromFavorites(event) {
    // Get the IMDb ID from the button's data attribute
    const imdbID = event.target.getAttribute("data-imdbid");
    // Get the list of favorite movies
    let favoriteMovies = getFavoriteMovies();
     // If the IMDb ID exists in the list of favorites, remove it and update local storage
    if (favoriteMovies.includes(imdbID)) {
        // Filter out the IMDb ID
        favoriteMovies = favoriteMovies.filter(id => id !== imdbID);
        //Update local storage
        localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
        // Display a message
        alert("Movie removed from favorites!");
        displayFavoriteMovies(); // Refresh the displayed favorite movies
    }
}

// Initialize favorite movies page
function initialize() {
    // Display the list of favorite movies
    displayFavoriteMovies();
}
// Call the initialization function to load favorite movies
initialize();
