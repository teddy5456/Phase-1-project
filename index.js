document.addEventListener('DOMContentLoaded', function() {
	const searchBtn = document.getElementById('search-btn');
	const movieList = document.getElementById('movies');
	const movieDetails = document.querySelector('.movie-details-content');
	const infoCloseBtn = document.getElementById('btn-close');
  
	//event listeners
	searchBtn.addEventListener('click', getMovieList);
  
	//get movie list that matches the search
	function getMovieList() {
		let searchInputText = document.getElementById('search-bar').value.trim();
		 
		fetch(`https://api.themoviedb.org/3/search/movie?api_key=b2ef1799992ce938b1ada1c064f8cdb7&language=en-US&query=${searchInputText}&page=1&include_adult=false`)
			.then(response => response.json())
			.then(data => {
				let html = "";
				if(data.results){
				  data.results.forEach(data => {
					html += `
					  <div class="movie-results">
						<div class="movie-poster">
						  <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.title}">
						</div>
						<div class="movie-title">
						  <h3 class="title-text">${data.title}</h3>
						  <a href="#" class="info-btn">Get More Info</a>
						</div>
					  </div>
					`;
				  });
				} else {
				  html = "No results found";
				}
				movieList.innerHTML = html;
			  })
			  
	}
});
