import {useEffect, useState} from "react";
import {fetchData} from "../../api/api";
import {ArtistGenres} from "../Genres/ArtistGenres";

export const TopArtists = () => {
    const [topArtists, setTopArtists] = useState<any[]>([]);

    const setData = async () => {
        const data = await fetchData("chart.gettopartists", "&limit=10&format=json");
        setTopArtists(data.artists.artist);
    }

    useEffect(() => {
        setData()
    }, [])

    return (
        <section className="artists">
            {topArtists.map((artist, index) => (
                <div className="artists-artist" key={index}>
                    <img className="artist-image" src={artist.image[2]["#text"]}/>
                    <h4 className="artist-name">{artist.name}</h4>
                    <ArtistGenres name={artist.name}/>
                </div>
            ))}
        </section>
    );
}