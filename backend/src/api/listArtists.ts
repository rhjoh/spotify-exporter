interface Artist {
    id: string;
    name: string;
    href: string;
}

export function listArtists(allTracks: any[]){

    let allArtists: Artist[] = [];
    for (const track of allTracks){
    
        const artist: Artist ={
            id: track.track.artists[0].id,
            name: track.track.artists[0].name,
            href: track.track.artists[0].href
        }
        const isDuplicate = allArtists.some((a) => a.name === artist.name)
        if(!isDuplicate){
            allArtists.push(artist)
        }
    }
    return allArtists;
}