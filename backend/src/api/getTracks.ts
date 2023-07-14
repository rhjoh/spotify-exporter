export async function getTracks(token: string){
    const access_token = token;
    let returnedTracks: any[] = [];

    await fetch('https://api.spotify.com/v1/me/tracks', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${access_token}`,
        }
    }).then(res => res.json()).then(data => {
        returnedTracks = data.items;
    });
    return returnedTracks;
}