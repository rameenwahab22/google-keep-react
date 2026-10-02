import "./Navbar.css";

function Navbar () {
    return (
        <nav>
        <div className="logo-area">
            <div className="tooltip">
                <span className="material-icons-outlined hover">menu</span>
                <span className="tooltip-text">Main Menu</span>
            </div>
            <img className="gb_9c gb_je" src="https://www.gstatic.com/images/branding/productlogos/keep_2026/v2/web-48dp/logo_keep_2026_color_1x_web_48dp.png" alt="Keep Logo" />
            <span className="logo-text">Keep</span>
        </div>

        <div className="search-area">
            <div className="tooltip">
                <span className="material-icons-outlined hover">search</span>
                <span className="tooltip-text">Search</span>
            </div>
            <input type="text" placeholder="Search" />
        </div>
        <div className="profile-actions-area">
            <div className="tooltip">
                <span className="material-icons-outlined hover">refresh</span>
                <span className="tooltip-text">Refresh</span>
            </div>
            <div className="tooltip">
                <span className="material-icons-outlined hover">view_agenda</span>
                <span className="tooltip-text">List View</span>
            </div>
            <div className="tooltip">
                <span className="material-icons-outlined hover">settings</span>
                <span className="tooltip-text">Settings</span>
            </div>
            <div className="tooltip">
                <span className="material-icons-outlined hover">apps</span>
                <span className="tooltip-text">Apps</span>
            </div>
            <div className="tooltip">
                <img id="img" draggable="false" class="style-scope yt-img-shadow" alt="Avatar" height="34" width="34" src="https://yt3.ggpht.com/u4H01mDTH-4xarJZIvXl19He9hiKK2Z6sfaRDhBgFxOu5leCR8UCx14O8m1M3UNQvJ7WPqaWmg=s88-c-k-c0x00ffffff-no-rj"></img>
                <span className="tooltip-text">Account</span>
            </div>
        </div>
    </nav>
    )
}

export default Navbar;