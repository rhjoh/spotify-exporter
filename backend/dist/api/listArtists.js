"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listArtists = void 0;
function listArtists(allTracks) {
    let allArtists = [];
    for (const track of allTracks) {
        const artist = {
            id: track.track.artists[0].id,
            name: track.track.artists[0].name,
            href: track.track.artists[0].href
        };
        const isDuplicate = allArtists.some((a) => a.name === artist.name);
        if (!isDuplicate) {
            allArtists.push(artist);
        }
    }
    return allArtists;
}
exports.listArtists = listArtists;
