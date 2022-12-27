import {useEffect, useState} from "react";
import {fetchData} from "../../api/api";

export const SearchArtists = (props: { text: string; }) => {
    const [artists, setArtists] = useState<any[]>([]);

    const setData = async () => {
        const data = await fetchData("artist.search", `&artist=${props.text}&limit=8&format=json`);
        setArtists(data.results.artistmatches.artist);
    }

    useEffect(() => {
        setData()
    }, []);

    return (
        <section className="search-artists">
            {artists.map((artist, index) => (
                <div className="search-artists-artist" key={index}>
                    <img className="search-artist-image" src={artist.image[2]["#text"]}/>
                    <div className="search-artist-info">
                        <h4 className="search-artist-name">{artist.name}</h4>
                        <h4 className="search-artist-listeners">{artist.listeners}</h4>
                    </div>
                </div>
            ))}
        </section>
    );
}