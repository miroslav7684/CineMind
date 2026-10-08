const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const TMDB_IMAGE_URL =
    "https://image.tmdb.org/t/p/w500";

const TMDB_BACKDROP_URL =
    "https://image.tmdb.org/t/p/original";


// ==================================================
// MODES
// ==================================================

let currentMode = "movie";

let currentSearchMode = "title";

let lastSmartResults = [];

let featuredCandidates = [];

let currentFeaturedId = null;


// ==================================================
// ELEMENTS
// ==================================================

const moviesModeButton =
    document.getElementById(
        "moviesModeButton"
    );

const tvModeButton =
    document.getElementById(
        "tvModeButton"
    );

const titleSearchMode =
    document.getElementById(
        "titleSearchMode"
    );

const smartSearchMode =
    document.getElementById(
        "smartSearchMode"
    );

const popularTitle =
    document.getElementById(
        "popularTitle"
    );

const popularLabel =
    document.getElementById(
        "popularLabel"
    );

const popularMovies =
    document.getElementById(
        "popularMovies"
    );

const searchInput =
    document.getElementById(
        "movieSearchInput"
    );

const searchButton =
    document.getElementById(
        "movieSearchButton"
    );

const searchExample =
    document.getElementById(
        "searchExample"
    );

const searchResultsSection =
    document.getElementById(
        "searchResultsSection"
    );

const searchResultsList =
    document.getElementById(
        "searchResultsList"
    );

const searchResultsTitle =
    document.getElementById(
        "searchResultsTitle"
    );

const searchResultLabel =
    document.getElementById(
        "searchResultLabel"
    );

const smartSearchInfo =
    document.getElementById(
        "smartSearchInfo"
    );

const clearSearchButton =
    document.getElementById(
        "clearSearchButton"
    );

const randomPickButton =
    document.getElementById(
        "randomPickButton"
    );


// FEATURED

const featuredBackdrop =
    document.getElementById(
        "featuredBackdrop"
    );

const featuredLabel =
    document.getElementById(
        "featuredLabel"
    );

const featuredTitle =
    document.getElementById(
        "featuredTitle"
    );

const featuredRating =
    document.getElementById(
        "featuredRating"
    );

const featuredYear =
    document.getElementById(
        "featuredYear"
    );

const featuredType =
    document.getElementById(
        "featuredType"
    );

const featuredOverview =
    document.getElementById(
        "featuredOverview"
    );

const featuredDetailsButton =
    document.getElementById(
        "featuredDetailsButton"
    );

const featuredAnotherButton =
    document.getElementById(
        "featuredAnotherButton"
    );


// ==================================================
// CATEGORY ELEMENTS
// ==================================================

const categories = [];

for (let i = 1; i <= 7; i++) {

    categories.push({

        title:
            document.getElementById(
                `category${i}Title`
            ),

        label:
            document.getElementById(
                `category${i}Label`
            ),

        movies:
            document.getElementById(
                `category${i}Movies`
            ),

        more:
            document.getElementById(
                `category${i}More`
            )

    });

}


// ==================================================
// HOME CATEGORIES
// ==================================================

const movieCategories = [

    {
        id: 27,
        name: "Horror",
        label: "DARK & SCARY"
    },

    {
        id: 28,
        name: "Action",
        label: "HIGH ENERGY"
    },

    {
        id: 12,
        name: "Adventure",
        label: "EXPLORE MORE"
    },

    {
        id: 35,
        name: "Comedy",
        label: "FEEL GOOD"
    },

    {
        id: 878,
        name: "Sci-Fi",
        label: "FUTURE & SPACE"
    },

    {
        id: 9648,
        name: "Mystery",
        label: "SECRETS & TWISTS"
    },

    {
        id: 16,
        name: "Animation",
        label: "ANIMATED WORLDS"
    }

];


const tvCategories = [

    {
        id: 18,
        name: "Drama",
        label: "POWERFUL STORIES"
    },

    {
        id: 35,
        name: "Comedy",
        label: "FEEL GOOD"
    },

    {
        id: 10765,
        name: "Sci-Fi & Fantasy",
        label: "OTHER WORLDS"
    },

    {
        id: 80,
        name: "Crime",
        label: "CRIME & DANGER"
    },

    {
        id: 9648,
        name: "Mystery",
        label: "SECRETS & TWISTS"
    },

    {
        id: 16,
        name: "Animation",
        label: "ANIMATED WORLDS"
    },

    {
        id: 10759,
        name: "Action & Adventure",
        label: "HIGH ENERGY"
    }

];


// ==================================================
// SMART GENRES
// ==================================================

const smartWords = [

    {
        name: "Horror",

        words: [
            "horror",
            "scary",
            "creepy",
            "страшен",
            "страшно",
            "ужас",
            "ужаси",
            "зловещ",
            "плашещ"
        ],

        movieGenres: [27],

        tvGenres: [
            9648,
            10765
        ]
    },


    {
        name: "Action",

        words: [
            "action",
            "екшън",
            "бой",
            "битки",
            "fight",
            "fighting",
            "експлозии"
        ],

        movieGenres: [28],

        tvGenres: [10759]
    },


    {
        name: "Adventure",

        words: [
            "adventure",
            "приключение",
            "приключенски",
            "пътуване",
            "journey"
        ],

        movieGenres: [12],

        tvGenres: [10759]
    },


    {
        name: "Comedy",

        words: [
            "comedy",
            "funny",
            "комедия",
            "смешен",
            "смешно",
            "забавен",
            "забавно"
        ],

        movieGenres: [35],

        tvGenres: [35]
    },


    {
        name: "Romance",

        words: [
            "romance",
            "romantic",
            "love",
            "любов",
            "любовен",
            "романтичен",
            "романтика"
        ],

        movieGenres: [10749],

        tvGenres: [18]
    },


    {
        name: "Mystery",

        words: [
            "mystery",
            "mysterious",
            "мистерия",
            "мистериозен",
            "мистериозно",
            "загадка",
            "загадки",
            "тайна",
            "тайни"
        ],

        movieGenres: [9648],

        tvGenres: [9648]
    },


    {
        name: "Thriller",

        words: [
            "thriller",
            "трилър",
            "напрежение",
            "напрегнат",
            "напрегнато",
            "plot twist",
            "неочакван край",
            "неочакван обрат",
            "обрат"
        ],

        movieGenres: [53],

        tvGenres: [
            9648,
            18
        ]
    },


    {
        name: "Sci-Fi",

        words: [
            "sci-fi",
            "science fiction",
            "space",
            "космос",
            "космически",
            "alien",
            "aliens",
            "извънземни",
            "future",
            "бъдеще",
            "robot",
            "robots",
            "роботи"
        ],

        movieGenres: [878],

        tvGenres: [10765]
    },


    {
        name: "Fantasy",

        words: [
            "fantasy",
            "фентъзи",
            "magic",
            "магия",
            "магически",
            "dragon",
            "dragons",
            "дракон",
            "дракони"
        ],

        movieGenres: [14],

        tvGenres: [10765]
    },


    {
        name: "Crime",

        words: [
            "crime",
            "criminal",
            "престъпление",
            "престъпления",
            "мафия",
            "mafia",
            "gangster",
            "гангстер",
            "наркотици",
            "drug"
        ],

        movieGenres: [80],

        tvGenres: [80]
    },


    {
        name: "Detective",

        words: [
            "detective",
            "детектив",
            "investigation",
            "разследване",
            "murder",
            "убийство"
        ],

        movieGenres: [
            9648,
            80
        ],

        tvGenres: [
            9648,
            80
        ]
    },


    {
        name: "War",

        words: [
            "war",
            "война",
            "военен",
            "soldier",
            "войник"
        ],

        movieGenres: [10752],

        tvGenres: [10768]
    },


    {
        name: "History",

        words: [
            "history",
            "historical",
            "история",
            "исторически"
        ],

        movieGenres: [36],

        tvGenres: [18]
    },


    {
        name: "Animation",

        words: [
            "animation",
            "animated",
            "cartoon",
            "анимация",
            "анимационен",
            "анимационно"
        ],

        movieGenres: [16],

        tvGenres: [16]
    },


    {
        name: "Family",

        words: [
            "family",
            "семеен",
            "семейство",
            "за деца",
            "kids"
        ],

        movieGenres: [10751],

        tvGenres: [10751]
    },


    {
        name: "Drama",

        words: [
            "drama",
            "драма",
            "емоционален",
            "емоционално",
            "emotional",
            "sad",
            "тъжен"
        ],

        movieGenres: [18],

        tvGenres: [18]
    }

];


// ==================================================
// MOODS
// ==================================================

const moodGroups = [

    {
        name: "Dark",

        words: [
            "dark",
            "мрачен",
            "мрачно",
            "тъмен",
            "зловещ"
        ],

        overviewWords: [
            "dark",
            "death",
            "murder",
            "secret",
            "crime",
            "danger",
            "killer"
        ]
    },


    {
        name: "Tense",

        words: [
            "tense",
            "напрегнат",
            "напрегнато",
            "напрежение",
            "suspense"
        ],

        overviewWords: [
            "danger",
            "escape",
            "hunt",
            "killer",
            "survive",
            "mystery"
        ]
    },


    {
        name: "Emotional",

        words: [
            "emotional",
            "емоционален",
            "емоционално",
            "трогателен",
            "sad",
            "тъжен"
        ],

        overviewWords: [
            "family",
            "love",
            "life",
            "loss",
            "relationship",
            "friendship"
        ]
    },


    {
        name: "Feel-good",

        words: [
            "feel good",
            "feel-good",
            "позитивен",
            "разпускащ",
            "приятен",
            "лек филм"
        ],

        overviewWords: [
            "friendship",
            "family",
            "love",
            "fun",
            "dream"
        ]
    },


    {
        name: "Mind-bending",

        words: [
            "mind bending",
            "mind-bending",
            "объркан",
            "объркващ",
            "сложен",
            "mindfuck"
        ],

        overviewWords: [
            "reality",
            "dream",
            "memory",
            "time",
            "mind"
        ]
    }

];


// ==================================================
// THEMES
// ==================================================

const themeGroups = [

    {
        name: "Zombies",

        userWords: [
            "zombie",
            "zombies",
            "зомби"
        ],

        overviewWords: [
            "zombie",
            "undead",
            "infected",
            "infection"
        ]
    },


    {
        name: "Apocalypse",

        userWords: [
            "apocalypse",
            "апокалипсис",
            "края на света",
            "end of the world"
        ],

        overviewWords: [
            "apocalypse",
            "humanity",
            "survival",
            "world"
        ]
    },


    {
        name: "Serial killer",

        userWords: [
            "serial killer",
            "сериен убиец"
        ],

        overviewWords: [
            "killer",
            "murder",
            "detective",
            "victim"
        ]
    },


    {
        name: "Survival",

        userWords: [
            "survival",
            "оцеляване",
            "оцелява",
            "survive"
        ],

        overviewWords: [
            "survival",
            "survive",
            "trapped",
            "danger"
        ]
    },


    {
        name: "Time travel",

        userWords: [
            "time travel",
            "пътуване във времето",
            "времева машина"
        ],

        overviewWords: [
            "time",
            "future",
            "past",
            "timeline"
        ]
    },


    {
        name: "Superheroes",

        userWords: [
            "superhero",
            "superheroes",
            "супергерой",
            "супергерои"
        ],

        overviewWords: [
            "hero",
            "superhero",
            "powers"
        ]
    },


    {
        name: "Heist",

        userWords: [
            "heist",
            "обир",
            "грабеж",
            "bank robbery"
        ],

        overviewWords: [
            "heist",
            "robbery",
            "bank",
            "thief"
        ]
    },


    {
        name: "Prison",

        userWords: [
            "prison",
            "затвор",
            "затворници"
        ],

        overviewWords: [
            "prison",
            "prisoner",
            "escape",
            "inmate"
        ]
    },


    {
        name: "School",

        userWords: [
            "school",
            "училище",
            "ученици",
            "high school"
        ],

        overviewWords: [
            "school",
            "student",
            "teenager"
        ]
    },


    {
        name: "Vampires",

        userWords: [
            "vampire",
            "vampires",
            "вампир",
            "вампири"
        ],

        overviewWords: [
            "vampire",
            "blood",
            "immortal"
        ]
    }

];


// ==================================================
// COUNTRIES
// ==================================================

const countries = [

    {
        code: "US",
        name: "USA",

        words: [
            "американски",
            "america",
            "american",
            "usa"
        ]
    },

    {
        code: "GB",
        name: "United Kingdom",

        words: [
            "британски",
            "british",
            "uk"
        ]
    },

    {
        code: "KR",
        name: "South Korea",

        words: [
            "корейски",
            "korean",
            "korea"
        ]
    },

    {
        code: "JP",
        name: "Japan",

        words: [
            "японски",
            "japanese",
            "japan"
        ]
    },

    {
        code: "FR",
        name: "France",

        words: [
            "френски",
            "french",
            "france"
        ]
    },

    {
        code: "ES",
        name: "Spain",

        words: [
            "испански филм",
            "spanish movie",
            "spain"
        ]
    },

    {
        code: "DE",
        name: "Germany",

        words: [
            "немски",
            "german",
            "germany"
        ]
    },

    {
        code: "IT",
        name: "Italy",

        words: [
            "италиански",
            "italian",
            "italy"
        ]
    },

    {
        code: "BG",
        name: "Bulgaria",

        words: [
            "български",
            "bulgarian",
            "bulgaria"
        ]
    }

];


// ==================================================
// LANGUAGES
// ==================================================

const languages = [

    {
        code: "en",
        name: "English",

        words: [
            "на английски",
            "english language"
        ]
    },

    {
        code: "ko",
        name: "Korean",

        words: [
            "на корейски",
            "korean language"
        ]
    },

    {
        code: "ja",
        name: "Japanese",

        words: [
            "на японски",
            "japanese language"
        ]
    },

    {
        code: "es",
        name: "Spanish",

        words: [
            "на испански",
            "spanish language"
        ]
    },

    {
        code: "fr",
        name: "French",

        words: [
            "на френски",
            "french language"
        ]
    },

    {
        code: "de",
        name: "German",

        words: [
            "на немски",
            "german language"
        ]
    },

    {
        code: "it",
        name: "Italian",

        words: [
            "на италиански",
            "italian language"
        ]
    },

    {
        code: "bg",
        name: "Bulgarian",

        words: [
            "на български",
            "bulgarian language"
        ]
    }

];


// ==================================================
// CREATE CARD
// ==================================================

function createCard(item) {

    let title;
    let date;
    let link;


    if (currentMode === "movie") {

        title =
            item.title || "Unknown";

        date =
            item.release_date;

        link =
            `tmdb-movie.html?id=${item.id}`;

    } else {

        title =
            item.name || "Unknown";

        date =
            item.first_air_date;

        link =
            `tv.html?id=${item.id}`;

    }


    const year =
        date
            ? date.substring(0, 4)
            : "Unknown";


    const rating =
        item.vote_average
            ? item.vote_average.toFixed(1)
            : "N/A";


    const poster =
        item.poster_path
            ? TMDB_IMAGE_URL +
              item.poster_path
            : "";


    const typeText =
        currentMode === "movie"
            ? "Movie"
            : "TV Series";


    const matchBadge =
        item.matchPercent

            ? `
                <div class="match-badge">
                    ✦ ${item.matchPercent}% match
                </div>
            `

            : "";


    return `

        <a
            href="${link}"
            class="movie-link"
        >

            <div class="movie-card">

                <div class="poster-container">

                    ${
                        poster

                            ? `
                                <img
                                    src="${poster}"
                                    alt="${title}"
                                >
                            `

                            : `
                                <div class="no-poster">
                                    No poster
                                </div>
                            `
                    }


                    <div class="poster-overlay"></div>


                    <div class="poster-rating">
                        ⭐ ${rating}
                    </div>


                    ${matchBadge}


                    <div class="poster-play">
                        ▶
                    </div>

                </div>


                <div class="movie-info">

                    <h3>
                        ${title}
                    </h3>


                    <p class="genre">
                        ${typeText}
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


// ==================================================
// RENDER
// ==================================================

function renderList(
    container,
    items
) {

    container.innerHTML = "";


    if (
        !items ||
        items.length === 0
    ) {

        container.innerHTML = `

            <div class="search-empty">

                <h3>
                    Nothing found
                </h3>

                <p>
                    Try changing some of your requirements.
                </p>

            </div>

        `;

        return;

    }


    items.forEach(
        function(item) {

            container.innerHTML +=
                createCard(item);

        }
    );

}


// ==================================================
// FEATURED
// ==================================================

async function loadFeatured() {

    featuredTitle.textContent =
        "Loading...";


    try {

        const response =
            await fetch(

                `${TMDB_BASE_URL}/${currentMode}/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`

            );


        const data =
            await response.json();


        featuredCandidates =
            (data.results || [])
                .filter(
                    item =>
                        item.backdrop_path &&
                        (
                            item.title ||
                            item.name
                        )
                )
                .slice(0, 12);


        showRandomFeatured();


    } catch (error) {

        console.error(
            "Featured error:",
            error
        );


        featuredTitle.textContent =
            "Featured title unavailable";

    }

}


function showRandomFeatured() {

    if (!featuredCandidates.length) {
        return;
    }


    let possible =
        featuredCandidates;


    if (
        featuredCandidates.length > 1 &&
        currentFeaturedId !== null
    ) {

        possible =
            featuredCandidates.filter(
                item =>
                    item.id !==
                    currentFeaturedId
            );

    }


    const randomIndex =
        Math.floor(
            Math.random() *
            possible.length
        );


    const item =
        possible[randomIndex];


    currentFeaturedId =
        item.id;


    const title =
        currentMode === "movie"
            ? item.title
            : item.name;


    const date =
        currentMode === "movie"
            ? item.release_date
            : item.first_air_date;


    const year =
        date
            ? date.substring(0, 4)
            : "Unknown";


    const rating =
        item.vote_average
            ? item.vote_average.toFixed(1)
            : "N/A";


    featuredBackdrop.style.backgroundImage =
        `url("${TMDB_BACKDROP_URL}${item.backdrop_path}")`;


    featuredTitle.textContent =
        title;


    featuredRating.textContent =
        `⭐ ${rating}`;


    featuredYear.textContent =
        year;


    featuredOverview.textContent =
        item.overview ||
        "Discover this popular title on CineMind.";


    if (currentMode === "movie") {

        featuredLabel.textContent =
            "✦ FEATURED MOVIE";


        featuredType.textContent =
            "Movie";


        featuredDetailsButton.href =
            `tmdb-movie.html?id=${item.id}`;

    } else {

        featuredLabel.textContent =
            "✦ FEATURED TV SERIES";


        featuredType.textContent =
            "TV Series";


        featuredDetailsButton.href =
            `tv.html?id=${item.id}`;

    }

}


// ==================================================
// POPULAR
// ==================================================

async function loadPopular() {

    popularMovies.innerHTML =
        "<p>Loading...</p>";


    try {

        const response =
            await fetch(

                `${TMDB_BASE_URL}/${currentMode}/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`

            );


        const data =
            await response.json();


        renderList(
            popularMovies,
            data.results.slice(0, 6)
        );


    } catch (error) {

        console.error(
            "Popular error:",
            error
        );

    }

}


// ==================================================
// GENRES
// ==================================================

async function loadGenre(
    genreId,
    container
) {

    container.innerHTML =
        "<p>Loading...</p>";


    try {

        const response =
            await fetch(

                `${TMDB_BASE_URL}/discover/${currentMode}?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=${genreId}&page=1`

            );


        const data =
            await response.json();


        renderList(
            container,
            data.results.slice(0, 6)
        );


    } catch (error) {

        console.error(
            "Genre error:",
            error
        );

    }

}


// ==================================================
// CURRENT MODE
// ==================================================

function loadCurrentMode() {

    const selectedCategories =
        currentMode === "movie"
            ? movieCategories
            : tvCategories;


    if (currentMode === "movie") {

        popularTitle.textContent =
            "Popular Movies";


        popularLabel.textContent =
            "TRENDING MOVIES";


        moviesModeButton.classList.add(
            "active"
        );


        tvModeButton.classList.remove(
            "active"
        );

    } else {

        popularTitle.textContent =
            "Popular TV Series";


        popularLabel.textContent =
            "TRENDING SERIES";


        tvModeButton.classList.add(
            "active"
        );


        moviesModeButton.classList.remove(
            "active"
        );

    }


    updateSearchMode();


    searchResultsSection.style.display =
        "none";


    randomPickButton.style.display =
        "none";


    lastSmartResults = [];


    currentFeaturedId =
        null;


    loadFeatured();

    loadPopular();


    selectedCategories.forEach(
        function(category, index) {

            const elements =
                categories[index];


            elements.title.textContent =
                category.name;


            elements.label.textContent =
                category.label;


            if (
                currentMode === "movie"
            ) {

                elements.more.href =
                    `genre.html?genre=${category.id}&name=${encodeURIComponent(category.name)}`;

            } else {

                elements.more.href =
                    `tv-genre.html?genre=${category.id}&name=${encodeURIComponent(category.name)}`;

            }


            loadGenre(
                category.id,
                elements.movies
            );

        }
    );

}


// ==================================================
// SEARCH MODE
// ==================================================

function updateSearchMode() {

    searchInput.value =
        "";


    if (
        currentSearchMode ===
        "title"
    ) {

        titleSearchMode.classList.add(
            "active"
        );


        smartSearchMode.classList.remove(
            "active"
        );


        searchButton.textContent =
            "Search";


        if (
            currentMode === "movie"
        ) {

            searchInput.placeholder =
                "Search for a movie... Example: Batman";


            searchExample.textContent =
                'Try: "Batman", "Interstellar" or "Saw"';

        } else {

            searchInput.placeholder =
                "Search for a TV series... Example: Breaking Bad";


            searchExample.textContent =
                'Try: "Breaking Bad", "Dexter" or "Game of Thrones"';

        }

    } else {

        smartSearchMode.classList.add(
            "active"
        );


        titleSearchMode.classList.remove(
            "active"
        );


        searchButton.textContent =
            "Find for me";


        searchInput.placeholder =
            "Describe exactly what you want...";


        searchExample.textContent =
            'Try: "корейски mystery след 2018 рейтинг над 8 без romance"';

    }

}


// ==================================================
// TITLE SEARCH
// ==================================================

async function titleSearch() {

    const text =
        searchInput.value.trim();


    if (!text) {
        return;
    }


    searchResultLabel.textContent =
        "SEARCH RESULTS";


    searchResultsTitle.textContent =
        `Results for "${text}"`;


    smartSearchInfo.style.display =
        "none";


    randomPickButton.style.display =
        "none";


    searchResultsSection.style.display =
        "block";


    searchResultsList.innerHTML =
        "<p>Searching...</p>";


    try {

        const response =
            await fetch(

                `${TMDB_BASE_URL}/search/${currentMode}?api_key=${TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(text)}&page=1&include_adult=false`

            );


        const data =
            await response.json();


        renderList(
            searchResultsList,
            data.results.slice(0, 12)
        );


        scrollToResults();


    } catch (error) {

        console.error(error);

    }

}


// ==================================================
// NEGATIVE WORD
// ==================================================

function wordIsNegative(
    text,
    word
) {

    const escaped =
        word.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        );


    const patterns = [

        new RegExp(
            `без\\s+(?:много\\s+)?${escaped}`,
            "i"
        ),

        new RegExp(
            `не\\s+искам\\s+(?:да\\s+е\\s+)?${escaped}`,
            "i"
        ),

        new RegExp(
            `without\\s+(?:much\\s+)?${escaped}`,
            "i"
        ),

        new RegExp(
            `no\\s+${escaped}`,
            "i"
        )

    ];


    return patterns.some(
        pattern =>
            pattern.test(text)
    );

}


// ==================================================
// MOVIE / TV AUTO DETECTION
// ==================================================

function detectContentType(text) {

    const lower =
        text.toLowerCase();


    if (
        lower.includes("сериал") ||
        lower.includes("series") ||
        lower.includes("tv show")
    ) {

        return "tv";

    }


    if (
        lower.includes("филм") ||
        lower.includes("movie")
    ) {

        return "movie";

    }


    return null;

}


// ==================================================
// PERSON DETECTION
// ==================================================

function cleanPersonName(name) {

    return name
        .replace(
            /\b(?:след|преди|рейтинг|rating|без|with|after|before)\b.*$/i,
            ""
        )
        .trim();

}


function detectPersonRequests(text) {

    let actor = null;

    let director = null;


    const actorPatterns = [

        /(?:с\s+актьор|актьор|с\s+участието\s+на|actor|starring)\s+([a-zа-яё .'-]+)/i

    ];


    for (
        const pattern
        of actorPatterns
    ) {

        const match =
            text.match(pattern);


        if (match) {

            actor =
                cleanPersonName(
                    match[1]
                );

            break;

        }

    }


    const directorPatterns = [

        /(?:режисьор|режисиран\s+от|director)\s+([a-zа-яё .'-]+)/i,

        /(?:филм\s+на|movie\s+by)\s+([a-zа-яё .'-]+)/i

    ];


    for (
        const pattern
        of directorPatterns
    ) {

        const match =
            text.match(pattern);


        if (match) {

            director =
                cleanPersonName(
                    match[1]
                );

            break;

        }

    }


    return {
        actor,
        director
    };

}


// ==================================================
// ANALYZE SMART SEARCH
// ==================================================

function analyzeSmartSearch(text) {

    const lowerText =
        text
            .toLowerCase()
            .replace(",", ".");


    const detectedType =
        detectContentType(
            lowerText
        );


    const positiveGenreIds = [];

    const negativeGenreIds = [];

    const positiveGenreNames = [];

    const negativeGenreNames = [];


    smartWords.forEach(
        function(group) {

            group.words.forEach(
                function(word) {

                    if (
                        !lowerText.includes(
                            word
                        )
                    ) {

                        return;

                    }


                    const ids =
                        currentMode === "movie"
                            ? group.movieGenres
                            : group.tvGenres;


                    if (
                        wordIsNegative(
                            lowerText,
                            word
                        )
                    ) {

                        ids.forEach(
                            function(id) {

                                if (
                                    !negativeGenreIds.includes(
                                        id
                                    )
                                ) {

                                    negativeGenreIds.push(
                                        id
                                    );

                                }

                            }
                        );


                        if (
                            !negativeGenreNames.includes(
                                group.name
                            )
                        ) {

                            negativeGenreNames.push(
                                group.name
                            );

                        }

                    } else {

                        ids.forEach(
                            function(id) {

                                if (
                                    !positiveGenreIds.includes(
                                        id
                                    )
                                ) {

                                    positiveGenreIds.push(
                                        id
                                    );

                                }

                            }
                        );


                        if (
                            !positiveGenreNames.includes(
                                group.name
                            )
                        ) {

                            positiveGenreNames.push(
                                group.name
                            );

                        }

                    }

                }
            );

        }
    );


    const cleanPositiveGenres =
        positiveGenreIds.filter(
            id =>
                !negativeGenreIds.includes(
                    id
                )
        );


    // MOODS

    const moods = [];

    const moodOverviewWords = [];


    moodGroups.forEach(
        function(group) {

            const found =
                group.words.some(
                    word =>
                        lowerText.includes(
                            word
                        )
                );


            if (!found) {
                return;
            }


            moods.push(
                group.name
            );


            group.overviewWords.forEach(
                function(word) {

                    if (
                        !moodOverviewWords.includes(
                            word
                        )
                    ) {

                        moodOverviewWords.push(
                            word
                        );

                    }

                }
            );

        }
    );


    // THEMES

    const themes = [];

    const themeOverviewWords = [];


    themeGroups.forEach(
        function(group) {

            const found =
                group.userWords.some(
                    word =>
                        lowerText.includes(
                            word
                        )
                );


            if (!found) {
                return;
            }


            themes.push(
                group.name
            );


            group.overviewWords.forEach(
                function(word) {

                    if (
                        !themeOverviewWords.includes(
                            word
                        )
                    ) {

                        themeOverviewWords.push(
                            word
                        );

                    }

                }
            );

        }
    );


    // YEARS

    let minimumYear = null;

    let maximumYear = null;

    let exactYear = null;


    let match =
        lowerText.match(
            /(?:след|after)\s+(19\d{2}|20\d{2})/
        );


    if (match) {

        minimumYear =
            Number(match[1]);

    }


    match =
        lowerText.match(
            /(?:преди|before)\s+(19\d{2}|20\d{2})/
        );


    if (match) {

        maximumYear =
            Number(match[1]);

    }


    match =
        lowerText.match(
            /(?:през|от\s+година|year)\s+(19\d{2}|20\d{2})/
        );


    if (match) {

        exactYear =
            Number(match[1]);

    }


    if (
        lowerText.includes("90-те") ||
        lowerText.includes("90s")
    ) {

        minimumYear = 1990;
        maximumYear = 1999;

    }


    if (
        lowerText.includes("80-те") ||
        lowerText.includes("80s")
    ) {

        minimumYear = 1980;
        maximumYear = 1989;

    }


    if (
        lowerText.includes("2000-те") ||
        lowerText.includes("2000s")
    ) {

        minimumYear = 2000;
        maximumYear = 2009;

    }


    if (
        lowerText.includes("2010-те") ||
        lowerText.includes("2010s")
    ) {

        minimumYear = 2010;
        maximumYear = 2019;

    }


    // RATING

    let targetRating = null;

    let minimumRating = null;

    let maximumRating = null;


    const ratingRange =
        lowerText.match(
            /(?:рейтинг\s*)?(?:между|от)?\s*(\d+(?:\.\d+)?)\s*(?:-|до|и|to)\s*(\d+(?:\.\d+)?)\s*(?:рейтинг|rating)?/
        );


    if (ratingRange) {

        minimumRating =
            Number(
                ratingRange[1]
            );


        maximumRating =
            Number(
                ratingRange[2]
            );

    }


    if (
        minimumRating === null
    ) {

        const patterns = [

            /(?:над|поне|повече\s+от|over|above|at\s+least)\s*(\d+(?:\.\d+)?)\s*(?:рейтинг|rating)?/,

            /(\d+(?:\.\d+)?)\s*\+\s*(?:рейтинг|rating)?/

        ];


        for (
            const pattern
            of patterns
        ) {

            const result =
                lowerText.match(
                    pattern
                );


            if (result) {

                minimumRating =
                    Number(result[1]);

                break;

            }

        }

    }


    if (
        maximumRating === null
    ) {

        const patterns = [

            /(?:под|до|по-малко\s+от|under|below)\s*(\d+(?:\.\d+)?)\s*(?:рейтинг|rating)?/

        ];


        for (
            const pattern
            of patterns
        ) {

            const result =
                lowerText.match(
                    pattern
                );


            if (result) {

                maximumRating =
                    Number(result[1]);

                break;

            }

        }

    }


    if (
        minimumRating === null &&
        maximumRating === null
    ) {

        const patterns = [

            /(?:с\s+)?(?:рейтинг|оценка|rating)\s*(\d+(?:\.\d+)?)/,

            /(\d+(?:\.\d+)?)\s*(?:рейтинг|rating)/,

            /(\d+(?:\.\d+)?)\s*\/\s*10/

        ];


        for (
            const pattern
            of patterns
        ) {

            const result =
                lowerText.match(
                    pattern
                );


            if (result) {

                targetRating =
                    Number(result[1]);

                break;

            }

        }

    }


    // RUNTIME

    let maximumRuntime = null;

    let minimumRuntime = null;


    if (
        currentMode === "movie"
    ) {

        match =
            lowerText.match(
                /(?:до|под|under)\s*(\d{2,3})\s*(?:минути|мин|min|minutes)/
            );


        if (match) {

            maximumRuntime =
                Number(match[1]);

        }


        match =
            lowerText.match(
                /(?:до|под|under)\s*(\d(?:\.\d+)?)\s*(?:часа|час|hour|hours)/
            );


        if (match) {

            maximumRuntime =
                Math.round(
                    Number(match[1]) *
                    60
                );

        }


        if (
            lowerText.includes(
                "кратък филм"
            )
        ) {

            maximumRuntime = 100;

        }


        if (
            lowerText.includes(
                "дълъг филм"
            )
        ) {

            minimumRuntime = 150;

        }

    }


    // SEASONS

    let maximumSeasons = null;

    let minimumSeasons = null;


    if (
        currentMode === "tv"
    ) {

        match =
            lowerText.match(
                /(?:до|максимум|max|under)\s*(\d+)\s*(?:сезона|сезон|seasons)/
            );


        if (match) {

            maximumSeasons =
                Number(match[1]);

        }


        match =
            lowerText.match(
                /(?:над|поне|min|over|at least)\s*(\d+)\s*(?:сезона|сезон|seasons)/
            );


        if (match) {

            minimumSeasons =
                Number(match[1]);

        }


        if (
            lowerText.includes(
                "кратък сериал"
            ) ||
            lowerText.includes(
                "short series"
            )
        ) {

            maximumSeasons = 3;

        }


        if (
            lowerText.includes(
                "много сезони"
            ) ||
            lowerText.includes(
                "long series"
            )
        ) {

            minimumSeasons = 5;

        }

    }


    // COUNTRY

    let country = null;

    let countryName = null;


    countries.forEach(
        function(group) {

            if (
                group.words.some(
                    word =>
                        lowerText.includes(
                            word
                        )
                )
            ) {

                country =
                    group.code;


                countryName =
                    group.name;

            }

        }
    );


    // LANGUAGE

    let language = null;

    let languageName = null;


    languages.forEach(
        function(group) {

            if (
                group.words.some(
                    word =>
                        lowerText.includes(
                            word
                        )
                )
            ) {

                language =
                    group.code;


                languageName =
                    group.name;

            }

        }
    );


    // SIMILAR

    let similarTitle = null;


    const similarPatterns = [

        /(?:нещо\s+като|подобно\s+на|филм\s+като|сериал\s+като)\s+(.+)/i,

        /(?:something\s+like|similar\s+to|movie\s+like|series\s+like)\s+(.+)/i

    ];


    for (
        const pattern
        of similarPatterns
    ) {

        const result =
            text.match(pattern);


        if (result) {

            similarTitle =
                result[1]
                    .trim()
                    .replace(
                        /[.!?]+$/,
                        ""
                    );

            break;

        }

    }


    // POPULARITY

    let popularityPreference =
        "normal";


    if (
        lowerText.includes(
            "популярен"
        ) ||
        lowerText.includes(
            "известен"
        ) ||
        lowerText.includes(
            "popular"
        )
    ) {

        popularityPreference =
            "popular";

    }


    if (
        lowerText.includes(
            "недооценен"
        ) ||
        lowerText.includes(
            "неизвестен"
        ) ||
        lowerText.includes(
            "underrated"
        ) ||
        lowerText.includes(
            "hidden gem"
        )
    ) {

        popularityPreference =
            "underrated";

    }


    const people =
        detectPersonRequests(
            text
        );


    return {

        detectedType,

        positiveGenreIds:
            cleanPositiveGenres,

        negativeGenreIds,

        positiveGenreNames,

        negativeGenreNames,

        moods,

        moodOverviewWords,

        themes,

        themeOverviewWords,

        minimumYear,

        maximumYear,

        exactYear,

        targetRating,

        minimumRating,

        maximumRating,

        maximumRuntime,

        minimumRuntime,

        maximumSeasons,

        minimumSeasons,

        country,

        countryName,

        language,

        languageName,

        similarTitle,

        popularityPreference,

        actor:
            people.actor,

        director:
            people.director

    };

}


// ==================================================
// PERSON SEARCH
// ==================================================

async function findPerson(name) {

    if (!name) {
        return null;
    }


    try {

        const response =
            await fetch(

                `${TMDB_BASE_URL}/search/person?api_key=${TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(name)}&page=1`

            );


        const data =
            await response.json();


        return (
            data.results?.[0] ||
            null
        );


    } catch {

        return null;

    }

}


async function getPersonCredits(
    personName,
    role
) {

    const person =
        await findPerson(
            personName
        );


    if (!person) {
        return [];
    }


    try {

        const response =
            await fetch(

                `${TMDB_BASE_URL}/person/${person.id}/combined_credits?api_key=${TMDB_API_KEY}&language=en-US`

            );


        const data =
            await response.json();


        let results = [];


        if (
            role === "actor"
        ) {

            results =
                data.cast || [];

        }


        if (
            role === "director"
        ) {

            results =
                (data.crew || [])
                    .filter(
                        item =>
                            item.job ===
                            "Director"
                    );

        }


        return results.filter(
            item =>
                item.media_type ===
                currentMode
        );


    } catch {

        return [];

    }

}


// ==================================================
// SIMILAR CONTENT
// ==================================================

async function getSimilarContent(
    title
) {

    try {

        const search =
            await fetch(

                `${TMDB_BASE_URL}/search/${currentMode}?api_key=${TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(title)}&page=1`

            );


        const searchData =
            await search.json();


        if (
            !searchData.results?.length
        ) {

            return [];

        }


        const reference =
            searchData.results[0];


        const response =
            await fetch(

                `${TMDB_BASE_URL}/${currentMode}/${reference.id}/similar?api_key=${TMDB_API_KEY}&language=en-US&page=1`

            );


        const data =
            await response.json();


        return (
            data.results || []
        );


    } catch {

        return [];

    }

}


// ==================================================
// DISCOVER
// ==================================================

async function discoverSmartContent(
    analysis
) {

    let sort =
        "popularity.desc";


    if (
        analysis.targetRating !==
        null ||
        analysis.minimumRating !==
        null
    ) {

        sort =
            "vote_average.desc";

    }


    let url =
        `${TMDB_BASE_URL}/discover/${currentMode}?api_key=${TMDB_API_KEY}&language=en-US&sort_by=${sort}&page=1&vote_count.gte=30`;


    if (
        analysis.positiveGenreIds.length
    ) {

        url +=
            `&with_genres=${analysis.positiveGenreIds.join("|")}`;

    }


    if (
        analysis.negativeGenreIds.length
    ) {

        url +=
            `&without_genres=${analysis.negativeGenreIds.join(",")}`;

    }


    if (
        analysis.country
    ) {

        url +=
            `&with_origin_country=${analysis.country}`;

    }


    if (
        analysis.language
    ) {

        url +=
            `&with_original_language=${analysis.language}`;

    }


    if (
        currentMode === "movie"
    ) {

        if (
            analysis.exactYear
        ) {

            url +=
                `&primary_release_year=${analysis.exactYear}`;

        }


        if (
            analysis.minimumYear
        ) {

            url +=
                `&primary_release_date.gte=${analysis.minimumYear}-01-01`;

        }


        if (
            analysis.maximumYear
        ) {

            url +=
                `&primary_release_date.lte=${analysis.maximumYear}-12-31`;

        }


        if (
            analysis.maximumRuntime
        ) {

            url +=
                `&with_runtime.lte=${analysis.maximumRuntime}`;

        }


        if (
            analysis.minimumRuntime
        ) {

            url +=
                `&with_runtime.gte=${analysis.minimumRuntime}`;

        }

    } else {

        if (
            analysis.exactYear
        ) {

            url +=
                `&first_air_date_year=${analysis.exactYear}`;

        }


        if (
            analysis.minimumYear
        ) {

            url +=
                `&first_air_date.gte=${analysis.minimumYear}-01-01`;

        }


        if (
            analysis.maximumYear
        ) {

            url +=
                `&first_air_date.lte=${analysis.maximumYear}-12-31`;

        }

    }


    if (
        analysis.targetRating !==
        null
    ) {

        const minimum =
            Math.max(
                0,
                analysis.targetRating -
                1.2
            );


        url +=
            `&vote_average.gte=${minimum}`;

    }


    if (
        analysis.minimumRating !==
        null
    ) {

        url +=
            `&vote_average.gte=${analysis.minimumRating}`;

    }


    if (
        analysis.maximumRating !==
        null
    ) {

        url +=
            `&vote_average.lte=${analysis.maximumRating}`;

    }


    try {

        const responses =
            await Promise.all([

                fetch(url),

                fetch(
                    url.replace(
                        "page=1",
                        "page=2"
                    )
                ),

                fetch(
                    url.replace(
                        "page=1",
                        "page=3"
                    )
                )

            ]);


        const all = [];


        for (
            const response
            of responses
        ) {

            const data =
                await response.json();


            all.push(
                ...(data.results || [])
            );

        }


        return all;


    } catch {

        return [];

    }

}


// ==================================================
// TV SEASONS
// ==================================================

async function addTVSeasonData(
    items
) {

    if (
        currentMode !== "tv"
    ) {

        return items;

    }


    const firstItems =
        items.slice(0, 20);


    return await Promise.all(

        firstItems.map(

            async function(item) {

                try {

                    const response =
                        await fetch(

                            `${TMDB_BASE_URL}/tv/${item.id}?api_key=${TMDB_API_KEY}&language=en-US`

                        );


                    const data =
                        await response.json();


                    return {

                        ...item,

                        number_of_seasons:
                            data.number_of_seasons

                    };


                } catch {

                    return item;

                }

            }

        )

    );

}


// ==================================================
// FILTER
// ==================================================

function itemPassesFilters(
    item,
    analysis
) {

    const genres =
        item.genre_ids || [];


    const blocked =
        analysis.negativeGenreIds.some(
            id =>
                genres.includes(id)
        );


    if (blocked) {
        return false;
    }


    const date =
        currentMode === "movie"
            ? item.release_date
            : item.first_air_date;


    const year =
        date
            ? Number(
                date.substring(0, 4)
            )
            : null;


    if (
        analysis.exactYear &&
        year !== analysis.exactYear
    ) {

        return false;

    }


    if (
        analysis.minimumYear &&
        year &&
        year <
        analysis.minimumYear
    ) {

        return false;

    }


    if (
        analysis.maximumYear &&
        year &&
        year >
        analysis.maximumYear
    ) {

        return false;

    }


    if (
        analysis.minimumRating !==
        null &&
        item.vote_average <
        analysis.minimumRating
    ) {

        return false;

    }


    if (
        analysis.maximumRating !==
        null &&
        item.vote_average >
        analysis.maximumRating
    ) {

        return false;

    }


    if (
        analysis.targetRating !==
        null
    ) {

        const difference =
            Math.abs(
                item.vote_average -
                analysis.targetRating
            );


        if (
            difference > 1.2
        ) {

            return false;

        }

    }


    if (
        currentMode === "tv"
    ) {

        if (
            analysis.maximumSeasons &&
            item.number_of_seasons &&
            item.number_of_seasons >
            analysis.maximumSeasons
        ) {

            return false;

        }


        if (
            analysis.minimumSeasons &&
            item.number_of_seasons &&
            item.number_of_seasons <
            analysis.minimumSeasons
        ) {

            return false;

        }

    }


    return true;

}


// ==================================================
// SCORE
// ==================================================

function scoreResults(
    items,
    analysis
) {

    return items

        .filter(
            item =>
                itemPassesFilters(
                    item,
                    analysis
                )
        )

        .map(
            function(item) {

                let score = 0;

                let possible = 0;


                const genres =
                    item.genre_ids || [];


                analysis.positiveGenreIds.forEach(
                    function(id) {

                        possible += 6;


                        if (
                            genres.includes(id)
                        ) {

                            score += 6;

                        }

                    }
                );


                const overview =
                    (
                        item.overview || ""
                    )
                        .toLowerCase();


                if (
                    analysis.moodOverviewWords.length
                ) {

                    possible += 5;


                    const matches =
                        analysis.moodOverviewWords.filter(
                            word =>
                                overview.includes(
                                    word
                                )
                        ).length;


                    score +=
                        Math.min(
                            5,
                            matches
                        );

                }


                if (
                    analysis.themeOverviewWords.length
                ) {

                    possible += 8;


                    const matches =
                        analysis.themeOverviewWords.filter(
                            word =>
                                overview.includes(
                                    word
                                )
                        ).length;


                    score +=
                        Math.min(
                            8,
                            matches * 2
                        );

                }


                if (
                    analysis.targetRating !==
                    null
                ) {

                    possible += 10;


                    const difference =
                        Math.abs(
                            item.vote_average -
                            analysis.targetRating
                        );


                    score +=
                        Math.max(
                            0,
                            10 -
                            difference * 8
                        );

                }


                if (
                    analysis.minimumRating !==
                    null
                ) {

                    possible += 5;


                    if (
                        item.vote_average >=
                        analysis.minimumRating
                    ) {

                        score += 5;

                    }

                }


                possible += 3;


                if (
                    item.vote_average >= 8
                ) {

                    score += 3;

                } else if (
                    item.vote_average >= 7
                ) {

                    score += 2;

                } else {

                    score += 1;

                }


                if (
                    analysis.popularityPreference ===
                    "popular"
                ) {

                    possible += 5;


                    if (
                        item.vote_count >= 5000
                    ) {

                        score += 5;

                    } else if (
                        item.vote_count >= 1000
                    ) {

                        score += 3;

                    }

                }


                if (
                    analysis.popularityPreference ===
                    "underrated"
                ) {

                    possible += 5;


                    if (
                        item.vote_average >= 7 &&
                        item.vote_count >= 50 &&
                        item.vote_count <= 2000
                    ) {

                        score += 5;

                    }

                }


                if (
                    possible === 3
                ) {

                    possible = 10;


                    score +=
                        Math.min(
                            7,
                            item.vote_average
                        );

                }


                let matchPercent =
                    Math.round(
                        (
                            score /
                            possible
                        ) *
                        100
                    );


                matchPercent =
                    Math.max(
                        50,
                        Math.min(
                            99,
                            matchPercent
                        )
                    );


                return {

                    ...item,

                    smartScore:
                        score,

                    matchPercent:
                        matchPercent

                };

            }
        )

        .sort(
            function(a, b) {

                if (
                    b.smartScore !==
                    a.smartScore
                ) {

                    return (
                        b.smartScore -
                        a.smartScore
                    );

                }


                return (
                    b.vote_average -
                    a.vote_average
                );

            }
        );

}


// ==================================================
// INTERSECTION
// ==================================================

function intersectById(
    first,
    second
) {

    const ids =
        new Set(
            second.map(
                item =>
                    item.id
            )
        );


    return first.filter(
        item =>
            ids.has(item.id)
    );

}


// ==================================================
// SMART INFO
// ==================================================

function showSmartAnalysis(
    analysis
) {

    const parts = [];


    if (
        analysis.positiveGenreNames.length
    ) {

        parts.push(
            `<strong>Genres:</strong> ${analysis.positiveGenreNames.join(" • ")}`
        );

    }


    if (
        analysis.negativeGenreNames.length
    ) {

        parts.push(
            `<strong>Avoid:</strong> ${analysis.negativeGenreNames.join(" • ")}`
        );

    }


    if (
        analysis.moods.length
    ) {

        parts.push(
            `<strong>Mood:</strong> ${analysis.moods.join(" • ")}`
        );

    }


    if (
        analysis.themes.length
    ) {

        parts.push(
            `<strong>Theme:</strong> ${analysis.themes.join(" • ")}`
        );

    }


    if (
        analysis.countryName
    ) {

        parts.push(
            `<strong>Country:</strong> ${analysis.countryName}`
        );

    }


    if (
        analysis.languageName
    ) {

        parts.push(
            `<strong>Language:</strong> ${analysis.languageName}`
        );

    }


    if (
        analysis.actor
    ) {

        parts.push(
            `<strong>Actor:</strong> ${analysis.actor}`
        );

    }


    if (
        analysis.director
    ) {

        parts.push(
            `<strong>Director:</strong> ${analysis.director}`
        );

    }


    if (
        analysis.exactYear
    ) {

        parts.push(
            `<strong>Year:</strong> ${analysis.exactYear}`
        );

    } else if (
        analysis.minimumYear &&
        analysis.maximumYear
    ) {

        parts.push(
            `<strong>Years:</strong> ${analysis.minimumYear}–${analysis.maximumYear}`
        );

    } else if (
        analysis.minimumYear
    ) {

        parts.push(
            `<strong>After:</strong> ${analysis.minimumYear}`
        );

    } else if (
        analysis.maximumYear
    ) {

        parts.push(
            `<strong>Before:</strong> ${analysis.maximumYear}`
        );

    }


    if (
        analysis.targetRating !==
        null
    ) {

        parts.push(
            `<strong>Rating near:</strong> ${analysis.targetRating}`
        );

    }


    if (
        analysis.minimumRating !==
        null
    ) {

        parts.push(
            `<strong>Rating:</strong> ${analysis.minimumRating}+`
        );

    }


    if (
        analysis.maximumRating !==
        null
    ) {

        parts.push(
            `<strong>Max rating:</strong> ${analysis.maximumRating}`
        );

    }


    if (
        analysis.maximumRuntime
    ) {

        parts.push(
            `<strong>Max length:</strong> ${analysis.maximumRuntime} min`
        );

    }


    if (
        analysis.minimumRuntime
    ) {

        parts.push(
            `<strong>Min length:</strong> ${analysis.minimumRuntime} min`
        );

    }


    if (
        analysis.maximumSeasons
    ) {

        parts.push(
            `<strong>Max seasons:</strong> ${analysis.maximumSeasons}`
        );

    }


    if (
        analysis.minimumSeasons
    ) {

        parts.push(
            `<strong>Min seasons:</strong> ${analysis.minimumSeasons}`
        );

    }


    if (
        analysis.similarTitle
    ) {

        parts.push(
            `<strong>Similar to:</strong> ${analysis.similarTitle}`
        );

    }


    if (
        analysis.popularityPreference ===
        "underrated"
    ) {

        parts.push(
            "<strong>Preference:</strong> Underrated"
        );

    }


    if (
        analysis.popularityPreference ===
        "popular"
    ) {

        parts.push(
            "<strong>Preference:</strong> Popular"
        );

    }


    if (
        !parts.length
    ) {

        parts.push(
            "<strong>General recommendations</strong>"
        );

    }


    smartSearchInfo.innerHTML =
        "✦ " +
        parts.join(
            " &nbsp; • &nbsp; "
        );


    smartSearchInfo.style.display =
        "block";

}


// ==================================================
// SMART SEARCH
// ==================================================

async function smartSearch() {

    const text =
        searchInput.value.trim();


    if (!text) {
        return;
    }


    const detected =
        detectContentType(
            text
        );


    if (
        detected &&
        detected !==
        currentMode
    ) {

        currentMode =
            detected;


        if (
            currentMode === "movie"
        ) {

            moviesModeButton.classList.add(
                "active"
            );

            tvModeButton.classList.remove(
                "active"
            );

        } else {

            tvModeButton.classList.add(
                "active"
            );

            moviesModeButton.classList.remove(
                "active"
            );

        }

    }


    const analysis =
        analyzeSmartSearch(
            text
        );


    searchResultLabel.textContent =
        "SMART RECOMMENDATIONS";


    searchResultsTitle.textContent =
        "CineMind recommends";


    searchResultsSection.style.display =
        "block";


    searchResultsList.innerHTML =
        "<p>Finding the best matches...</p>";


    randomPickButton.style.display =
        "none";


    showSmartAnalysis(
        analysis
    );


    try {

        let items = [];


        if (
            analysis.similarTitle
        ) {

            items =
                await getSimilarContent(
                    analysis.similarTitle
                );

        }


        let actorItems =
            null;


        if (
            analysis.actor
        ) {

            actorItems =
                await getPersonCredits(
                    analysis.actor,
                    "actor"
                );

        }


        let directorItems =
            null;


        if (
            analysis.director
        ) {

            directorItems =
                await getPersonCredits(
                    analysis.director,
                    "director"
                );

        }


        if (
            actorItems &&
            directorItems
        ) {

            items =
                intersectById(
                    actorItems,
                    directorItems
                );

        } else if (
            actorItems
        ) {

            items =
                actorItems;

        } else if (
            directorItems
        ) {

            items =
                directorItems;

        }


        if (
            !items.length
        ) {

            items =
                await discoverSmartContent(
                    analysis
                );

        }


        if (
            currentMode === "tv" &&
            (
                analysis.maximumSeasons ||
                analysis.minimumSeasons
            )
        ) {

            items =
                await addTVSeasonData(
                    items
                );

        }


        const scored =
            scoreResults(
                items,
                analysis
            );


        lastSmartResults =
            scored.slice(
                0,
                12
            );


        renderList(
            searchResultsList,
            lastSmartResults
        );


        if (
            lastSmartResults.length
        ) {

            randomPickButton.style.display =
                "inline-flex";


            randomPickButton.textContent =
                "🎲 Pick one for me";

        }


        scrollToResults();


    } catch (error) {

        console.error(
            "Smart Search error:",
            error
        );


        searchResultsList.innerHTML = `

            <div class="search-empty">

                <h3>
                    Smart Search failed
                </h3>

                <p>
                    Try changing your description.
                </p>

            </div>

        `;

    }

}


// ==================================================
// RANDOM SMART PICK
// ==================================================

function randomPick() {

    if (
        !lastSmartResults.length
    ) {

        return;

    }


    const best =
        lastSmartResults.slice(
            0,
            Math.min(
                5,
                lastSmartResults.length
            )
        );


    const selected =
        best[
            Math.floor(
                Math.random() *
                best.length
            )
        ];


    searchResultLabel.textContent =
        "🎲 RANDOM PICK";


    searchResultsTitle.textContent =
        "CineMind picked this for you";


    renderList(
        searchResultsList,
        [selected]
    );


    randomPickButton.textContent =
        "🎲 Pick again";

}


// ==================================================
// RUN SEARCH
// ==================================================

function runSearch() {

    if (
        currentSearchMode ===
        "title"
    ) {

        titleSearch();

    } else {

        smartSearch();

    }

}


// ==================================================
// SCROLL
// ==================================================

function scrollToResults() {

    searchResultsSection.scrollIntoView({

        behavior:
            "smooth"

    });

}


// ==================================================
// EVENTS
// ==================================================

moviesModeButton.addEventListener(
    "click",

    function() {

        currentMode =
            "movie";


        loadCurrentMode();

    }
);


tvModeButton.addEventListener(
    "click",

    function() {

        currentMode =
            "tv";


        loadCurrentMode();

    }
);


titleSearchMode.addEventListener(
    "click",

    function() {

        currentSearchMode =
            "title";


        updateSearchMode();

    }
);


smartSearchMode.addEventListener(
    "click",

    function() {

        currentSearchMode =
            "smart";


        updateSearchMode();

    }
);


searchButton.addEventListener(
    "click",
    runSearch
);


searchInput.addEventListener(
    "keydown",

    function(event) {

        if (
            event.key === "Enter"
        ) {

            runSearch();

        }

    }
);


randomPickButton.addEventListener(
    "click",
    randomPick
);


featuredAnotherButton.addEventListener(
    "click",
    showRandomFeatured
);


clearSearchButton.addEventListener(
    "click",

    function() {

        searchInput.value =
            "";


        searchResultsSection.style.display =
            "none";


        smartSearchInfo.style.display =
            "none";


        randomPickButton.style.display =
            "none";


        lastSmartResults = [];

    }
);


// ==================================================
// START
// ==================================================

loadCurrentMode();