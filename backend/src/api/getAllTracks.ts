// Why doesn't this work when using promise based fetch calls? 

export async function getAllTracks(token: string): Promise<any[]>{
    const access_token = token;
    let returnedTracks: any[] = [];

    async function fetchAllTracks(url: string){
        const response = await fetch(
            url, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${access_token}`,
            }}
        )
        const data = await response.json()
        data.items.map((item: any) => {
            returnedTracks.push(item)
        })
        if(data.next){
            console.log("Current offset: " + data.offset)
            await fetchAllTracks(data.next)
        } else{
            console.log("Total of", returnedTracks.length, "tracks")
        }
    }

    const response = await fetch('https://api.spotify.com/v1/me/tracks', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })
    const data = await response.json()
    console.log("Getting " + data.total + " tracks.")
    await fetchAllTracks(data.next)
    return returnedTracks;
}