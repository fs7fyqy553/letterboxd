async function getRandomFilmDetailsObject() {
    try {
        const response = await fetch("http://localhost:3000/api/films?numberOfRandomFilms=1");
        const data = await response.json();
        return data[0];
    } catch(err) {
        console.log(err);
    }
}

export default getRandomFilmDetailsObject;
