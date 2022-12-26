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
 * Очистка всех секций перед запросом
 */
function clear() {
    document.getElementById('artists').innerHTML = '';
    document.getElementById('albums').innerHTML = '';
    document.getElementById('tracks').innerHTML = '';
}

/**
 * Добавление артиста
 * @param name - имя артиста
 * @param listeners - количество слушателей
 * @param image - изображение артиста
 */
function addArtist(name, listeners, image) {
    const div = document.createElement('div');
    div.className = 'artists-artist'

    const artistInfo = document.createElement('div');
    artistInfo.className = 'artist-info'

    const artistName = document.createElement('h4');
    artistName.textContent = name;
    artistName.className = 'artist-name'

    const artistListeners = document.createElement('h4');
    artistListeners.textContent = listeners;
    artistListeners.className = 'artist-listeners'

    const artistImage = document.createElement('img');
    artistImage.src = image;

    artistInfo.append(artistName, artistListeners);
    div.append(artistImage, artistInfo);
    document.getElementById('artists').append(div);
}

/**
 * Добавление альбома
 * @param name - название альбома
 * @param artist - имя артиста
 * @param image - изображение альбома
 */
function addAlbum(name, artist, image) {
    const div = document.createElement('div');
    div.className = 'albums-album'

    const albumInfo = document.createElement('div');
    albumInfo.className = 'album-info'

    const albumName = document.createElement('h4');
    albumName.textContent = name;
    albumName.className = 'album-name'

    const artistName = document.createElement('h4');
    artistName.textContent = artist;
    artistName.className = 'artist-name'

    const albumImage = document.createElement('img');
    albumImage.src = image;

    albumInfo.append(albumName, artistName);
    div.append(albumImage, albumInfo);
    document.getElementById('albums').append(div);
}

/**
 * Добавление трека
 * @param name - название трека
 * @param artist - имя артиста
 * @param image - обложка трека
 */
function addTrack(name, artist, image) {
    const div = document.createElement('div');
    div.className = 'tracks-track';

    const player = document.createElement('div');
    player.className = 'player';

    const play = document.createElement('img');
    play.src = '/public/play-button.webp';
    play.className = 'track-image';
    const artistImage = document.createElement('img');
    artistImage.src = image;
    artistImage.className = 'track-image';
    const heart = document.createElement('img');
    heart.src = '/public/heart-button.png';
    heart.className = 'track-image';

    const trackName = document.createElement('h4');
    trackName.textContent = name;
    trackName.className = 'track-name';
    const trackArtist = document.createElement('h4');
    trackArtist.textContent = artist;
    trackArtist.className = 'track-artist';

    player.append(play, artistImage, heart);
    div.append(player, trackName, trackArtist);
    document.getElementById('tracks').append(div);
}

/**
 * Поиск данных об артистах с заданным именем
 * @param text - имя артиста
 */
async function fetchArtists(text) {
    const artistsData = await fetchData(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${text}&limit=8&api_key=${API_KEY}&format=json`)
    const artists = artistsData.results.artistmatches.artist;

    for (const artist of artists) {
        addArtist(artist.name, artist.listeners, artist.image[2]["#text"]);
    }
}

/**
 * Поиск данных об альбомах с заданным названием
 * @param text - название альбома
 */
async function fetchAlbums(text) {
    const albumsData = await fetchData(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${text}&limit=8&api_key=${API_KEY}&format=json`)
    const albums = albumsData.results.albummatches.album;

    for (const album of albums) {
        addAlbum(album.name, album.artist, album.image[2]["#text"]);
    }
}

/**
 * Поиск данных о треках с заданным названием
 * @param text - название трека
 */
async function fetchTracks(text) {
    const tracksData = await fetchData(`https://ws.audioscrobbler.com/2.0/?method=track.search&track=${text}&limit=10&api_key=${API_KEY}&format=json`);
    const tracks = tracksData.results.trackmatches.track;

    for (const track of tracks) {
        addTrack(track.name, track.artist, track.image[2]["#text"])
    }
}

/**
 * Поиск по артистам, альбомам, трекам
 * @param text - текст, по которому идёт поиск
 */
function search(text) {
    clear()
    fetchArtists(text);
    fetchAlbums(text);
    fetchTracks(text);
}

const input = document.getElementById('search-input');
const button = document.getElementById('search-button');
button.addEventListener('click', () => search(input.value));