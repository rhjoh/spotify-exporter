import "./home.css"

const Home = () => {

    // How to manage env vars for different environments? 
    const dev_url = "http://localhost:8000/login";
    const prod_url = "https://rhysjohnston.xyz/login";


    async function handleLogin() {
        console.log("Clicked")
        window.location.href = prod_url;
    }
    return (
        <div className="login-container">
            <h2 className="login-header">Spotify to CSV exporter</h2>
            <span className="header-paragraph">This simple web app uses the Spotify web API to securely login and 
                generate a CSV file of your 'Liked Songs' playlist. <br />

                No data is stored server-side and you can remove access any time via your {" "}
                <a href="https://support.spotify.com/us/article/spotify-on-other-apps/" className="header-link">Spotify account</a>
                </span>
            <button className="login-button" onClick={() => handleLogin()}>Login to Spotify</button>
        </div>
    )
}

export default Home;