interface Album {
    id: string;
    name: string;
    href: string;
    artists: string[];
    release_date: string;
}

export function listAlbums(alltracks: any[]){

    let allAlbums: Album[] =[];
    for (const track of alltracks){
        const album: Album = {
            id: track.track.album.id,
            name: track.track.album.name,
            href: track.track.album.external_urls.spotify,
            artists: (track.track.album.artists.map((artist: any) => artist.name)),
            release_date: track.track.album.release_date
        }
        const isDuplicate = allAlbums.some((a) => a.name === album.name)
        if(!isDuplicate){
            allAlbums.push(album)
        }
    }
    return allAlbums;
}