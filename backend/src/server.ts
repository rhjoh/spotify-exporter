import express, { query } from 'express';
import cors from 'cors';
import querystring from 'querystring';
import { getTracks } from './api/getTracks';
import { getAllTracks } from './api/getAllTracks';
import { getAllArtists } from './api/getAllArtists';
import { listArtists } from './api/listArtists';

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

const app = express();
app.use(cors())

const clientID = "7f6bb2cf63fc486ca40380f992a53051";
const redirect_URI = 'http://localhost:3000/spotify_landing';
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
let accessKeyData: any = {}

// Move auth flow to separate file? 
app.get('/login', (req, res) => {
    const scope = "user-read-private user-read-email user-top-read user-library-read"
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: clientID,
            scope: scope,
            redirect_uri: redirect_URI
        }))
})

app.get('/auth', (req, res) => {
    console.log("Got traffic on /auth")
    const encodedStrings = btoa(clientID + ':' + clientSecret)
    const bodyParams = {
        grant_type: "authorization_code",
        code: req.headers.authorization?.split(' ')[1],
        redirect_uri: 'http://localhost:3000/spotify_landing',
    }
    fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${encodedStrings}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: querystring.stringify(bodyParams)
    }).then(res => res.json()).then(data => {

        accessKeyData = data;
        console.log(accessKeyData)
        res.send(data)
    })
})

// Gets top 20 tracks. 
app.get('/tracks', async (req, res) => {
    console.log("Got traffic on /tracks")
    let topTracks = await getTracks(accessKeyData.access_token)
    if (topTracks) {
        res.send(topTracks)
    } else {
        res.send("No tracks found")
    }
}
)
// Get all tracks, push allTracks to client. 
app.get('/alltracks', async (req, res) => {
    //TODO: Get number of albums 
    console.log("Got traffic on /alltracks")
    let allTracks;
    try {
        allTracks = await getAllTracks(accessKeyData.access_token)
        const allArtists = listArtists(allTracks)
        const allData = {
            tracks: allTracks,
            artists: allArtists
        }
        res.send(allData)
    } catch (err) {
        console.log(err)
        res.send(JSON.stringify("Error getting tracks"))
    }
})

// Theres no route provided to list all of a users saved artists. Only top artists (max 50?)
// https://developer.spotify.com/documentation/web-api/reference/get-users-saved-tracks
// We'll have to just infer this from /alltracks endpoint - track data contains artist & album data.  
app.get('/artists', async (req, res) => {
    console.log("Got traffic on /artists")
    try {
        let allArtists = await getAllArtists(accessKeyData.access_token)
        res.send(allArtists)
    } catch (err) {
        console.log(err)
        res.send(JSON.stringify("Error getting artists"))
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