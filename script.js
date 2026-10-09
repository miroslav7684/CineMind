const movies = {

    "interstellar": {

        title: "Interstellar",

        year: "2014",

        genre: "Sci-Fi • Adventure • Drama",

        rating: "⭐ 8.7",

        poster: "image/interstellar.jpg",

        director: "Christopher Nolan",

        runtime: "2h 49min",

        country: "USA / United Kingdom",

        cast:
            "Matthew McConaughey, Anne Hathaway, Jessica Chastain, Michael Caine",

        description:
            "In the near future, Earth is becoming increasingly difficult to live on because of crop failures, dust storms and environmental problems. Cooper, a former NASA pilot, lives with his family and works as a farmer. After discovering a mysterious gravitational signal, he is led to a secret NASA facility. There, he learns about a mission that could determine the future of humanity. Cooper joins a group of astronauts who travel through a wormhole near Saturn in search of a new planet where humans could survive. The mission forces them to face extreme conditions, time dilation and difficult choices involving family, sacrifice and the survival of humanity.",

        imdb:
            "https://www.imdb.com/title/tt0816692/",

        watch:
            "https://www.justwatch.com/bg/movie/interstellar"
    },


    "shutter-island": {

        title: "Shutter Island",

        year: "2010",

        genre: "Mystery • Thriller • Drama",

        rating: "⭐ 8.2",

        poster: "image/shutter-island.jpg",

        director: "Martin Scorsese",

        runtime: "2h 18min",

        country: "USA",

        cast:
            "Leonardo DiCaprio, Mark Ruffalo, Ben Kingsley, Michelle Williams",

        description:
            "In 1954, U.S. Marshal Teddy Daniels and his new partner Chuck Aule travel to Shutter Island to investigate the disappearance of a patient from Ashecliffe Hospital, a psychiatric institution for dangerous criminals. Teddy becomes increasingly suspicious of the hospital staff and begins to believe important information is being hidden from him. A powerful storm traps everyone on the island while Teddy's investigation becomes more disturbing and confusing.",

        imdb:
            "https://www.imdb.com/title/tt1130884/",

        watch:
            "https://www.justwatch.com/bg/movie/shutter-island"
    },


    "inception": {

        title: "Inception",

        year: "2010",

        genre: "Sci-Fi • Action • Thriller",

        rating: "⭐ 8.8",

        poster: "image/inception.jpg",

        director: "Christopher Nolan",

        runtime: "2h 28min",

        country: "USA / United Kingdom",

        cast:
            "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page, Tom Hardy",

        description:
            "Dom Cobb is a highly skilled thief who specializes in stealing valuable secrets from people's minds while they dream. He is offered the chance to return to his normal life if he can complete an extremely difficult task called inception. Instead of stealing an idea, Cobb and his team must plant one inside another person's mind while moving through several layers of dreams where time and reality behave differently.",

        imdb:
            "https://www.imdb.com/title/tt1375666/",

        watch:
            "https://www.justwatch.com/bg/movie/inception"
    }

};




const parameters =
    new URLSearchParams(window.location.search);

const movieName =
    parameters.get("movie");


if (!movieName || !movies[movieName]) {

    window.location.href =
        "index.html";

} else {

    const movie =
        movies[movieName];


    

    document.getElementById("movieTitle").textContent =
        movie.title;

    document.getElementById("movieYear").textContent =
        movie.year;

    document.getElementById("movieGenre").textContent =
        movie.genre;

    document.getElementById("movieRating").textContent =
        movie.rating;

    document.getElementById("moviePoster").src =
        movie.poster;

    document.getElementById("movieDirector").textContent =
        movie.director;

    document.getElementById("movieRuntime").textContent =
        movie.runtime;

    document.getElementById("movieCountry").textContent =
        movie.country;

    document.getElementById("movieCast").textContent =
        movie.cast;

    document.getElementById("movieDescription").textContent =
        movie.description;

    document.getElementById("imdbButton").href =
        movie.imdb;


    const watchedButton =
        document.getElementById("watchedButton");

    const watchlistButton =
        document.getElementById("watchlistButton");

    const whereToWatchButton =
        document.getElementById("whereToWatchButton");

    const actionMessage =
        document.getElementById("actionMessage");


  

    function getSavedArray(name) {

        try {

            const value =
                localStorage.getItem(name);

            if (!value) {
                return [];
            }

            return JSON.parse(value);

        } catch {

            return [];

        }

    }


    let watchedMovies =
        getSavedArray("watchedMovies");

    let watchlistMovies =
        getSavedArray("watchlistMovies");


   

    function updateButtons() {

        if (watchedMovies.includes(movieName)) {

            watchedButton.textContent =
                "✓ Watched";

            watchedButton.classList.add("active");

        } else {

            watchedButton.textContent =
                "✓ Mark as watched";

            watchedButton.classList.remove("active");

        }


        if (watchlistMovies.includes(movieName)) {

            watchlistButton.textContent =
                "✓ In Watchlist";

            watchlistButton.classList.add("active");

        } else {

            watchlistButton.textContent =
                "+ Add to Watchlist";

            watchlistButton.classList.remove("active");

        }

    }


    updateButtons();


    

    watchedButton.addEventListener(
        "click",

        function () {

            if (watchedMovies.includes(movieName)) {

                watchedMovies =
                    watchedMovies.filter(
                        item => item !== movieName
                    );

                actionMessage.textContent =
                    movie.title +
                    " removed from watched movies.";

            } else {

                watchedMovies.push(movieName);

                actionMessage.textContent =
                    movie.title +
                    " marked as watched.";

            }


            localStorage.setItem(
                "watchedMovies",
                JSON.stringify(watchedMovies)
            );


            updateButtons();

        }
    );


   

    watchlistButton.addEventListener(
        "click",

        function () {

            if (watchlistMovies.includes(movieName)) {

                watchlistMovies =
                    watchlistMovies.filter(
                        item => item !== movieName
                    );

                actionMessage.textContent =
                    movie.title +
                    " removed from your watchlist.";

            } else {

                watchlistMovies.push(movieName);

                actionMessage.textContent =
                    movie.title +
                    " added to your watchlist.";

            }


            localStorage.setItem(
                "watchlistMovies",
                JSON.stringify(watchlistMovies)
            );


            updateButtons();

        }
    );



    whereToWatchButton.addEventListener(
        "click",

        function () {

            window.open(
                movie.watch,
                "_blank"
            );

        }
    );

}