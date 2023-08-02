// Define API key and DOM elements
const apiKey = '84e110f5';
const contentContainer = document.getElementById("content");
const searchBar = document.getElementById("searchBar");

// Fetch movie data from the OMDB API
async function fetchMovies(searchTerm) {
    const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`;
    const response = await fetch(apiUrl); // Send a request to the API URL
    const data = await response.json(); // Parse the response data as JSON
    return data.Search || []; // Return the array of movies from the API response
}

// Display movies
function displayMovies(movieList) {
    contentContainer.innerHTML = ""; // Clear previous content in the container
    movieList.forEach(movie => {
        const movieCard = document.createElement("div"); // Create a new <div> element
        movieCard.classList.add("movie-card", "mb-3"); // Add CSS classes to the new <div>
        movieCard.innerHTML = `
            <div class="card"> <!-- Create a card for the movie -->
                <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title} Poster"> <!-- Movie poster -->
                <div class="card-body"> <!-- Card body with movie details -->
                    <h5 class="card-title">${movie.Title}</h5> <!-- Movie title -->
                    <p class="card-text">Year: ${movie.Year}</p> <!-- Movie year -->
                    <button class="btn btn-outline-success add-favorite" data-imdbid="${movie.imdbID}">Add to Favorites</button> <!-- Add to Favorites button -->
                    <a href="movie.html?imdbID=${movie.imdbID}" class="btn btn-outline-info">View Details</a> <!-- View Details button -->
                </div>
            </div>
        `;
        contentContainer.appendChild(movieCard); // Append the movie card to the content container
    });

    // Attach event listeners to the "Add to Favorites" buttons
    const favoriteButtons = document.querySelectorAll(".add-favorite");
    favoriteButtons.forEach(button => {
        button.addEventListener("click", addToFavorites); // Attach click event listener
    });
}

// Event listener for adding to favorites
function addToFavorites(event) {
    const imdbID = event.target.getAttribute("data-imdbid"); // Get the IMDb ID from the button's data attribute
    const favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || []; // Get stored favorite movies from local storage or initialize empty array

    if (!favoriteMovies.includes(imdbID)) {
        favoriteMovies.push(imdbID); // Add the IMDb ID to the favorites array
        localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies)); // Store the updated favorites array in local storage
        alert("Movie added to favorites!"); // Display a message
    } else {
        alert("Movie is already in favorites.");
    }
}

// Event listener for real-time searching
searchBar.addEventListener("input", async() => {
    const searchTerm = searchBar.value.trim(); // Get the search term from the input field
    if (searchTerm === "") {
        contentContainer.innerHTML = ""; // Clear the content when search bar is empty
        return;
    }

    const movies = await fetchMovies(searchTerm); // Fetch and display movies based on the search term
    displayMovies(movies);
});

// Initial display with top movies
async function initialize() {
    const topMovies = await fetchMovies("Batman"); // Fetch top movies with "Batman" as the search term
    displayMovies(topMovies); // Display the fetched top movies
}

initialize(); // Call the initialize function to load top movies initially