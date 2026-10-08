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

const tvId =
    params.get("id");


const tvBackdrop =
    document.getElementById(
        "tvBackdrop"
    );

const tvPoster =
    document.getElementById(
        "tvPoster"
    );

const tvTitle =
    document.getElementById(
        "tvTitle"
    );

const tvYear =
    document.getElementById(
        "tvYear"
    );

const tvGenres =
    document.getElementById(
        "tvGenres"
    );

const tvRating =
    document.getElementById(
        "tvRating"
    );

const tvSeasons =
    document.getElementById(
        "tvSeasons"
    );

const tvEpisodes =
    document.getElementById(
        "tvEpisodes"
    );

const tvStatus =
    document.getElementById(
        "tvStatus"
    );

const tvFirstAir =
    document.getElementById(
        "tvFirstAir"
    );

const tvLastAir =
    document.getElementById(
        "tvLastAir"
    );

const tvDescription =
    document.getElementById(
        "tvDescription"
    );

const tvCreator =
    document.getElementById(
        "tvCreator"
    );

const tvLanguage =
    document.getElementById(
        "tvLanguage"
    );

const tvCast =
    document.getElementById(
        "tvCast"
    );

const tvNetworks =
    document.getElementById(
        "tvNetworks"
    );

const tvCompanies =
    document.getElementById(
        "tvCompanies"
    );

const tvCountry =
    document.getElementById(
        "tvCountry"
    );

const tvSeasonCount =
    document.getElementById(
        "tvSeasonCount"
    );

const tvWatchProviders =
    document.getElementById(
        "tvWatchProviders"
    );

const watchedTVButton =
    document.getElementById(
        "watchedTVButton"
    );

const watchlistTVButton =
    document.getElementById(
        "watchlistTVButton"
    );

const tvTrailerButton =
    document.getElementById(
        "tvTrailerButton"
    );

const tmdbTVButton =
    document.getElementById(
        "tmdbTVButton"
    );

const tvActionMessage =
    document.getElementById(
        "tvActionMessage"
    );


// ==================================================
// STORAGE
// ==================================================

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


function saveTVData(tv) {

    const data =
        getSavedObject(
            "tmdbTVData"
        );


    const key =
        `tv-${tv.id}`;


    data[key] = {

        id:
            tv.id,

        title:
            tv.name,

        year:
            tv.first_air_date
                ? tv.first_air_date.substring(
                    0,
                    4
                )
                : "Unknown",

        genre:
            tv.genres
                .map(
                    genre =>
                        genre.name
                )
                .join(", "),

        rating:
            tv.vote_average,

        seasons:
            tv.number_of_seasons,

        episodes:
            tv.number_of_episodes,

        poster:
            tv.poster_path
                ? TMDB_IMAGE_URL +
                  tv.poster_path
                : ""

    };


    localStorage.setItem(
        "tmdbTVData",
        JSON.stringify(
            data
        )
    );

}


// ==================================================
// BUTTONS
// ==================================================

function setupTVButtons(tv) {

    const storageId =
        `tv-${tv.id}`;


    function refreshButtons() {

        const watched =
            getSavedArray(
                "watchedTV"
            );


        const watchlist =
            getSavedArray(
                "watchlistTV"
            );


        if (
            watched.includes(
                storageId
            )
        ) {

            watchedTVButton.textContent =
                "✓ Watched";

            watchedTVButton.classList.add(
                "active"
            );

        } else {

            watchedTVButton.textContent =
                "✓ Mark as Watched";

            watchedTVButton.classList.remove(
                "active"
            );

        }


        if (
            watchlist.includes(
                storageId
            )
        ) {

            watchlistTVButton.textContent =
                "✓ In Watchlist";

            watchlistTVButton.classList.add(
                "active"
            );

        } else {

            watchlistTVButton.textContent =
                "+ Add to Watchlist";

            watchlistTVButton.classList.remove(
                "active"
            );

        }

    }


    watchedTVButton.addEventListener(
        "click",
        function() {

            let watched =
                getSavedArray(
                    "watchedTV"
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


                tvActionMessage.textContent =
                    "Removed from Watched.";

            } else {

                watched.push(
                    storageId
                );


                saveTVData(
                    tv
                );


                tvActionMessage.textContent =
                    "Added to Watched.";

            }


            localStorage.setItem(
                "watchedTV",
                JSON.stringify(
                    watched
                )
            );


            refreshButtons();

        }
    );


    watchlistTVButton.addEventListener(
        "click",
        function() {

            let watchlist =
                getSavedArray(
                    "watchlistTV"
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


                tvActionMessage.textContent =
                    "Removed from Watchlist.";

            } else {

                watchlist.push(
                    storageId
                );


                saveTVData(
                    tv
                );


                tvActionMessage.textContent =
                    "Added to Watchlist.";

            }


            localStorage.setItem(
                "watchlistTV",
                JSON.stringify(
                    watchlist
                )
            );


            refreshButtons();

        }
    );


    refreshButtons();

}


// ==================================================
// CAST
// ==================================================

function renderCast(credits) {

    tvCast.innerHTML = "";


    const cast =
        credits.cast
            .filter(
                person =>
                    person.profile_path
            )
            .slice(0, 6);


    if (!cast.length) {

        tvCast.innerHTML =
            "<p>No cast information available.</p>";

        return;

    }


    cast.forEach(
        function(person) {

            tvCast.innerHTML += `

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


// ==================================================
// TRAILER
// ==================================================

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

        tvTrailerButton.style.display =
            "none";

        return;

    }


    tvTrailerButton.href =
        `https://www.youtube.com/watch?v=${trailer.key}`;


    tvTrailerButton.style.display =
        "inline-flex";

}


// ==================================================
// WATCH PROVIDERS
// ==================================================

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

        tvWatchProviders.innerHTML = `

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
                listed for this TV series in Bulgaria.

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


    tvWatchProviders.innerHTML = `

        <div class="watch-provider-groups">
            ${groups}
        </div>

        ${link}

    `;

}


// ==================================================
// LOAD TV
// ==================================================

async function loadTV() {

    if (!tvId) {

        window.location.href =
            "index.html";

        return;

    }


    try {

        const [
            tvResponse,
            providersResponse
        ] =
            await Promise.all([

                fetch(

                    `${TMDB_BASE_URL}/tv/${tvId}?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=credits,videos`

                ),

                fetch(

                    `${TMDB_BASE_URL}/tv/${tvId}/watch/providers?api_key=${TMDB_API_KEY}`

                )

            ]);


        const tv =
            await tvResponse.json();


        const providers =
            await providersResponse.json();


        if (
            !tvResponse.ok ||
            !tv.id
        ) {

            throw new Error(
                "TV series not found"
            );

        }


        document.title =
            `${tv.name} | CineMind`;


        if (
            tv.backdrop_path
        ) {

            tvBackdrop.style.backgroundImage =
                `url("${TMDB_BACKDROP_URL}${tv.backdrop_path}")`;

        }


        if (
            tv.poster_path
        ) {

            tvPoster.src =
                TMDB_IMAGE_URL +
                tv.poster_path;

        }


        tvPoster.alt =
            `${tv.name} poster`;


        tvTitle.textContent =
            tv.name;


        tvYear.textContent =
            tv.first_air_date
                ? tv.first_air_date.substring(
                    0,
                    4
                )
                : "Unknown";


        tvRating.textContent =
            tv.vote_average
                ? `⭐ ${tv.vote_average.toFixed(1)}`
                : "⭐ N/A";


        tvSeasons.textContent =
            `${tv.number_of_seasons || 0} season${tv.number_of_seasons === 1 ? "" : "s"}`;


        tvEpisodes.textContent =
            tv.number_of_episodes ||
            "Unknown";


        tvStatus.textContent =
            tv.status ||
            "Unknown";


        tvFirstAir.textContent =
            tv.first_air_date ||
            "Unknown";


        tvLastAir.textContent =
            tv.last_air_date ||
            "Unknown";


        tvDescription.textContent =
            tv.overview ||
            "No description available.";


        tvGenres.innerHTML =
            tv.genres
                .map(
                    genre =>
                        `<span>${genre.name}</span>`
                )
                .join("");


        tvCreator.textContent =
            tv.created_by?.length

                ? tv.created_by
                    .map(
                        person =>
                            person.name
                    )
                    .join(", ")

                : "Unknown";


        tvLanguage.textContent =
            tv.spoken_languages?.[0]?.english_name ||
            tv.original_language?.toUpperCase() ||
            "Unknown";


        tvNetworks.textContent =
            tv.networks?.length

                ? tv.networks
                    .map(
                        network =>
                            network.name
                    )
                    .join(", ")

                : "Unknown";


        tvCompanies.textContent =
            tv.production_companies?.length

                ? tv.production_companies
                    .slice(0, 3)
                    .map(
                        company =>
                            company.name
                    )
                    .join(", ")

                : "Unknown";


        tvCountry.textContent =
            tv.origin_country?.length

                ? tv.origin_country.join(
                    ", "
                )

                : "Unknown";


        tvSeasonCount.textContent =
            tv.number_of_seasons ||
            "Unknown";


        renderCast(
            tv.credits
        );


        setupTrailer(
            tv.videos
        );


        renderWatchProviders(
            providers
        );


        tmdbTVButton.href =
            `https://www.themoviedb.org/tv/${tv.id}`;


        setupTVButtons(
            tv
        );


    } catch (error) {

        console.error(
            error
        );


        tvTitle.textContent =
            "TV series could not be loaded";


        tvDescription.textContent =
            "There was a problem loading information from TMDB.";


        tvWatchProviders.innerHTML = `

            <div class="watch-empty">

                Streaming information could not be loaded.

            </div>

        `;

    }

}


loadTV();