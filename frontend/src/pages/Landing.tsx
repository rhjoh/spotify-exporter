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
        <div className="landing-container">
            {isAuthed ? <TrackPreview /> : null}
        </div>
    )
}

export default LandingPage;