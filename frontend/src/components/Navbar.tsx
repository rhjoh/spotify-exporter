import './Navbar.css'

const Navbar = () => {

    return (
        <div className="navbar-container">
            <div className='navbar-left'>
                <span>Spotify Exporter</span>
            </div>
            <div className='navbar-right'>
            <i className="bi bi-github"> </i>
                <span>Github</span>
            </div>
        </div>
    )
}

export default Navbar;