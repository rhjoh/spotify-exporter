import { useState, useEffect } from 'react';

const TopTracks = (props: any) => {
    const [topTracks, setTopTracks] = useState<any>(null);

    const getAllTracks = () => {
        fetch('http://localhost:8000/alltracks')
        .then(response => response.json())
        .then(data => console.log(data))
    }
    const getUtilRoute = () => {
        console.log("Util clicked")
        fetch('http://localhost:8000/artists')
        .then(response => response.json())
        .then(data => console.log(data))
    }
    const buttonOne = () => {
        fetch('http://localhost:8000/util')
        .then(response => response.json())
        .then(data => console.log(data))
    }

    useEffect(() => {

        fetch('http://localhost:8000/tracks')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setTopTracks(data)
        })

    }, [])
    return (
        <div>
            <button onClick={() => getAllTracks()}>Get all tracks</button>
            <button onClick={() => getUtilRoute()}>Util Button</button>
            <button onClick={() => buttonOne()}>Util 2</button>
            {topTracks !== null ? topTracks.map((track: any, index: any) => {
                return <p key={index}>{track.track.name}</p>
            }) : <p>Waiting for tracks</p>}
        </div>
    )
}

export default TopTracks;