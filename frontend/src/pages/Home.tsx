
const Home = () => {

    async function handleLogin() {
        console.log("Clicked")
        window.location.href = 'http://localhost:8000/login';
    }
    return (
        <div>
            <h1>Home page</h1>
            <button id='start-button' onClick={() => handleLogin()}>Login to Spotify</button>
        </div>
    )
}

export default Home;