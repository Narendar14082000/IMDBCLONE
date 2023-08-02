const apiKey = '84e110f5';
 // Get the content container element
const contentContainer = document.getElementById("content");

// Fetch movie details from the OMDB API
async function fetchMovieDetails(imdbID) {
    const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;
    // Send a request to the API URL
    const response = await fetch(apiUrl);
     // Parse the response data as JSON
    const data = await response.json();
    // Return the movie details object
    return data;
}

// Display movie details
function displayMovieDetails(movie) {
    contentContainer.innerHTML = ` <!-- Display the movie details in a card -->
        <div class="card">
            <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title} Poster">
            <div class="card-body">
                <h5 class="card-title">${movie.Title}</h5>
                <p class="card-text"><b>IMDB Rating:</b> ${movie.imdbRating}</p>
                <p class="card-text"><b>Year:</b> ${movie.Year}</p>
                <p class="card-text"><b>Country:</b> ${movie.Country}</p>
                <p class="card-text"><b>Language:</b> ${movie.Language}</p>
                <p class="card-text"><b>Released:</b> ${movie.Released}</p>
                <p class="card-text"><b>Genre:</b> ${movie.Genre}</p>
                <p class="card-text"><b>Run Time:</b> ${movie.Runtime}</p>
                <p class="card-text"><b>Actors:</b> ${movie.Actors}</p>
                <p class="card-text"><b>Director:</b> ${movie.Director}</p>   
                <p class="card-text"><b>Writer:</b> ${movie.Writer}</p>   
                <p class="card-text"><b>Plot:</b> ${movie.Plot}</p>
                <p class="card-text"><b>Awards:</b> ${movie.Awards}</p>
                <p class="card-text"><b>Rated:</b> ${movie.Rated}</p>               
            </div>
        </div>
    `;
}

// Retrieve IMDb ID from query parameter
function getImdbIDFromQuery() {
     // Get the "imdbID" query parameter from the URL
    const queryParams = new URLSearchParams(window.location.search);
    // Return the IMDb ID
    return queryParams.get("imdbID");
}

// Initialize movie details page
async function initialize() {
    // Get the IMDb ID from the query parameter
    const imdbID = getImdbIDFromQuery();
    // Check if IMDb ID exists
    if (imdbID) {
        // Fetch movie details
        const movieDetails = await fetchMovieDetails(imdbID);
        // Display fetched movie details
        displayMovieDetails(movieDetails);
    } else {
        // Display message when IMDb ID is missing
        contentContainer.innerHTML = "No movie details available.";
    }
}

initialize();