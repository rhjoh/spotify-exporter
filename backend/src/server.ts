import express from 'express';
import cors from 'cors';
import { getTracks } from './api/getTracks';
import { getAllTracks } from './api/getAllTracks';
import { getAllArtists } from './api/getAllArtists';
import { listArtists } from './api/listArtists';
import { listAlbums } from './api/listAlbums';
import { handleLogin, handleToken } from './api/authHandler';
import { createCSV } from './api/createCSV';
/*  
    Routes needed: 
    -- Playlist metadata (name, number of tracks, etc)

    - Needs middleware to handle token refresh. 
*/

const app = express();
app.use(cors())

const clientID = "7f6bb2cf63fc486ca40380f992a53051";
const redirect_URI = 'http://localhost:3000/spotify_landing';
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
let accessKeyData: any = {}

app.get('/login', async (req, res) => {
    const loginResponse = await handleLogin(clientID, redirect_URI)
    res.redirect(loginResponse.url)

})

app.get('/auth', async (req, res) => {
    console.log("Got traffic on /auth")
    const code: string | undefined = req.headers.authorization?.split(' ')[1]
    const bearerToken = await handleToken(code, clientID, clientSecret)
    accessKeyData = bearerToken;
    console.log(bearerToken)
    res.send(accessKeyData)
})

// Gets top 20 tracks. 
app.get('/tracks', async (req, res) => {
    console.log("Got traffic on /tracks")
    let topTracks = await getTracks(accessKeyData.access_token)
    if (topTracks) {
        res.send(topTracks)
    } else {
        res.send(JSON.stringify("Couldn't get user tracks"))
    }
}
)
// Get all tracks, push allTracks and allArtists to client. 
app.get('/alltracks', async (req, res) => {
    console.log("Got traffic on /alltracks")
    try {
        const allTracks = await getAllTracks(accessKeyData.access_token)
        const allArtists = listArtists(allTracks)
        const allAlbums = listAlbums(allTracks)
        const allData = {
            tracks: allTracks,
            artists: allArtists,
            albums: allAlbums
        }
        const csvComplete = await createCSV(allTracks);
        if (csvComplete) {
            console.log("CSV created")
        }
        res.send(allData)
    } catch (err) {
        console.log(err)
        res.send(JSON.stringify("Error getting tracks"))
    }
})

// Test route 
app.get('/util', (req, res) => {
    console.log("Got traffic on /util")
    fetch('https://api.spotify.com/v1/me/albums', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessKeyData.access_token}`
        }
    }).then(res => res.json()).then(data => {
        console.log(data.items)
    })
})

app.listen(8000, () => {
    console.log("Listening on port 8000")
})