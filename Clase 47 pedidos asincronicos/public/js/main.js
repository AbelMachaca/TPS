window.onload = async () => {
    const app = document.getElementById("root");
    const container = document.querySelector(".container");
    const header = document.querySelector('.header')

    try {
        const response = await fetch('http://localhost:3002/api/movies');
        const peliculas = await response.json();

        let data = peliculas.data;

        let peliculasFav = localStorage.getItem('peliculasFav');
        peliculasFav = peliculasFav ? JSON.parse(peliculasFav) : {};

        data.forEach((movie) => {
            const card = document.createElement("div");
            card.style.cursor = 'pointer';
            card.setAttribute("class", "card");

            card.addEventListener('click', () => {
                window.location.href = `/movies/update/${movie.id}`;
            });

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
        });
    } catch (error) {
        console.log("error", error);
    }
};

function heartIcon(movieId, peliculasFav) {
    const favorito = document.createElement('i');
    favorito.id = movieId;
    favorito.classList.add('fa-star');
    favorito.classList.add('far');

    const addToFavoritesIcon = document.createElement('i');
    addToFavoritesIcon.style.marginLeft = '5px';

    favorito.appendChild(addToFavoritesIcon);

    if (peliculasFav[movieId]) {
        favorito.classList.remove('far');
        favorito.classList.add('fas');
        favorito.style.color = 'yellow';
    }

    favorito.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (peliculasFav[movieId]) {
            delete peliculasFav[movieId];
            favorito.classList.remove('fas');
            favorito.classList.add('far');
            favorito.style.color = '';
        } else {
            peliculasFav[movieId] = true;
            favorito.classList.remove('far');
            favorito.classList.add('fas');
            favorito.style.color = 'yellow';
        }
        localStorage.setItem('peliculasFav', JSON.stringify(peliculasFav));
    });

    return favorito;
}
