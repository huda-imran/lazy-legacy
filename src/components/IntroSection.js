import React from 'react';
import './IntroSection.css';

const IntroSection = ({ onMintNowClick }) => {
  return (
    <section id="intro-section" className="intro-section show">
      <div className="container intro-container">
        <img src="/assets/images/lazyarthub.png" alt="Lazy Art Banner" className="intro-image" />
        <h1>Lazy Art Hub Launchpad</h1>
        <p>Welcome to the LazyArtHub Launchpad. Get ready to mint your Lazy Art Legacy!</p>
        <button
          id="mint-now-btn"
          className="mint-button"
          onClick={onMintNowClick} // Trigger the function when the button is clicked
        >
          Mint Now
        </button>
      </div>
    </section>
  );
};

export default IntroSection;
