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
exports.getTracks = void 0;
function getTracks(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const access_token = token;
        let tracksResponse = {
            returnedTracks: [],
            totalTracks: 0
        };
        yield fetch('https://api.spotify.com/v1/me/tracks', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${access_token}`,
            }
        }).then(res => res.json()).then(data => {
            tracksResponse.returnedTracks = data.items;
            tracksResponse.totalTracks = data.total;
            console.log(tracksResponse);
        });
        return tracksResponse;
    });
}
exports.getTracks = getTracks;
