import {useEffect, useState} from "react";
import {fetchData} from "../../api/api";
import heartButton from './heart-button.png'
import playButton from './play-button.webp'

export const SearchTracks = (props: { text: string; }) => {
    const [tracks, setTracks] = useState<any[]>([]);

    const setData = async () => {
        const data = await fetchData("track.search", `&track=${props.text}&limit=8&format=json`);
        setTracks(data.results.trackmatches.track);
    }

    useEffect(() => {
        setData()
    }, []);

    return (
        <section className="search-tracks">
            {tracks.map((track, index) => (
                <div className="search-tracks-track" key={index}>
                    <div className="search-player">
                        <img src={playButton} className="search-track-image"/>
                        <img className="search-track-image" src={track.image[2]["#text"]}/>
                        <img src={heartButton} className="search-track-image"/>
                    </div>
                    <h3 className="search-track-name">{track.name}</h3>
                    <h3 className="search-track-artist">{track.artist}</h3>
                </div>
            ))}
        </section>
    );
}