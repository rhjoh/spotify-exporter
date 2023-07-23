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
const getTracks_1 = require("./api/getTracks");
const getAllTracks_1 = require("./api/getAllTracks");
const listArtists_1 = require("./api/listArtists");
const listAlbums_1 = require("./api/listAlbums");
const authHandler_1 = require("./api/authHandler");
const createCSV_1 = require("./api/createCSV");
const path_1 = __importDefault(require("path"));
/*
    - Needs middleware to handle token refresh.
*/
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const devRedirectURI = 'http://localhost:3000/spotify_landing';
const prodRedirectURI = 'https://rhysjohnston.xyz/spotify_landing';
const clientID = "7f6bb2cf63fc486ca40380f992a53051";
const redirect_URI = prodRedirectURI;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
let accessKeyData = {};
app.get('/api/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginResponse = yield (0, authHandler_1.handleLogin)(clientID, redirect_URI);
    res.redirect(loginResponse.url);
}));
app.get('/api/auth', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log("Got traffic on /auth");
    const code = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    const bearerToken = yield (0, authHandler_1.handleToken)(code, clientID, clientSecret);
    accessKeyData = bearerToken;
    console.log(bearerToken);
    res.send(accessKeyData);
}));
// Gets top 20 tracks. 
app.get('/api/tracks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Got traffic on /tracks");
    let topTracks = yield (0, getTracks_1.getTracks)(accessKeyData.access_token);
    if (topTracks) {
        res.send(topTracks);
    }
    else {
        res.send(JSON.stringify("Couldn't get user tracks"));
    }
}));
app.get('/api/alltracks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Got traffic on /alltracks");
    try {
        const allTracks = yield (0, getAllTracks_1.getAllTracks)(accessKeyData.access_token);
        const allArtists = (0, listArtists_1.listArtists)(allTracks);
        const allAlbums = (0, listAlbums_1.listAlbums)(allTracks);
        // Don't need these after all. Good to have? 
        const csvComplete = yield (0, createCSV_1.createCSV)(allTracks);
        if (csvComplete) {
            console.log("CSV created");
            res.send(JSON.stringify(csvComplete));
        }
    }
    catch (err) {
        console.log(err);
        res.send(JSON.stringify("Error getting tracks"));
    }
}));
const filePath = path_1.default.join(__dirname, '/csv_out/output.csv');
app.get('/api/csvfile', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Traffic on /csvfile");
    res.sendFile(filePath, (err) => {
        if (err) {
            console.log(err);
            res.send("Error getting CSV");
        }
    });
}));
app.listen(8000, () => {
    console.log("Listening on port 8000");
});
