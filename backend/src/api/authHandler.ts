import querystring from "querystring";

export const handleLogin = async (clientID: string, redirect_URI: string) => {
    const scope = "user-top-read user-library-read"
    const loginResponse = await fetch('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: clientID,
            scope: scope,
            redirect_uri: redirect_URI
        }))
    return loginResponse
}

export const handleToken = async (accessCode: string | undefined, clientID: string, clientSecret: string | undefined) => {

    const prodRedirectURI = 'https://rhysjohnston.xyz/spotify_landing';
    const devRedirectURI = 'http://localhost:3000/spotify_landing';

    const encodedStrings = btoa(clientID + ':' + clientSecret)
    const bodyParams = {
        grant_type: "authorization_code",
        code: accessCode,
        redirect_uri: prodRedirectURI,
    }
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${encodedStrings}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: querystring.stringify(bodyParams)
    })
    const tokenData = await tokenResponse.json()
    return tokenData;
}