const API_KEY = '5a5e8618cb4027ecea1156624f658d44';

/**
 * Запрос данных по URL
 * @param url - URL
 * @returns данные в формате JSON
 */
async function fetchData(url) {
    try {
        const response = await fetch(url);

        if (response.status === 200)
            return response.json();
        else
            throw new Error(`Fetch data error. Response: ${response.status}`);
    } catch (e) {
        alert(e);
    }
}

/**
 * Добавление артиста
 * @param name - имя артиста
 * @param tags - жанры артиста
 * @param image - изображение артиста
 */
function addArtist(name, tags, image) {
    const div = document.createElement('div');
    div.className = 'artists-artist';

    const artistImage = document.createElement('img');
    artistImage.src = image;
    artistImage.className = 'artist-image';

    const artistName = document.createElement('h4');
    artistName.textContent = name;
    artistName.className = 'artist-name';

    const artistTags = document.createElement('h4');
    artistTags.textContent = tags;
    artistTags.className = 'artist-genres';

    div.append(artistImage, artistName, artistTags);
    document.getElementById('artists').append(div);
}

/**
 * Добавление трека
 * @param name - название трека
 * @param artist - имя артиста
 * @param tags - жанры артиста
 * @param image - обложка трека
 */
function addTrack(track, artist, tags, image) {
    const div = document.createElement('div');
    div.className = 'tracks-track';

    const trackImage = document.createElement('img');
    trackImage.src = image;
    trackImage.className = 'track-image';

    const trackInfo = document.createElement('div');
    trackInfo.className = 'track-info';

    const trackName = document.createElement('h4');
    trackName.textContent = track;
    trackName.className = 'track-name';

    const artistName = document.createElement('h4');
    artistName.textContent = artist;
    artistName.className = 'artist-name';

    const trackGenres = document.createElement('h4');
    trackGenres.textContent = tags;
    trackGenres.className = 'track-genres';

    trackInfo.append(trackName, artistName, trackGenres);
    div.append(trackImage, trackInfo);
    document.getElementById('tracks').append(div);
}

/**
 * Запрос данных о популярных артистах
 */
async function fetchTopArtists() {
    const data = await fetchData(`http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&limit=10&api_key=${API_KEY}&format=json`);
    const artists = data.artists.artist;

    for (const artist of artists) {
        const name = artist.name;
        const tagsData = await fetchData(`http://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist=${artist.name}&api_key=${API_KEY}&format=json`);
        const tags = tagsData.toptags.tag.map((tag) => tag.name).slice(0, 3).join(', ');
        const image = artist.image[2]["#text"];

        addArtist(name, tags, image);
    }
}

/**
 * Запрос данных о популярных треках
 */
async function fetchTopTracks() {
    const data = await fetchData(`http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&limit=8&api_key=${API_KEY}&format=json`);
    const tracks = data.tracks.track;

    for (const track of tracks) {
        const trackName = track.name;
        const artist = track.artist.name;
        const image = track.image[2]["#text"];
        const tagsData = await fetchData(`https://ws.audioscrobbler.com/2.0/?method=track.gettoptags&artist=${artist}&track=${trackName}&api_key=${API_KEY}&format=json`);
        const tags = tagsData.hasOwnProperty('error') ?
                     '' :
                     tagsData.toptags.tag.map((tag) => tag.name).slice(0, 3).join(', ');

        addTrack(trackName, artist, tags, image);
    }
}

fetchTopArtists();
fetchTopTracks();