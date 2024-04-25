window.onload = async () => {
  const app = document.getElementById("root");
  const container = document.querySelector(".container");

  try {
     
      let peliculasFav = localStorage.getItem('peliculasFav');
      peliculasFav = peliculasFav ? JSON.parse(peliculasFav) : {};

      for (const movieId in peliculasFav) {
          if (peliculasFav.hasOwnProperty(movieId)) {

              try {
                  const response = await fetch(`http://localhost:3002/api/movies/${movieId}`);
                  const data = await response.json();
                  const movie = data.data;

                  const card = document.createElement("div");
                  card.setAttribute("class", "card");

                  const h1 = document.createElement("h1");
                  h1.textContent = movie.title;

                  const p = document.createElement("p");
                  p.textContent = `Rating: ${movie.rating}`;

                  const duracion = document.createElement("p");
                  duracion.textContent = `Duración: ${movie.length}`;

                  const favorito = heartIcon(movie.id, peliculasFav);

                  container.appendChild(card);
                  card.appendChild(h1);
                  card.appendChild(p);
                  card.appendChild(duracion);
                  card.appendChild(favorito);
              } catch (error) {
                  console.error("error", error);
              }
          }
      }
  } catch (error) {
      console.log("error", error);
  }
};
  
    function heartIcon(movieId, peliculasFav) {
      const favorito = document.createElement('i');
      favorito.id = movieId;
      favorito.classList.add('fas');
      favorito.classList.add('fa-star');
      favorito.style.color = 'yellow';

      favorito.addEventListener('click',(e) => {
          e.stopPropagation();
          e.preventDefault();

      delete peliculasFav[movieId];
          localStorage.setItem('peliculasFav', JSON.stringify(peliculasFav));

      const card = favorito.closest('.card');
          card.parentNode.removeChild(card);
    });

    return favorito;
}
