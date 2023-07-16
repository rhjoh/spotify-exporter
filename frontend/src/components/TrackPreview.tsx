// This component lists the top 10 or so tracks as an example before the user downloads their library data

import "./trackpreview.css"
import { useState, useEffect } from 'react';
import { TrackListItem } from "./TrackListItem";

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
        <div className='track-container'>
            <div className="toptracks">
                {topTracks !== null && topTracks.totalTracks !== null ? 
                <button onClick={() => getAllTracks()} className="generateButton">Generate Full CSV - {topTracks.totalTracks} tracks</button>
                : null }
                {/* Add button without totalTracks here?  */}
                <br />
                <span id='tracks-list-headertext'>Your recent tracks:</span>
                <div className="tracks-list">
                    {topTracks !== null ? topTracks.returnedTracks.map((track: any, index: any) => {
                        return <>
                            <TrackListItem track={track} key={index} />
                        </>
                    }) : null}
                </div>
            </div>

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