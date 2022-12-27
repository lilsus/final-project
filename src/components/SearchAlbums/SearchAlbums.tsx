import {useEffect, useState} from "react";
import {fetchData} from "../../api/api";

export const SearchAlbums = (props: { text: string; }) => {
    const [albums, setAlbums] = useState<any[]>([]);

    const setData = async () => {
        const data = await fetchData("album.search", `&album=${props.text}&limit=8&format=json`);
        setAlbums(data.results.albummatches.album);
    }

    useEffect(() => {
        setData()
    }, []);

    return (
        <section className="search-albums">
            {albums.map((album, index) => (
                <div className="search-albums-album" key={index}>
                    <img src={album.image[2]["#text"]}/>
                    <div className="search-album-info">
                        <h4 className="search-album-name">{album.name}</h4>
                        <h4 className="search-album-artist">{album.artist}</h4>
                    </div>
                </div>
            ))}
        </section>
    );
}