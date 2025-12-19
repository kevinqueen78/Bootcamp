// API Keys (replace with your actual keys)
const TMDB_API_KEY = "f7fcc56fa9f7132c7feb49e1e2885d02"; // Get from https://www.themoviedb.org/

// Dog API
async function getDogImage() {
    const output = document.getElementById("dog-output");
    try {
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        const data = await response.json();
        output.innerHTML = `<img src="${data.message}" alt="Random Dog" style="max-width: 100%;">`;
    } catch (error) {
        output.innerHTML = "Error fetching dog image.";
    }
}

// Cat API
async function getCatImage() {
    const output = document.getElementById("cat-output");
    try {
        const response = await fetch("https://api.thecatapi.com/v1/images/search");
        const data = await response.json();
        output.innerHTML = `<img src="${data[0].url}" alt="Random Cat" style="max-width: 100%;">`;
    } catch (error) {
        output.innerHTML = "Error fetching cat image.";
    }
}

// Weather API (using wttr.in for free weather)
async function getWeather() {
    const output = document.getElementById("weather-output");
    try {
        const response = await fetch("https://wttr.in?format=3");
        const data = await response.text();
        output.innerHTML = `<p>${data}</p>`;
    } catch (error) {
        output.innerHTML = "Error fetching weather.";
    }
}

// Currency API
async function getExchangeRates() {
    const output = document.getElementById("currency-output");
    try {
        const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
        const data = await response.json();
        const rates = Object.entries(data.rates).slice(0, 5).map(([key, value]) => `${key}: ${value}`).join('<br>');
        output.innerHTML = `<p>USD Exchange Rates:<br>${rates}</p>`;
    } catch (error) {
        output.innerHTML = "Error fetching exchange rates.";
    }
}

// Movies API
async function getMovies() {
    const output = document.getElementById("movies-output");
    try {
        const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`);
        const data = await response.json();
        const movies = data.results.slice(0, 3).map(movie => movie.title).join('<br>');
        output.innerHTML = `<p>Trending Movies:<br>${movies}</p>`;
    } catch (error) {
        output.innerHTML = "Error fetching movies. Please check your TMDB API key.";
    }
}

// GitHub API
async function getGitHubUser() {
    const output = document.getElementById("github-output");
    try {
        const response = await fetch("https://api.github.com/users/octocat");
        const data = await response.json();
        output.innerHTML = `<p>Name: ${data.name}<br>Followers: ${data.followers}<br>Repos: ${data.public_repos}</p>`;
    } catch (error) {
        output.innerHTML = "Error fetching GitHub user.";
    }
}

// Joke API
async function getJoke() {
    const output = document.getElementById("joke-output");
    try {
        const response = await fetch("https://icanhazdadjoke.com/", { headers: { 'Accept': 'application/json' } });
        const data = await response.json();
        output.innerHTML = `<p>${data.joke}</p>`;
    } catch (error) {
        output.innerHTML = "Error fetching joke.";
    }
}

// Public APIs
async function getPublicApiInfo() {
    const output = document.getElementById("publicapi-output");
    try {
        const response = await fetch("https://api.publicapis.org/random");
        const data = await response.json();
        const api = data.entries[0];
        output.innerHTML = `<p><strong>${api.API}</strong>: ${api.Description}<br>Category: ${api.Category}</p>`;
    } catch (error) {
        output.innerHTML = "Error fetching public API info.";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialization if needed
});