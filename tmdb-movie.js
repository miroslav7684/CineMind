const TMDB_BASE_URL =
    "https://api.themoviedb.org/3";

const TMDB_IMAGE_URL =
    "https://image.tmdb.org/t/p/w500";

const TMDB_BACKDROP_URL =
    "https://image.tmdb.org/t/p/original";

const TMDB_PROVIDER_IMAGE_URL =
    "https://image.tmdb.org/t/p/original";


const params =
    new URLSearchParams(
        window.location.search
    );

const movieId =
    params.get("id");


const movieBackdrop =
    document.getElementById(
        "movieBackdrop"
    );

const moviePoster =
    document.getElementById(
        "moviePoster"
    );

const movieTitle =
    document.getElementById(
        "movieTitle"
    );

const movieYear =
    document.getElementById(
        "movieYear"
    );

const movieRuntime =
    document.getElementById(
        "movieRuntime"
    );

const movieRating =
    document.getElementById(
        "movieRating"
    );

const movieGenres =
    document.getElementById(
        "movieGenres"
    );

const movieDescription =
    document.getElementById(
        "movieDescription"
    );

const movieDirector =
    document.getElementById(
        "movieDirector"
    );

const movieStatus =
    document.getElementById(
        "movieStatus"
    );

const movieLanguage =
    document.getElementById(
        "movieLanguage"
    );

const movieCountry =
    document.getElementById(
        "movieCountry"
    );

const movieCast =
    document.getElementById(
        "movieCast"
    );

const movieCompanies =
    document.getElementById(
        "movieCompanies"
    );

const movieBudget =
    document.getElementById(
        "movieBudget"
    );

const movieRevenue =
    document.getElementById(
        "movieRevenue"
    );

const movieReleaseDate =
    document.getElementById(
        "movieReleaseDate"
    );

const movieWatchProviders =
    document.getElementById(
        "movieWatchProviders"
    );

const trailerButton =
    document.getElementById(
        "trailerButton"
    );

const watchedButton =
    document.getElementById(
        "watchedButton"
    );

const watchlistButton =
    document.getElementById(
        "watchlistButton"
    );

const movieActionMessage =
    document.getElementById(
        "movieActionMessage"
    );

const tmdbMovieButton =
    document.getElementById(
        "tmdbMovieButton"
    );



function getSavedArray(key) {

    return JSON.parse(
        localStorage.getItem(key)
    ) || [];

}


function getSavedObject(key) {

    return JSON.parse(
        localStorage.getItem(key)
    ) || {};

}




function formatMoney(value) {

    if (!value) {
        return "Not available";
    }


    return new Intl.NumberFormat(
        "en-US",
        {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0
        }
    ).format(value);

}




function saveMovieData(movie) {

    const allMovies =
        getSavedObject(
            "tmdbMovieData"
        );


    const key =
        `tmdb-${movie.id}`;


    allMovies[key] = {

        id:
            movie.id,

        title:
            movie.title,

        year:
            movie.release_date
                ? movie.release_date.substring(
                    0,
                    4
                )
                : "Unknown",

        rating:
            movie.vote_average,

        runtime:
            movie.runtime,

        genre:
            movie.genres
                .map(
                    genre =>
                        genre.name
                )
                .join(", "),

        poster:
            movie.poster_path
                ? TMDB_IMAGE_URL +
                  movie.poster_path
                : ""

    };


    localStorage.setItem(
        "tmdbMovieData",
        JSON.stringify(
            allMovies
        )
    );

}




function setupButtons(movie) {

    const storageId =
        `tmdb-${movie.id}`;


    function refreshButtons() {

        const watched =
            getSavedArray(
                "watchedMoviesTMDB"
            );


        const watchlist =
            getSavedArray(
                "watchlistMoviesTMDB"
            );


        if (
            watched.includes(
                storageId
            )
        ) {

            watchedButton.textContent =
                "✓ Watched";

            watchedButton.classList.add(
                "active"
            );

        } else {

            watchedButton.textContent =
                "✓ Mark as Watched";

            watchedButton.classList.remove(
                "active"
            );

        }


        if (
            watchlist.includes(
                storageId
            )
        ) {

            watchlistButton.textContent =
                "✓ In Watchlist";

            watchlistButton.classList.add(
                "active"
            );

        } else {

            watchlistButton.textContent =
                "+ Add to Watchlist";

            watchlistButton.classList.remove(
                "active"
            );

        }

    }


    watchedButton.addEventListener(
        "click",
        function() {

            let watched =
                getSavedArray(
                    "watchedMoviesTMDB"
                );


            if (
                watched.includes(
                    storageId
                )
            ) {

                watched =
                    watched.filter(
                        id =>
                            id !== storageId
                    );


                movieActionMessage.textContent =
                    "Removed from Watched.";

            } else {

                watched.push(
                    storageId
                );


                saveMovieData(
                    movie
                );


                movieActionMessage.textContent =
                    "Added to Watched.";

            }


            localStorage.setItem(
                "watchedMoviesTMDB",
                JSON.stringify(
                    watched
                )
            );


            refreshButtons();

        }
    );


    watchlistButton.addEventListener(
        "click",
        function() {

            let watchlist =
                getSavedArray(
                    "watchlistMoviesTMDB"
                );


            if (
                watchlist.includes(
                    storageId
                )
            ) {

                watchlist =
                    watchlist.filter(
                        id =>
                            id !== storageId
                    );


                movieActionMessage.textContent =
                    "Removed from Watchlist.";

            } else {

                watchlist.push(
                    storageId
                );


                saveMovieData(
                    movie
                );


                movieActionMessage.textContent =
                    "Added to Watchlist.";

            }


            localStorage.setItem(
                "watchlistMoviesTMDB",
                JSON.stringify(
                    watchlist
                )
            );


            refreshButtons();

        }
    );


    refreshButtons();

}




function renderCast(credits) {

    movieCast.innerHTML = "";


    const cast =
        credits.cast
            .filter(
                person =>
                    person.profile_path
            )
            .slice(0, 6);


    if (!cast.length) {

        movieCast.innerHTML =
            "<p>No cast information available.</p>";

        return;

    }


    cast.forEach(
        function(person) {

            movieCast.innerHTML += `

                <div class="cast-card">

                    <img
                        src="${TMDB_IMAGE_URL}${person.profile_path}"
                        alt="${person.name}"
                    >

                    <div class="cast-card-info">

                        <strong>
                            ${person.name}
                        </strong>

                        <span>
                            ${person.character || "Cast member"}
                        </span>

                    </div>

                </div>

            `;

        }
    );

}




function setupTrailer(videos) {

    const trailer =
        videos.results.find(
            video =>
                video.site === "YouTube" &&
                video.type === "Trailer"
        ) ||

        videos.results.find(
            video =>
                video.site === "YouTube"
        );


    if (!trailer) {

        trailerButton.style.display =
            "none";

        return;

    }


    trailerButton.href =
        `https://www.youtube.com/watch?v=${trailer.key}`;


    trailerButton.style.display =
        "inline-flex";

}




function removeDuplicateProviders(
    providers
) {

    const unique = [];

    const ids = new Set();


    providers.forEach(
        function(provider) {

            if (
                !ids.has(
                    provider.provider_id
                )
            ) {

                ids.add(
                    provider.provider_id
                );

                unique.push(
                    provider
                );

            }

        }
    );


    return unique;

}


function providerHTML(provider) {

    return `

        <div class="watch-provider">

            ${
                provider.logo_path

                    ? `
                        <img
                            src="${TMDB_PROVIDER_IMAGE_URL}${provider.logo_path}"
                            alt="${provider.provider_name}"
                        >
                    `

                    : ""
            }

            <span>
                ${provider.provider_name}
            </span>

        </div>

    `;

}


function createProviderGroup(
    title,
    providers
) {

    if (
        !providers ||
        !providers.length
    ) {

        return "";

    }


    const cleanProviders =
        removeDuplicateProviders(
            providers
        );


    return `

        <div class="watch-provider-group">

            <h3>
                ${title}
            </h3>

            <div class="watch-provider-list">

                ${
                    cleanProviders
                        .map(
                            provider =>
                                providerHTML(
                                    provider
                                )
                        )
                        .join("")
                }

            </div>

        </div>

    `;

}


function renderWatchProviders(
    providerData
) {

    const bulgaria =
        providerData.results?.BG;


    if (!bulgaria) {

        movieWatchProviders.innerHTML = `

            <div class="watch-empty">

                No streaming information is currently
                available for Bulgaria.

            </div>

        `;

        return;

    }


    let groups = "";


    groups +=
        createProviderGroup(
            "▶ Streaming",
            bulgaria.flatrate
        );


    groups +=
        createProviderGroup(
            "🆓 Free",
            bulgaria.free
        );


    groups +=
        createProviderGroup(
            "📺 With Ads",
            bulgaria.ads
        );


    groups +=
        createProviderGroup(
            "💳 Rent",
            bulgaria.rent
        );


    groups +=
        createProviderGroup(
            "🛒 Buy",
            bulgaria.buy
        );


    if (!groups) {

        groups = `

            <div class="watch-empty">

                No streaming services are currently
                listed for this movie in Bulgaria.

            </div>

        `;

    }


    const link =
        bulgaria.link
            ? `
                <a
                    class="watch-tmdb-link"
                    href="${bulgaria.link}"
                    target="_blank"
                >
                    Check availability on TMDB ↗
                </a>
            `
            : "";


    movieWatchProviders.innerHTML = `

        <div class="watch-provider-groups">
            ${groups}
        </div>

        ${link}

    `;

}




async function loadMovie() {

    if (!movieId) {

        window.location.href =
            "index.html";

        return;

    }


    try {

        const [
            movieResponse,
            providersResponse
        ] =
            await Promise.all([

                fetch(

                    `${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=credits,videos`

                ),

                fetch(

                    `${TMDB_BASE_URL}/movie/${movieId}/watch/providers?api_key=${TMDB_API_KEY}`

                )

            ]);


        const movie =
            await movieResponse.json();


        const providers =
            await providersResponse.json();


        if (
            !movieResponse.ok ||
            !movie.id
        ) {

            throw new Error(
                "Movie not found"
            );

        }


        document.title =
            `${movie.title} | CineMind`;


        if (
            movie.backdrop_path
        ) {

            movieBackdrop.style.backgroundImage =
                `url("${TMDB_BACKDROP_URL}${movie.backdrop_path}")`;

        }


        if (
            movie.poster_path
        ) {

            moviePoster.src =
                TMDB_IMAGE_URL +
                movie.poster_path;

        }


        moviePoster.alt =
            `${movie.title} poster`;


        movieTitle.textContent =
            movie.title;


        movieYear.textContent =
            movie.release_date
                ? movie.release_date.substring(
                    0,
                    4
                )
                : "Unknown";


        movieRuntime.textContent =
            movie.runtime
                ? `${movie.runtime} min`
                : "Unknown runtime";


        movieRating.textContent =
            movie.vote_average
                ? `⭐ ${movie.vote_average.toFixed(1)}`
                : "⭐ N/A";


        movieDescription.textContent =
            movie.overview ||
            "No description available.";


        movieStatus.textContent =
            movie.status ||
            "Unknown";


        movieLanguage.textContent =
            movie.spoken_languages?.[0]?.english_name ||
            movie.original_language?.toUpperCase() ||
            "Unknown";


        movieCountry.textContent =
            movie.production_countries?.length

                ? movie.production_countries
                    .map(
                        country =>
                            country.name
                    )
                    .join(", ")

                : "Unknown";


        movieGenres.innerHTML =
            movie.genres
                .map(
                    genre =>
                        `<span>${genre.name}</span>`
                )
                .join("");


        const director =
            movie.credits.crew.find(
                person =>
                    person.job ===
                    "Director"
            );


        movieDirector.textContent =
            director
                ? director.name
                : "Unknown";


        renderCast(
            movie.credits
        );


        setupTrailer(
            movie.videos
        );


        renderWatchProviders(
            providers
        );


        movieCompanies.textContent =
            movie.production_companies?.length

                ? movie.production_companies
                    .slice(0, 3)
                    .map(
                        company =>
                            company.name
                    )
                    .join(", ")

                : "Not available";


        movieBudget.textContent =
            formatMoney(
                movie.budget
            );


        movieRevenue.textContent =
            formatMoney(
                movie.revenue
            );


        movieReleaseDate.textContent =
            movie.release_date ||
            "Unknown";


        tmdbMovieButton.href =
            `https://www.themoviedb.org/movie/${movie.id}`;


        setupButtons(
            movie
        );


    } catch (error) {

        console.error(
            error
        );


        movieTitle.textContent =
            "Movie could not be loaded";


        movieDescription.textContent =
            "There was a problem loading information from TMDB.";


        movieWatchProviders.innerHTML = `

            <div class="watch-empty">

                Streaming information could not be loaded.

            </div>

        `;

    }

}


loadMovie();
const movieTrailerModal =
    document.createElement("div");

movieTrailerModal.className =
    "trailer-modal";

movieTrailerModal.innerHTML = `
    <div class="trailer-modal-box">

        <button
            class="trailer-modal-close"
            type="button"
        >
            ✕
        </button>

        <div class="trailer-video-box">

            <iframe
                class="trailer-video"
                src=""
                title="Movie trailer"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowfullscreen
            ></iframe>

        </div>

    </div>
`;

document.body.appendChild(
    movieTrailerModal
);


const movieTrailerFrame =
    movieTrailerModal.querySelector(
        ".trailer-video"
    );

const movieTrailerClose =
    movieTrailerModal.querySelector(
        ".trailer-modal-close"
    );


function closeMovieTrailer() {

    movieTrailerModal.classList.remove(
        "active"
    );

    movieTrailerFrame.src = "";

    document.body.style.overflow = "";

}


trailerButton.addEventListener(
    "click",
    function(event) {

        const href =
            trailerButton.href;

        if (
            !href ||
            href.endsWith("#")
        ) {
            return;
        }

        event.preventDefault();

        try {

            const url =
                new URL(href);

            const videoKey =
                url.searchParams.get("v");

            if (!videoKey) {
                return;
            }

            movieTrailerFrame.src =
                `https://www.youtube-nocookie.com/embed/${videoKey}?autoplay=1&rel=0`;

            movieTrailerModal.classList.add(
                "active"
            );

            document.body.style.overflow =
                "hidden";

        } catch (error) {

            console.error(error);

        }

    }
);


movieTrailerClose.addEventListener(
    "click",
    closeMovieTrailer
);


movieTrailerModal.addEventListener(
    "click",
    function(event) {

        if (
            event.target ===
            movieTrailerModal
        ) {

            closeMovieTrailer();

        }

    }
);


document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape" &&
            movieTrailerModal
                .classList
                .contains("active")
        ) {

            closeMovieTrailer();

        }

    }
);