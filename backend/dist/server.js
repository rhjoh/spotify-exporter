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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const querystring_1 = __importDefault(require("querystring"));
const getTracks_1 = require("./api/getTracks");
const getAllTracks_1 = require("./api/getAllTracks");
const getAllArtists_1 = require("./api/getAllArtists");
const listArtists_1 = require("./api/listArtists");
/*
    Routes needed:
    -- Get library stats:
        -- Number of tracks
        -- Number of artists
        -- Number of albums
            (all inferred from list of tracks?)

        -- Playlist metadata (name, number of tracks, etc)
    
    - Needs middleware to handle token refresh.
*/
const app = (0, express_1.default)();
// TODO: Set proper options for cors.
app.use((0, cors_1.default)());
const clientID = "7f6bb2cf63fc486ca40380f992a53051";
const redirect_URI = 'http://localhost:3000/spotify_landing';
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
let accessKeyData = {};
// Move auth flow to separate file? 
app.get('/login', (req, res) => {
    const scope = "user-read-private user-read-email user-top-read user-library-read";
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring_1.default.stringify({
            response_type: 'code',
            client_id: clientID,
            scope: scope,
            redirect_uri: redirect_URI
        }));
});
app.get('/auth', (req, res) => {
    var _a;
    console.log("Got traffic on /auth");
    const encodedStrings = btoa(clientID + ':' + clientSecret);
    const bodyParams = {
        grant_type: "authorization_code",
        code: (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1],
        redirect_uri: 'http://localhost:3000/spotify_landing',
    };
    fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${encodedStrings}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: querystring_1.default.stringify(bodyParams)
    }).then(res => res.json()).then(data => {
        accessKeyData = data;
        console.log(accessKeyData);
        res.send(data);
    });
});
// Gets top 20 tracks. 
app.get('/tracks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Got traffic on /tracks");
    let topTracks = yield (0, getTracks_1.getTracks)(accessKeyData.access_token);
    if (topTracks) {
        res.send(topTracks);
    }
    else {
        res.send("No tracks found");
    }
}));
// Get all tracks, push allTracks to client. 
app.get('/alltracks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Got traffic on /alltracks");
    let allTracks;
    try {
        // Now I have two arrays: tracks and artists.
        // 
        allTracks = yield (0, getAllTracks_1.getAllTracks)(accessKeyData.access_token);
        const allArtists = (0, listArtists_1.listArtists)(allTracks);
        const allData = {
            tracks: allTracks,
            artists: allArtists
        };
        res.send(allData);
    }
    catch (err) {
        console.log(err);
        res.send(JSON.stringify("Error getting tracks"));
    }
}));
// Theres no route provided to list all of a users saved artists. Only top artists (max 40)
// https://developer.spotify.com/documentation/web-api/reference/get-users-saved-tracks
// We'll have to just infer this from /alltracks endpoint which already contains the data anyway. 
app.get('/artists', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Got traffic on /artists");
    try {
        let allArtists = yield (0, getAllArtists_1.getAllArtists)(accessKeyData.access_token);
        res.send(allArtists);
    }
    catch (err) {
        console.log(err);
        res.send(JSON.stringify("Error getting artists"));
    }
}));
// Test route 
app.get('/util', (req, res) => {
    console.log("Got traffic on /util");
    fetch('https://api.spotify.com/v1/me/albums', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessKeyData.access_token}`
        }
    }).then(res => res.json()).then(data => {
        console.log(data.items);
    });
});
app.listen(8000, () => {
    console.log("Listening on port 8000");
});
