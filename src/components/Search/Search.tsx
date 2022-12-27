import {SearchArtists} from "../SearchArtists/SearchArtists";
import {SearchAlbums} from "../SearchAlbums/SearchAlbums";
import {SearchTracks} from "../SearchTracks/SearchTracks";

export const Search = () => {
    const params = new URLSearchParams(window.location.search)
    // @ts-ignore
    const searchQuery: string = params.get("search") === null ? '' : params.get("search");

    return (
        <main className="content">
            <form className="search">
                <input id="search-input" name="search" type="text"/>
                <button id="search-button">Search</button>
            </form>
            <h1>Search results</h1>
            <h2>Artists</h2>
            { searchQuery === "" ? <h4>Not found</h4> : <SearchArtists text={searchQuery}/> }
            <h2>Albums</h2>
            { searchQuery === "" ? <h4>Not found</h4> : <SearchAlbums text={searchQuery}/> }
            <h2>Tracks</h2>
            { searchQuery === "" ? <h4>Not found</h4> : <SearchTracks text={searchQuery}/> }
        </main>
    );
};