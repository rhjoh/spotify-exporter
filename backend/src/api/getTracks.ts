export async function getTracks(token: string){
    const access_token = token;
    let tracksResponse = {
        returnedTracks: [],
        totalTracks: 0
    }

    await fetch('https://api.spotify.com/v1/me/tracks', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${access_token}`,
        }
    }).then(res => res.json()).then(data => {
        tracksResponse.returnedTracks = data.items;
        tracksResponse.totalTracks = data.total;
        console.log(tracksResponse)
    });
    return tracksResponse;
}