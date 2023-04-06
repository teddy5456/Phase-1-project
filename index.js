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
	  const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': 'cd1c5eef93msh44b8ea132228de9p1368ecjsnc67e72425701',
			'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
		}
	};
	
	fetch(`https://moviesdatabase.p.rapidapi.com/titles/search/keyword/${searchInputText}`, options)
		.then(response => response.json())
		.then(data => {
			console. log(data)
		})
		.catch(err => console.error(err));
	}
  });
  