const searchBtn = document.getElementById('search-btn');
const movieList = document.getElementById('movies');
const movieDetails = document.querySelector('.movie-details');
const infoCloseBtn = document.querySelector('.btn-close');


document.addEventListener('DOMContentLoaded', function() {

    //event listeners
    searchBtn.addEventListener('click', getMovieList);
    movieList.addEventListener('click', getMovieDetails);
	infoCloseBtn.addEventListener('click', () => {
        movieDetails.parentElement.classList.remove('showDetails');
	})

    //get movie list that matches the search
    function getMovieList() {
        let searchInputText = document.getElementById('search-bar').value.trim();

        fetch(`https://api.themoviedb.org/3/search/multi?api_key=b2ef1799992ce938b1ada1c064f8cdb7&language=en-US&query=${searchInputText}&page=1&include_adult=false`)
            .then(response => response.json())
            .then(data => {
                let html = "";
                if (data.results && data.results.length > 0) {
                    data.results.forEach(result => {
                        if (result.media_type === "movie") {
                            html += `
                            <div class="movie-results">
                              <div class="movie-poster">
                                <img src="https://image.tmdb.org/t/p/w500${result.poster_path}" alt="${result.title}">
                              </div>
                              <div class="movie-title">
                                <h3 class="title-text">${result.title}</h3>
                                <a href="#" class="info-btn" data-id="${result.id}" data-type="movie">Get More Info</a>
                              </div>
                            </div>
                            `;
                        } else if (result.media_type === "tv") {
                            html += `
                            <div class="movie-results">
                              <div class="movie-poster">
                                <img src="https://image.tmdb.org/t/p/w500${result.poster_path}" alt="${result.name}">
                              </div>
                              <div class="movie-title">
                                <h3 class="title-text">${result.name}</h3>
                                <a href="#" class="info-btn" data-id="${result.id}" data-type="tv">Get More Info</a>
                              </div>
                            </div>
                            `;
                        }
                    });
                } else {
                    html = "No results found";
                }
                movieList.innerHTML = html;
            })
            .catch(error => console.error('Error:', error));
    }

    //get movie details
	function getMovieDetails(e) {
		e.preventDefault();
		if (e.target.classList.contains('info-btn')) {
			movieId = e.target.dataset.id; // initialize movieId
			fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=b2ef1799992ce938b1ada1c064f8cdb7&language=en-US`)
				.then(res => res.json())
				.then(data => {
					movieDetailsModal(data);
				})
				.catch(error => console.error('Error:', error));
		}
	}
});

//create a modal
function movieDetailsModal(data) {
    console.log(data);
    let html= `

        <h2 class="movie-title-details">${data.original_title}</h2>
        <p class="movie-category">Category:</p>
        <h2 class="description-head">Description:</h2>
        <p class="Description">${data.overview}</p>
        </div>
        <div class="movie-poster-details">
        <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.original_title}" class="info-image">
        </div>
        <div class="movie-trailer">
        <a href="#" target="_blank">Watch video</a>
        </div>
    `;
    movieDetails.innerHTML = html;
    movieDetails.parentElement.classList.add('showDetails');
    movieDetails.style.display = "block";
}

   
