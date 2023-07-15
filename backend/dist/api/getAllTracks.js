"use strict";
// Why doesn't this work when using promise based fetch calls? 
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTracks = void 0;
function getAllTracks(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const access_token = token;
        let returnedTracks = [];
        function fetchAllTracks(url) {
            return __awaiter(this, void 0, void 0, function* () {
                const response = yield fetch(url, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    }
                });
                const data = yield response.json();
                data.items.map((item) => {
                    returnedTracks.push(item);
                });
                if (data.next) {
                    console.log("Current offset: " + data.offset);
                    yield fetchAllTracks(data.next);
                }
                else {
                    console.log("Total of", returnedTracks.length, "tracks");
                }
            });
        }
        const response = yield fetch('https://api.spotify.com/v1/me/tracks', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
        const data = yield response.json();
        // Push tracks from first call
        data.items.map((item) => {
            returnedTracks.push(item);
        });
        console.log("Getting " + data.total + " tracks.");
        yield fetchAllTracks(data.next);
        return returnedTracks;
    });
}
exports.getAllTracks = getAllTracks;
