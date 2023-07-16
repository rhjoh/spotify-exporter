// This page is displayed after the login. 

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TrackPreview from "../components/TrackPreview";
import "./landing.css"

const LandingPage = () => {
    const location = useLocation();
    const returnedCode = location.search.split('=')[1]

    type authResponse = {
        access_token: string,
        expires_in: number,
        refresh_token: string,
        scope: string,
        token_type: string
    }

    // tokenDetails contains refresh token 
    // eslint-disable-next-line
    const [tokenDetails, setTokenDetails] = useState<authResponse | null>(null);
    const [isAuthed, setIsAuthed] = useState<boolean>(false);

    useEffect(() => {
        fetch('http://localhost:8000/auth', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${returnedCode}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setTokenDetails(data)
                setIsAuthed(true)
            })
    }, [returnedCode])

    return (
        /* 
        |          Navbar             |
        | Paragraph | Generate Button |
        |     List of top 10 tracks   |
        */

        <div className="landing-container">
            <span className="intro-paragraph">This app generates a CSV document of your 'Like Songs' playlist on Spotify.
            <br />
            It authenticates securely via the Spotify API and no data is stored. 
            <br />
            Remove access to this app via your Spotify account at any time.
            </span>
            {isAuthed ? <TrackPreview /> : null}
        </div>
    )
}

export default LandingPage;