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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllArtists = void 0;
function getAllArtists(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const access_token = token;
        let returnedArtists = [];
        function fetchAllArtists(url) {
            return __awaiter(this, void 0, void 0, function* () {
                const response = yield fetch(url, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                });
                const data = yield response.json();
                data.items.map((item) => {
                    returnedArtists.push(item);
                });
                if (data.next) {
                    console.log("Current offset: " + data.offset);
                    yield fetchAllArtists(data.next);
                }
                else {
                    console.log("Total of " + returnedArtists.length + " artists fetched");
                }
            });
        }
        const response = yield fetch('https://api.spotify.com/v1/me/top/artists', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
        const data = yield response.json();
        console.log("Getting " + data.total + " artists");
        yield fetchAllArtists(data.next);
        return returnedArtists;
    });
}
exports.getAllArtists = getAllArtists;
