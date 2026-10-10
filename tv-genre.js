const parameters =
    new URLSearchParams(
        window.location.search
    );


const genreId =
    parameters.get("genre");


const genreName =
    parameters.get("name") ||
    "TV Series";


const TMDB_BASE_URL =
    "https://api.themoviedb.org/3";


const TMDB_IMAGE_URL =
    "https://image.tmdb.org/t/p/w500";


const genreTitle =
    document.getElementById(
        "genreTitle"
    );


const genreTVList =
    document.getElementById(
        "genreMovies"
    );


genreTitle.textContent =
    genreName;


document.title =
    genreName + " TV Series | CineMind";




function createTVCard(tv) {

    const title =
        tv.name || "Unknown";


    const year =
        tv.first_air_date
            ? tv.first_air_date.substring(
                0,
                4
            )
            : "Unknown";


    const rating =
        tv.vote_average
            ? tv.vote_average.toFixed(1)
            : "N/A";


    const poster =
        tv.poster_path
            ? TMDB_IMAGE_URL +
              tv.poster_path
            : "";


    return `

        <a
            href="tv.html?id=${tv.id}"
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
                            TV
                        </span>

                    </div>

                </div>

            </div>

        </a>

    `;

}



async function loadTVGenre() {

    if (!genreId) {

        window.location.href =
            "index.html";

        return;

    }


    try {

        const response =
            await fetch(

                `${TMDB_BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=${genreId}&page=1`

            );


        if (!response.ok) {

            throw new Error(
                "Could not load TV genre."
            );

        }


        const data =
            await response.json();


        const series =
            data.results.slice(0, 20);


        genreTVList.innerHTML = "";


        series.forEach(
            function(tv) {

                genreTVList.innerHTML +=
                    createTVCard(tv);

            }
        );


    } catch (error) {

        console.error(
            "TV genre error:",
            error
        );


        genreTVList.innerHTML = `

            <div class="search-empty">

                <h3>
                    Could not load TV series
                </h3>

                <p>
                    Please try again later.
                </p>

            </div>

        `;

    }

}


loadTVGenre();