import { useState, useEffect } from 'react';

const TopTracks = (props: any) => {
    const [topTracks, setTopTracks] = useState<any>(null);
    const [libraryData, setLibraryData] = useState<any>(null);

    const getAllTracks = () => {
        fetch('http://localhost:8000/alltracks')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setLibraryData(data)
            })
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
            {/* Shows tops 20 track titles */}
            {/*             {topTracks !== null ? topTracks.map((track: any, index: any) => {
                return <p key={index}>{track.track.name}</p>
            }) : <p>Waiting for tracks</p>} */}
            {libraryData !== null ?
                <div>
                    <p>Total artists: {libraryData.artists.length}</p>
                    <p>Total tracks: {libraryData.tracks.length}</p>
                </div>
                :
                <p>Waiting for library data ... </p>
            }
        </div>
    )
}

export default TopTracks;