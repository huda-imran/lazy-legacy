import React from 'react';
import './InstructionsSection.css';

const InstructionsSection = () => {
    return (
        <section id="instructions-section" className="instructions-section hidden fade">
            <div className="container instructions-container">
                <h2>How to Mint Your NFT</h2>
                <ol>
                    <li>Connect your wallet by clicking on the "Connect Wallet" button at the top right.</li>
                    <li>Select the quantity of NFTs you would like to mint using the plus and minus buttons.</li>
                    <li>Click the "Mint" button to proceed with the transaction. Make sure you have enough ETH in your wallet to cover the minting price.</li>
                    <li>Approve the transaction in your wallet to complete the minting process.</li>
                    <li>Once the minting is complete, your new NFTs will appear in your wallet.</li>
                </ol>
                <p>Happy Minting! If you encounter any issues, feel free to <a href="https://discord.gg/sXryyqtpwF" className="help-link">reach out to us on Discord</a>.</p>
            </div>
        </section>
    );
};

export default InstructionsSection;
