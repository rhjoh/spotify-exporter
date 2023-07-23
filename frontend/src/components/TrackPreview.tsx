// This component lists the top 10 or so tracks as an example before the user downloads their library data

import "./trackpreview.css"
import { useState, useEffect } from 'react';
import { TrackListItem } from "./TrackListItem";

const TopTracks = (props: any) => {
    const [topTracks, setTopTracks] = useState<any>(null);
    type DownloadState = 'not_started' | 'download' | 'complete'
    const [downloadState, setDownloadState] = useState<DownloadState>('not_started');

    const handleDownloadClick = () => {
        if (downloadState === 'not_started') {
            setDownloadState('download')
            fetch('https://rhysjohnston.xyz/api/alltracks')
                .then(response => response.json())
                .then(data => {
                    setDownloadState('complete')
                })
        } else if (downloadState === 'complete') {
            fetch('https://rhysjohnston.xyz/api/csvfile')
            .then(response => response.blob())
            .then(blobResponse => {
                const csvURL = URL.createObjectURL(blobResponse).toString()
                window.location.href = csvURL
            })
    }
}

    const getButtonText = () => {
        switch (downloadState) {
            case 'not_started':
                return `Generate Full CSV - ${topTracks.totalTracks} tracks`;
            case 'download':
                return "Downloading";
            case 'complete':
                return "Download";
        }
    }
    const getButtonClass = () => {
        switch(downloadState) {
            case 'not_started':
                return 'generateButton';
            case 'download':
                return 'generateButtonDownload';
            case 'complete':
                return 'bi bi-file-earmark-arrow-down generateButton icon-size';
        }
    }

    useEffect(() => {
        fetch('https://rhysjohnston.xyz/api/tracks')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setTopTracks(data)
            })

    }, [])
    return (
        <div className='track-container'>
            <div className="toptracks">
                <div className="csv-section">
                    {topTracks !== null && topTracks.totalTracks !== null ?
                        <button onClick={() => handleDownloadClick()} className={getButtonClass()}>{getButtonText()}</button>
                        : null}
                    <br />
                </div>
                <span id='tracks-list-headertext'>Your recent tracks:</span>
                <div className="tracks-list">
                    {topTracks !== null ? topTracks.returnedTracks.map((track: any, index: any) => {
                        return <>
                            <TrackListItem track={track} key={index} />
                        </>
                    }) : null}
                </div>
            </div>
        </div>
    )
}

export default TopTracks;