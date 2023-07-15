import csv from 'csv';
import fs from 'fs';

export const createCSV = async (alltracks: any[]) => {
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
    try{ 
    csv.stringify(writeData, {header: true, columns: csv_headers}, (err, output) => {
        if (err) throw err;
        // writes to /spotif-analytics/backend/
        fs.writeFile('output.csv', output, (err) => {
            if (err) throw err;
            console.log('output.csv saved.');
        });
    });
    return true;
} catch (err) {
    console.log(err)
    return false;
}
}