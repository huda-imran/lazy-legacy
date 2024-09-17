import React, { useState } from 'react';
import Header from './components/Header';
import IntroSection from './components/IntroSection';
import MintSection from './components/MintSection';
import InstructionsSection from './components/InstructionsSection';
import Footer from './components/Footer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { WagmiConfig } from 'wagmi';
import { scroll, scrollSepolia } from 'viem/chains';

const queryClient = new QueryClient();

// Replace with your WalletConnect Project ID
const projectId = 'd5b272c6a62fafd5e97da575ec46d696';

// Define metadata for your dApp
const metadata = {
  name: 'Lazy Art Legacy',
  description: 'AppKit Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Define the chains you want to support
const chains = [scroll, scrollSepolia];


// Custom Theme for Web3Modal to match your button styling
const themeVariables = {
  '--w3m-font-family': '"Kemco Pixel", sans-serif',        // Matches your font family
  '--w3m-accent': '#0E7A27',                              // Border and hover color (accent color)
  '--w3m-button-border-radius': '2px',                    // Smaller border-radius to make the button more rectangular
  '--w3m-button-border-width': '2px',                     // Border width
  '--w3m-button-border-color': '#0E7A27',                 // Button border color (same as accent)
  '--w3m-button-padding': '12px 30px',                    // Padding inside the button
  '--w3m-button-hover-background-color': '#FFFFFF',       // Background color on hover
  '--w3m-button-hover-text-color': '#0E7A27',             // Text color on hover
  '--w3m-button-hover-box-shadow': '0 4px 8px rgba(0, 0, 0, 0.2)',  // Box shadow on hover
  '--w3m-transition-duration': '0.3s',                    // Transition duration for smooth hover effect
  '--w3m-transition-property': 'background-color, color, box-shadow', // Properties to transition on hover
  '--w3m-button-font-size': '18px',                       // Font size of the button
};


// Create wagmiConfig
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata
});

// Create Web3Modal
createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeVariables
}

);



const App = () => {
  // State to manage section visibility
  const [isMintVisible, setIsMintVisible] = useState(false);

  // Function to handle the "Mint Now" button click
  const handleMintNowClick = () => {
    setIsMintVisible(true); // Show mint and instructions sections
  };

  return (
    <QueryClientProvider client={queryClient}>
    <WagmiConfig config={wagmiConfig}>
    <div className="App">
      <Header />
      {/* Only show IntroSection if minting is not started */}
      {!isMintVisible && <IntroSection onMintNowClick={handleMintNowClick} />}
      {/* Show MintSection and InstructionsSection when minting starts */}
      {isMintVisible && <MintSection />}
      {isMintVisible && <InstructionsSection />}
      <Footer />
    </div>
    </WagmiConfig>
    </QueryClientProvider>
  );
};

export default App;
