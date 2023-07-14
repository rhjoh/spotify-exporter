import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TopTracks from "./TopTracks";

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

    const [fetchResult, setFetchResult] = useState<authResponse | null>(null);
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
                setFetchResult(data)
                setIsAuthed(true)
                console.log(data)
            })
    }, [returnedCode])

    return (
        <div>
            <h1>Landing page</h1>
            {fetchResult !== null ? <p>Got an auth response </p> : <p>Waiting for auth</p>}
            {isAuthed ? <TopTracks /> : null}
        </div>
    )
}

export default LandingPage;