"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAlbums = void 0;
function listAlbums(alltracks) {
    let allAlbums = [];
    for (const track of alltracks) {
        const album = {
            id: track.track.album.id,
            name: track.track.album.name,
            href: track.track.album.external_urls.spotify,
            artists: (track.track.album.artists.map((artist) => artist.name)),
            release_date: track.track.album.release_date
        };
        const isDuplicate = allAlbums.some((a) => a.name === album.name);
        if (!isDuplicate) {
            allAlbums.push(album);
        }
    }
    return allAlbums;
}
exports.listAlbums = listAlbums;
