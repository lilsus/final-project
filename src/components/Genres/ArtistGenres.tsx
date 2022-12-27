import {useEffect, useState} from "react";
import {fetchData} from "../../api/api";

export const ArtistGenres = (props: { name: string; }) => {
    const [genres, setGenres] = useState<string>('');

    const setData = async () => {
        const data = await fetchData('artist.gettoptags', `&artist=${props.name}&format=json`);
        const genres = data.hasOwnProperty('error') ? '' : data.toptags.tag.map((tag: { name: string; }) => tag.name).slice(0, 3).join(', ');
        setGenres(genres);
    }

    useEffect(() => {
        setData()
    }, []);

    return <h4 className="track-genres">{genres}</h4>;
};