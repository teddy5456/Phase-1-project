const searchBtn = document.getElementById('search-btn');
const movieList = document.getElementById('movies');
const movieDetailsContent = document.querySelector('.movie-details-content');
const infoCloseBtn = document.querySelector('.btn-close');
const getVideos = document.querySelector('.movie-trailer');
const closeBtn = document.querySelector('#btn-close');
const searchInput = document.getElementById("search-input");
const movieDetails = document.querySelector('.movie-details')



document.addEventListener('DOMContentLoaded', function() {

    //event listeners
    searchBtn.addEventListener('click', getMovieList);
    movieList.addEventListener('click', getMovieDetails);
    infoCloseBtn.addEventListener('click', closeDetails);
    infoCloseBtn.addEventListener('click', () => {
      movieDetailsContent.parentElement.classList.remove('showDetails');
    });



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
        const movieId = e.target.dataset.id; 
        const mediaType = e.target.dataset.type;
        let apiUrl;
    
        if (mediaType === 'movie') {
          apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=b2ef1799992ce938b1ada1c064f8cdb7&language=en-US`;
        } else if (mediaType === 'tv') {
          apiUrl = `https://api.themoviedb.org/3/tv/${movieId}?api_key=b2ef1799992ce938b1ada1c064f8cdb7&language=en-US`;
        } else {
          console.error('Invalid media type:', mediaType);
          return;
        }
    
        fetch(apiUrl)
          .then(res => res.json())
          .then(data => {
            movieDetailsModal(data, mediaType);
          })
          .catch(error => console.error('Error:', error));
      }
    }
    
});

function movieDetailsModal(data) {
  console.log(data);
  fetch(`https://api.themoviedb.org/3/movie/${data.id}/videos?api_key=b2ef1799992ce938b1ada1c064f8cdb7&language=en-US`)
      .then(res => res.json())
      .then(dataVideos => {
          let videoKey = "";
          if (dataVideos.results && dataVideos.results.length > 0) {
              videoKey = dataVideos.results[0].key;
          }
          let html= `
              <h2 class="movie-title-details">${data.original_title}</h2>
              <p class="movie-category">Category:</p>
              <h2 class="description-head">Description:</h2>
              <p class="Description">${data.overview}</p>
              </div>
              <div class="movie-poster-details">
                  <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.original_title}" class="info-image">
              </div>
              <div class="cast-list">
                <h2 class="cast-head">Cast:</h2>
              `;
              
          fetch(`https://api.themoviedb.org/3/movie/${data.id}/credits?api_key=b2ef1799992ce938b1ada1c064f8cdb7`)
              .then(res => res.json())
              .then(dataCredits => {
                  if (dataCredits.cast && dataCredits.cast.length > 0) {
                      dataCredits.cast.slice(0, 5).forEach(cast => {
                          html += `
                          <div class="cast-list">
                          <div class="cast-profile">
                              <img src="https://image.tmdb.org/t/p/w500${cast.profile_path}" alt="${cast.name}">
                          </div>
                          <div class="cast-name">
                            <h3 class="name-text">${cast.name}</h3>
                            <p class="cast-character">${cast.character}</p>
                          </div>
                        </div>
                          `;
                      });
                  } else {
                      html += "<p>No cast information available.</p>";
                  }
                  
                  html += `
                      </div>
                      <div class="movie-trailer">
                          <a href="https://www.youtube.com/watch?v=${videoKey}" target="_blank">Watch video</a>
                      </div>
                  `;
                  movieDetailsContent.innerHTML = html;
                  movieDetails.parentElement.classList.add('showDetails');
                  movieDetails.style.display = "block";
                  
              })
              .catch(error => console.error('Error:', error));
      })
      .catch(error => console.error('Error:', error));
}
 

infoCloseBtn.addEventListener('click', function() {
  movieDetails.style.display = "none";
});
