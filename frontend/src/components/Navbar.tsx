import './Navbar.css'

const Navbar = () => {

    return (
        <div className="navbar-container">
            <div className='navbar-left'>
                <a href='/spotifytocsv' target='_blank' rel='noreferrer'>Spotify Exporter</a>
            </div>
            <div className='navbar-right'>
            <i className="bi bi-github"> </i>
                <a href="https://github.com/rhjoh" className='gh-no-style' target='_blank' rel='noreferrer'>Github</a>
            </div>
        </div>
    )
}

export default Navbar;