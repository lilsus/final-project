export async function fetchData(method: string, url: string) {
    const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';
    const API_KEY = '5a5e8618cb4027ecea1156624f658d44'

    try {
        const response = await fetch(`${BASE_URL}?method=${method}&api_key=${API_KEY}&format=json${url}`);

        if (response.status === 200)
            return response.json();
        else
            throw new Error(`Fetch data error. Response: ${response.status}`);
    } catch (e) {
        alert(e);
    }
}