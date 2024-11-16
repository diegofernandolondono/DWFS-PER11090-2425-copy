// Referencia al botón y al párrafo
const jokeButton = document.getElementById('jokeButton');
const jokeParagraph = document.getElementById('jokeParagraph');

// Función para obtener un chiste aleatorio de la API de Chuck Norris
function fetchJoke() {
    // URL de la API
    const apiUrl = 'https://api.chucknorris.io/jokes/random';

    // Llamada a la API utilizando Fetch
    fetch(apiUrl)
        .then(response => {
            // Asegurarse de que la respuesta es correcta
            if (!response.ok) {
                throw new Error('Error al obtener el chiste');
            }
            return response.json(); // Convertir respuesta a JSON
        })
        .then(data => {
            // Mostrar el chiste en el párrafo
            jokeParagraph.innerHTML = data.value;
        })
        .catch(error => {
            // Manejo de errores
            jokeParagraph.innerHTML = 'Error: no se pudo obtener ningún chiste...';
            console.error('Error:', error);
        });
}

// Asignar evento click al botón
jokeButton.addEventListener('click', fetchJoke);