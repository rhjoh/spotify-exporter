import csv from 'csv';
import fs from 'fs';
import path from 'path'

export const createCSV = async (alltracks: any[]) => {
    // Can this just be alltracks.keys? 
    const csv_headers = {
        artist: 'artist',
        album: 'album',
        albumtype: 'albumtype',
        tracktitle: 'tracktitle',
        discnumber: 'discnumber',
        tracknumber: 'tracknumber',
        duration_ms: 'duration_ms',
        explicit: 'explicit',
        id: 'id',
        isrc_id: 'isrc_id',
        external_url: 'external_url',
        popularity: 'popularity',
        preview_url: 'preview_url',
        islocal: 'is_local'
    } 

    let writeData: any[] = [];
    alltracks.map((track: any) => {
        const trackObject = {
            //TODO: Add n columns for n artists
            artist: track.track.artists[0].name,
            album: track.track.album.name,
            albumtype: track.track.album.album_type,
            tracktitle: track.track.name,
            discnumber: track.track.disc_number,
            tracknumber: track.track.track_number,
            duration_ms: track.track.duration_ms,
            explicit: track.track.explicit,
            id: track.track.id,
            isrc_id: track.track.external_ids.isrc,
            external_url: track.track.external_urls.spotify,
            popularity: track.track.popularity,
            preview_url: track.track.preview_url,
            islocal: track.track.is_local
        }
        writeData.push(trackObject)
    })

    const filePath = path.join(__dirname, '../csv_out/output.csv')
    try{ 
    csv.stringify(writeData, {header: true, columns: csv_headers}, (err, output) => {
        if (err) throw err;
        fs.writeFile(filePath, output, (err) => {
            if (err) throw err;
        });
    });
    return filePath;
} catch (err) {
    console.log(err)
    return false;
}
}