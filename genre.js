const parameters =
    new URLSearchParams(
        window.location.search
    );


const genreId =
    parameters.get("genre");


const genreName =
    parameters.get("name") || "Movies";


const TMDB_BASE_URL =
    "https://api.themoviedb.org/3";


const TMDB_IMAGE_URL =
    "https://image.tmdb.org/t/p/w500";


const genreTitle =
    document.getElementById(
        "genreTitle"
    );


const genreDescription =
    document.getElementById(
        "genreDescription"
    );


const genreMovieList =
    document.getElementById(
        "genreMovieList"
    );


// =========================
// PAGE TITLE
// =========================

genreTitle.textContent =
    genreName;


document.title =
    genreName + " | CineMind";


// =========================
// DESCRIPTIONS
// =========================

const descriptions = {

    "Horror":
        "Dark, scary and intense movies for horror fans.",

    "Action":
        "Fast-paced movies full of fights, explosions and adrenaline.",

    "Adventure":
        "Explore exciting worlds, journeys and unforgettable adventures.",

    "Comedy":
        "Funny movies for when you just want to relax and laugh.",

    "Sci-Fi":
        "Explore space, technology, the future and strange new worlds.",

    "Mystery":
        "Secrets, investigations, puzzles and unexpected twists.",

    "Animation":
        "Animated stories, characters and imaginative worlds."

};


genreDescription.textContent =
    descriptions[genreName] ||
    "Discover movies from this genre.";


// =========================
// CREATE CARD
// =========================

function createMovieCard(movie) {

    const title =
        movie.title || "Unknown";


    const year =
        movie.release_date
            ? movie.release_date.substring(
                0,
                4
            )
            : "Unknown";


    const rating =
        movie.vote_average
            ? movie.vote_average.toFixed(1)
            : "N/A";


    const poster =
        movie.poster_path
            ? TMDB_IMAGE_URL +
              movie.poster_path
            : "";


    return `

        <a
            href="tmdb-movie.html?id=${movie.id}"
            class="movie-link"
        >

            <div class="movie-card">

                <div class="poster-container">

                    ${
                        poster
                            ?
                            `
                            <img
                                src="${poster}"
                                alt="${title}"
                            >
                            `
                            :
                            `
                            <div class="no-poster">
                                No poster
                            </div>
                            `
                    }


                    <div
                        class="poster-overlay"
                    ></div>


                    <div
                        class="poster-rating"
                    >
                        ⭐ ${rating}
                    </div>


                    <div
                        class="poster-play"
                    >
                        ▶
                    </div>

                </div>


                <div class="movie-info">

                    <h3>
                        ${title}
                    </h3>

                    <p class="genre">
                        ${genreName}
                    </p>


                    <div class="movie-bottom">

                        <span>
                            ${year}
                        </span>

                        <span>
                            TMDB
                        </span>

                    </div>

                </div>

            </div>

        </a>

    `;

}


// =========================
// LOAD MOVIES
// =========================

async function loadGenreMovies() {

    if (!genreId) {

        window.location.href =
            "index.html";

        return;

    }


    genreMovieList.innerHTML =
        "<p>Loading movies...</p>";


    try {

        const response =
            await fetch(

                `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=${genreId}&page=1`

            );


        if (!response.ok) {

            throw new Error(
                "Could not load genre."
            );

        }


        const data =
            await response.json();


        const movies =
            data.results.slice(0, 20);


        genreMovieList.innerHTML = "";


        if (movies.length === 0) {

            genreMovieList.innerHTML = `

                <div class="search-empty">

                    <h3>
                        No movies found
                    </h3>

                    <p>
                        Try another genre.
                    </p>

                </div>

            `;

            return;

        }


        movies.forEach(
            function(movie) {

                genreMovieList.innerHTML +=
                    createMovieCard(movie);

            }
        );


    } catch (error) {

        console.error(
            "Genre page error:",
            error
        );


        genreMovieList.innerHTML = `

            <div class="search-empty">

                <h3>
                    Could not load movies
                </h3>

                <p>
                    Please try again later.
                </p>

            </div>

        `;

    }

}


loadGenreMovies();