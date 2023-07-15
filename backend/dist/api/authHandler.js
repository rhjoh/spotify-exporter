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
exports.handleToken = exports.handleLogin = void 0;
const querystring_1 = __importDefault(require("querystring"));
const handleLogin = (clientID, redirect_URI) => __awaiter(void 0, void 0, void 0, function* () {
    const scope = "user-read-private user-read-email user-top-read user-library-read";
    const loginResponse = yield fetch('https://accounts.spotify.com/authorize?' +
        querystring_1.default.stringify({
            response_type: 'code',
            client_id: clientID,
            scope: scope,
            redirect_uri: redirect_URI
        }));
    return loginResponse;
});
exports.handleLogin = handleLogin;
const handleToken = (accessCode, clientID, clientSecret) => __awaiter(void 0, void 0, void 0, function* () {
    const encodedStrings = btoa(clientID + ':' + clientSecret);
    const bodyParams = {
        grant_type: "authorization_code",
        code: accessCode,
        redirect_uri: 'http://localhost:3000/spotify_landing',
    };
    const tokenResponse = yield fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${encodedStrings}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: querystring_1.default.stringify(bodyParams)
    });
    const tokenData = yield tokenResponse.json();
    return tokenData;
});
exports.handleToken = handleToken;
