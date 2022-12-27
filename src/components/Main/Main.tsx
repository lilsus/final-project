import {TopArtists} from "../TopArtists/TopArtists";
import {TopTracks} from "../TopTracks/TopTracks";

export const Main = () => {
    return (
        <main className="content">
            <h1>Music</h1>
            <h2>Hot right now</h2>
            <TopArtists/>
            <h2>Popular tracks</h2>
            <TopTracks/>
        </main>
    );
};