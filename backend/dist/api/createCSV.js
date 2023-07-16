"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCSV = void 0;
const csv_1 = __importDefault(require("csv"));
const fs_1 = __importDefault(require("fs"));
const createCSV = (alltracks) => __awaiter(void 0, void 0, void 0, function* () {
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
    };
    let writeData = [];
    alltracks.map((track) => {
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
        };
        writeData.push(trackObject);
    });
    try {
        csv_1.default.stringify(writeData, { header: true, columns: csv_headers }, (err, output) => {
            if (err)
                throw err;
            // writes to /spotif-analytics/backend/
            fs_1.default.writeFile('output.csv', output, (err) => {
                if (err)
                    throw err;
                console.log('output.csv saved.');
            });
        });
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
});
exports.createCSV = createCSV;
