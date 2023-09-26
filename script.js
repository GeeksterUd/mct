const APIURL = "https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI ="https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById("content");
const search = document.getElementById("input");
const btn = document.getElementById("btn")
getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    showMovies(respData.results);
}

function showMovies(movies) {
    main.innerHTML = "";
    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
            <img onclick="window.open('result.html','_self');" class="img" src="${IMGPATH + poster_path}"/>
            <div class="movie-info">
                <h3>${title}</h3>
            </div>
                <span class="vote">Rating : ${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `;
        main.appendChild(movieEl);
    });
}

btn.addEventListener("click", (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    console.log(searchTerm);
    const notFound=document.getElementById("not-found")
    notFound.innerText="";
    if(searchTerm.trim().length === 0){
        var error1 = document.createElement("p");
        error1.classList.add("e")
        error1.innerText="Enter Movie Title";
        notFound.append(error1);
    }
    else if(searchTerm){
        getMovies(SEARCHAPI + searchTerm);
        search.value = "";
    }
    else{
        var error2 = document.createElement("p");
        error2.classList.add('e')
        error2.innerText='Invalid Movie name';
        notFound.append(error2);
    }
});
