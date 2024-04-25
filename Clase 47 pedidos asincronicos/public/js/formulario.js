window.onload = async () => {
    const titleInput = document.querySelector('#title');
    const ratingInput = document.querySelector('#rating');
    const awardsInput = document.querySelector('#awards');
    const releaseDateInput = document.querySelector('#release_date');
    const lengthInput = document.querySelector('#length');
    const editButton = document.querySelector('.edit-button');
    const deleteButton = document.querySelector('.delete-button');
    const addButton = document.querySelector('#add-button');
    const form = document.querySelector('.movie-form');
    const path = window.location.pathname;
    const movieId = path.match(/\/([^\/]*)$/)[1];
    const inputs = document.querySelectorAll('input');

    function validateInput(input) {
        input.addEventListener('blur', () => {
            if (!input.value.trim()) {
                input.style.backgroundColor = 'red';
            } else {
                input.style.backgroundColor = 'white';
            }
        });
    }

    inputs.forEach(input => {
        validateInput(input);
    });

    
    addButton.addEventListener('click', async (e) => {
        e.preventDefault();
        
        const newMovie = {
            title: titleInput.value,
            rating: ratingInput.value,
            awards: awardsInput.value,
            release_date: releaseDateInput.value,
            length: lengthInput.value,
        };

        try {
            const response = await fetch(`http://localhost:3002/api/movies/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newMovie)
            });

            if (response.ok) {
                location.href = `/`;
                console.log('Se creo la pelicula', `${movieId}`);
            } else {
                console.error('error', response.status);
            }
        } catch (error) {
            console.error("error", error);
        }
    });

    if (path.includes('update')) {
        console.log('estas editando la pelicula');
        try {
            const response = await fetch(`http://localhost:3002/api/movies/${movieId}`);
            const data = await response.json();
            const movie = data.data;
            titleInput.value = movie.title;
            ratingInput.value = movie.rating;
            awardsInput.value = movie.awards;
            releaseDateInput.value = movie.release_date.split('T')[0];
            lengthInput.value = movie.length;

            editButton.addEventListener('click', async (e) => {
                e.preventDefault();
                const updatedMovie = {
                    title: titleInput.value,
                    rating: ratingInput.value,
                    awards: awardsInput.value,
                    release_date: releaseDateInput.value,
                    length: lengthInput.value,
                };

                const response = await fetch(`http://localhost:3002/api/movies/update/${movieId}`, {
                    method: 'PUT',
                    headers: {
                        'content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedMovie)
                });

                if (response.ok) {
                    location.href = `/`;
                    console.log('Se actualizo la pelicula', `${movieId}`);
                } else {
                    console.error('error actualizando', response.status);
                }
            });

            deleteButton.addEventListener('click', async (e) => {
                e.preventDefault();
                const confirmDelete = confirm('¿Quieres eliminar la película?');
                if (confirmDelete) {
                    const response = await fetch(`http://localhost:3002/api/movies/delete/${movieId}`, {
                        method: 'DELETE'
                    });
                    if (response.ok) {
                        location.href = `/`;
                        console.log('Se elimino la pelicula', `${movieId}`);
                    } else {
                        console.error('error', response.status);
                    }
                }
            });
        } catch (error) {
            console.error("error", error);
        }
    }
};
