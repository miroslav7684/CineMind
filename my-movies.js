const manualMovies = {

    "interstellar": {
        title: "Interstellar",
        year: "2014",
        genre: "Sci-Fi • Adventure",
        rating: "⭐ 8.7",
        runtime: "2h 49m",
        poster: "image/interstellar.jpg",
        link: "movie.html?movie=interstellar",
        type: "movie"
    },

    "shutter-island": {
        title: "Shutter Island",
        year: "2010",
        genre: "Mystery • Thriller",
        rating: "⭐ 8.2",
        runtime: "2h 18m",
        poster: "image/shutter-island.jpg",
        link: "movie.html?movie=shutter-island",
        type: "movie"
    },

    "inception": {
        title: "Inception",
        year: "2010",
        genre: "Sci-Fi • Action",
        rating: "⭐ 8.8",
        runtime: "2h 28m",
        poster: "image/inception.jpg",
        link: "movie.html?movie=inception",
        type: "movie"
    }

};


// =========================
// CURRENT FILTER
// =========================

let currentFilter =
    "all";


// =========================
// STORAGE HELPERS
// =========================

function getSavedArray(name) {

    try {

        const value =
            localStorage.getItem(name);

        if (!value) {
            return [];
        }

        const parsed =
            JSON.parse(value);

        if (!Array.isArray(parsed)) {
            return [];
        }

        return parsed;

    } catch {

        return [];

    }

}


function getSavedObject(name) {

    try {

        const value =
            localStorage.getItem(name);

        if (!value) {
            return {};
        }

        const parsed =
            JSON.parse(value);

        if (
            typeof parsed !== "object" ||
            parsed === null ||
            Array.isArray(parsed)
        ) {
            return {};
        }

        return parsed;

    } catch {

        return {};

    }

}


// =========================
// LOAD STORAGE
// =========================

let watchedMovies =
    getSavedArray("watchedMovies");


let watchlistMovies =
    getSavedArray("watchlistMovies");


let watchedMoviesTMDB =
    getSavedArray("watchedMoviesTMDB");


let watchlistMoviesTMDB =
    getSavedArray("watchlistMoviesTMDB");


let tmdbMovieData =
    getSavedObject("tmdbMovieData");


let watchedTV =
    getSavedArray("watchedTV");


let watchlistTV =
    getSavedArray("watchlistTV");


let tmdbTVData =
    getSavedObject("tmdbTVData");


// =========================
// ELEMENTS
// =========================

const watchedMoviesList =
    document.getElementById(
        "watchedMoviesList"
    );


const watchlistMoviesList =
    document.getElementById(
        "watchlistMoviesList"
    );


const noWatchedMovies =
    document.getElementById(
        "noWatchedMovies"
    );


const noWatchlistMovies =
    document.getElementById(
        "noWatchlistMovies"
    );


const watchedCount =
    document.getElementById(
        "watchedCount"
    );


const watchlistCount =
    document.getElementById(
        "watchlistCount"
    );


const filterButtons =
    document.querySelectorAll(
        ".library-filter-button"
    );


// =========================
// CREATE CARD
// =========================

function createCard(
    item,
    listType,
    source,
    storageKey
) {

    if (!item) {
        return "";
    }


    const statusText =
        listType === "watched"
            ? "✓ Watched"
            : "+ Watchlist";


    const typeText =
        item.type === "tv"
            ? "📺 TV Series"
            : "🎬 Movie";


    const extraInfo =
        item.type === "tv"
            ? `${item.seasons} Seasons`
            : item.runtime;


    return `

        <div
            class="library-movie-card"
            data-content-type="${item.type}"
        >

            <a
                href="${item.link}"
                class="library-movie-link"
            >

                <div class="library-poster">

                    <img
                        src="${item.poster}"
                        alt="${item.title}"
                    >


                    <div
                        class="library-overlay"
                    ></div>


                    <span class="library-rating">

                        ${item.rating}

                    </span>


                    <span
                        class="library-status ${listType}"
                    >

                        ${statusText}

                    </span>

                </div>


                <div class="library-movie-info">

                    <p class="library-type">

                        ${typeText}

                    </p>


                    <h3>

                        ${item.title}

                    </h3>


                    <p>

                        ${item.genre}

                    </p>


                    <div class="library-meta">

                        <span>

                            ${item.year}

                        </span>


                        <span>

                            ${extraInfo}

                        </span>

                    </div>

                </div>

            </a>


            <button
                class="remove-movie-button"
                data-source="${source}"
                data-type="${listType}"
                data-key="${storageKey}"
            >

                Remove

            </button>

        </div>

    `;

}


// =========================
// MANUAL MOVIE
// =========================

function getManualMovie(key) {

    return manualMovies[key];

}


// =========================
// TMDB MOVIE
// =========================

function getTMDBMovie(key) {

    const data =
        tmdbMovieData[key];


    if (!data) {
        return null;
    }


    return {

        title:
            data.title,

        year:
            data.year,

        genre:
            data.genre,

        rating:
            data.rating,

        runtime:
            data.runtime,

        poster:
            data.poster,

        link:
            `tmdb-movie.html?id=${data.id}`,

        type:
            "movie"

    };

}


// =========================
// TV SERIES
// =========================

function getTVSeries(key) {

    const data =
        tmdbTVData[key];


    if (!data) {
        return null;
    }


    return {

        title:
            data.title,

        year:
            data.year,

        genre:
            data.genre,

        rating:
            data.rating,

        seasons:
            data.seasons,

        episodes:
            data.episodes,

        poster:
            data.poster,

        link:
            `tv.html?id=${data.id}`,

        type:
            "tv"

    };

}


// =========================
// SHOULD SHOW ITEM
// =========================

function shouldShow(item) {

    if (!item) {
        return false;
    }


    if (currentFilter === "all") {
        return true;
    }


    return item.type === currentFilter;

}


// =========================
// RENDER
// =========================

function renderLibrary() {

    watchedMoviesList.innerHTML =
        "";


    watchlistMoviesList.innerHTML =
        "";


    let visibleWatched =
        0;


    let visibleWatchlist =
        0;


    // =========================
    // MANUAL WATCHED
    // =========================

    watchedMovies.forEach(
        function(key) {

            const item =
                getManualMovie(key);


            if (shouldShow(item)) {

                watchedMoviesList.innerHTML +=
                    createCard(
                        item,
                        "watched",
                        "manual",
                        key
                    );


                visibleWatched++;

            }

        }
    );


    // =========================
    // TMDB MOVIES WATCHED
    // =========================

    watchedMoviesTMDB.forEach(
        function(key) {

            const item =
                getTMDBMovie(key);


            if (shouldShow(item)) {

                watchedMoviesList.innerHTML +=
                    createCard(
                        item,
                        "watched",
                        "movie",
                        key
                    );


                visibleWatched++;

            }

        }
    );


    // =========================
    // TV WATCHED
    // =========================

    watchedTV.forEach(
        function(key) {

            const item =
                getTVSeries(key);


            if (shouldShow(item)) {

                watchedMoviesList.innerHTML +=
                    createCard(
                        item,
                        "watched",
                        "tv",
                        key
                    );


                visibleWatched++;

            }

        }
    );


    // =========================
    // MANUAL WATCHLIST
    // =========================

    watchlistMovies.forEach(
        function(key) {

            const item =
                getManualMovie(key);


            if (shouldShow(item)) {

                watchlistMoviesList.innerHTML +=
                    createCard(
                        item,
                        "watchlist",
                        "manual",
                        key
                    );


                visibleWatchlist++;

            }

        }
    );


    // =========================
    // TMDB MOVIE WATCHLIST
    // =========================

    watchlistMoviesTMDB.forEach(
        function(key) {

            const item =
                getTMDBMovie(key);


            if (shouldShow(item)) {

                watchlistMoviesList.innerHTML +=
                    createCard(
                        item,
                        "watchlist",
                        "movie",
                        key
                    );


                visibleWatchlist++;

            }

        }
    );


    // =========================
    // TV WATCHLIST
    // =========================

    watchlistTV.forEach(
        function(key) {

            const item =
                getTVSeries(key);


            if (shouldShow(item)) {

                watchlistMoviesList.innerHTML +=
                    createCard(
                        item,
                        "watchlist",
                        "tv",
                        key
                    );


                visibleWatchlist++;

            }

        }
    );


    // =========================
    // COUNTERS
    // =========================

    watchedCount.textContent =
        visibleWatched;


    watchlistCount.textContent =
        visibleWatchlist;


    // =========================
    // EMPTY STATES
    // =========================

    if (visibleWatched === 0) {

        noWatchedMovies.style.display =
            "flex";

    } else {

        noWatchedMovies.style.display =
            "none";

    }


    if (visibleWatchlist === 0) {

        noWatchlistMovies.style.display =
            "flex";

    } else {

        noWatchlistMovies.style.display =
            "none";

    }


    connectRemoveButtons();

}


// =========================
// FILTER BUTTONS
// =========================

filterButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",

            function() {

                currentFilter =
                    button.dataset.filter;


                filterButtons.forEach(
                    function(otherButton) {

                        otherButton.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                renderLibrary();

            }
        );

    }
);


// =========================
// REMOVE BUTTONS
// =========================

function connectRemoveButtons() {

    const buttons =
        document.querySelectorAll(
            ".remove-movie-button"
        );


    buttons.forEach(
        function(button) {

            button.addEventListener(
                "click",

                function() {

                    removeItem(
                        button.dataset.source,
                        button.dataset.type,
                        button.dataset.key
                    );

                }
            );

        }
    );

}


// =========================
// REMOVE ITEM
// =========================

function removeItem(
    source,
    type,
    key
) {

    // MANUAL MOVIES

    if (
        source === "manual" &&
        type === "watched"
    ) {

        watchedMovies =
            watchedMovies.filter(
                item => item !== key
            );


        localStorage.setItem(
            "watchedMovies",
            JSON.stringify(
                watchedMovies
            )
        );

    }


    if (
        source === "manual" &&
        type === "watchlist"
    ) {

        watchlistMovies =
            watchlistMovies.filter(
                item => item !== key
            );


        localStorage.setItem(
            "watchlistMovies",
            JSON.stringify(
                watchlistMovies
            )
        );

    }


    // TMDB MOVIES

    if (
        source === "movie" &&
        type === "watched"
    ) {

        watchedMoviesTMDB =
            watchedMoviesTMDB.filter(
                item => item !== key
            );


        localStorage.setItem(
            "watchedMoviesTMDB",
            JSON.stringify(
                watchedMoviesTMDB
            )
        );

    }


    if (
        source === "movie" &&
        type === "watchlist"
    ) {

        watchlistMoviesTMDB =
            watchlistMoviesTMDB.filter(
                item => item !== key
            );


        localStorage.setItem(
            "watchlistMoviesTMDB",
            JSON.stringify(
                watchlistMoviesTMDB
            )
        );

    }


    // TV SERIES

    if (
        source === "tv" &&
        type === "watched"
    ) {

        watchedTV =
            watchedTV.filter(
                item => item !== key
            );


        localStorage.setItem(
            "watchedTV",
            JSON.stringify(
                watchedTV
            )
        );

    }


    if (
        source === "tv" &&
        type === "watchlist"
    ) {

        watchlistTV =
            watchlistTV.filter(
                item => item !== key
            );


        localStorage.setItem(
            "watchlistTV",
            JSON.stringify(
                watchlistTV
            )
        );

    }


    renderLibrary();

}


// =========================
// START
// =========================

renderLibrary();