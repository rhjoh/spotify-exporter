import express from 'express';
import cors from 'cors';
import { getTracks } from './api/getTracks';
import { getAllTracks } from './api/getAllTracks';
import { getAllArtists } from './api/getAllArtists';
import { listArtists } from './api/listArtists';
import { listAlbums } from './api/listAlbums';
import { handleLogin, handleToken } from './api/authHandler';
import { createCSV } from './api/createCSV';
import path from 'path'
/*  
    - Needs middleware to handle token refresh. 
*/

const app = express();
app.use(cors())

const devRedirectURI = 'http://localhost:3000/spotify_landing';
const prodRedirectURI = 'https://rhysjohnston.xyz/spotifytocsv/spotify_landing'

const clientID = "7f6bb2cf63fc486ca40380f992a53051";
const redirect_URI = prodRedirectURI;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
let accessKeyData: any = {}

app.get('/api/login', async (req, res) => {
    const loginResponse = await handleLogin(clientID, redirect_URI)
    res.redirect(loginResponse.url)

})

app.get('/api/auth', async (req, res) => {
    console.log("Got traffic on /auth")
    const code: string | undefined = req.headers.authorization?.split(' ')[1]
    const bearerToken = await handleToken(code, clientID, clientSecret)
    accessKeyData = bearerToken;
    console.log(bearerToken)
    res.send(accessKeyData)
})

// Gets top 20 tracks. 
app.get('/api/tracks', async (req, res) => {
    console.log("Got traffic on /tracks")
    let topTracks = await getTracks(accessKeyData.access_token)
    if (topTracks) {
        res.send(topTracks)
    } else {
        res.send(JSON.stringify("Couldn't get user tracks"))
    }
}
)
app.get('/api/alltracks', async (req, res) => {
    console.log("Got traffic on /alltracks")
    try {
        const allTracks = await getAllTracks(accessKeyData.access_token)
        const allArtists = listArtists(allTracks)
        const allAlbums = listAlbums(allTracks)
        // Don't need these after all. Good to have? 
        const csvComplete = await createCSV(allTracks);
        if (csvComplete) {
            console.log("CSV created")
            res.send(JSON.stringify(csvComplete))
        }
    } catch (err) {
        console.log(err)
        res.send(JSON.stringify("Error getting tracks"))
    }
})

const filePath = path.join(__dirname, '/csv_out/output.csv')
app.get('/api/csvfile', async (req, res) => {
    console.log("Traffic on /csvfile")
    res.sendFile(filePath, (err) => {
        if(err){
            console.log(err)
            res.send("Error getting CSV")
        }
    })
})

app.listen(8000, () => {
    console.log("Listening on port 8000")
})