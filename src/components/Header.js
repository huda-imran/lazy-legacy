import React from 'react';
import './Header.css';

// The Header component, including the Web3Modal wallet connect button
const Header = () => {
    return (
        <header>
            <div className="container header-container">
                <div className="site-logo">
                    <a className="brand" href="https://www.lazyarthub.com/" title="ScrollSloth" aria-label="ScrollSloth Embrace laziness, capture creativity." rel="home">
                        <img src="assets/images/full-logo.png" alt="Scroll Sloth Logo" />
                    </a>
                </div>
                <nav className="nav-links">
                    <a href="https://lazyarthub.com/drops" className="nav-link">DROPS</a>
                    <a href="https://lazyarthub.com/stats" className="nav-link">STATS</a>
                    <a href="https://lazyarthub.com/create" className="nav-link">CREATE</a>
                </nav>

                {/* Web3Modal Button to connect wallet */}
                <div className="connect-wallet-container">
                    <w3m-button/>  {/* Adding a custom class */}
                </div>
            </div>
        </header>
    );
};

export default Header;
