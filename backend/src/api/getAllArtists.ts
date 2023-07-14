
export async function getAllArtists(token: string): Promise<any[]> {
    const access_token = token;
    let returnedArtists: any[] = [];

    async function fetchAllArtists(url: string) {
        const response = await fetch(
            url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${access_token}`
            }}
        )
        const data = await response.json();
        data.items.map((item: any) => {
            returnedArtists.push(item)
        })
        if(data.next){
            console.log("Current offset: " + data.offset);
            await fetchAllArtists(data.next);
        } else {
            console.log("Total of " + returnedArtists.length + " artists fetched")
        }
    }

    const response = await fetch('https://api.spotify.com/v1/me/top/artists', {
        method: 'GET', 
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })
    const data = await response.json();
    console.log("Getting " + data.total + " artists")
    await fetchAllArtists(data.next)
    return returnedArtists;
}