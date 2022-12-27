import {useEffect, useState} from "react";
import {fetchData} from "../../api/api";
import {TrackGenres} from "../Genres/TrackGenres";

export const TopTracks = () => {
    const [topTracks, setTopTracks] = useState<any[]>([]);

    const setData = async () => {
        const data = await fetchData("chart.gettoptracks", "&limit=8&format=json");
        setTopTracks(data.tracks.track);
    }

    useEffect(() => {
        setData()
    }, [])

    return (
        <section className="tracks">
            {topTracks.map((track, index) => (
                <div className="tracks-track" key={index}>
                    <img className="track-image" src={track.image[2]["#text"]}/>
                    <div className="track-info">
                        <h4 className="track-name">{track.name}</h4>
                        <h4 className="artist-name">{track.artist.name}</h4>
                        <TrackGenres artist={track.artist.name} track={track.name}/>
                    </div>
                </div>
            ))}
        </section>
    );
}