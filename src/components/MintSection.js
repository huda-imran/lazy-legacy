import React, { useState, useEffect } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import './MintSection.css';
import { parseEther } from 'viem';
import NotificationModal from './NotificationModal';

const MintSection = () => {
    const [quantity, setQuantity] = useState(1);
    const [isPending, setIsPending] = useState(false);
    const [transactionHash, setTransactionHash] = useState(null);
    const [modalMessage, setModalMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Hardcoded ABI
    const abi = [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "quantity",
                    "type": "uint256"
                }
            ],
            "name": "safeMintBatch",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "mintPrice",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    const { writeContractAsync } = useWriteContract();
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash: transactionHash,
    });

    const handleIncrease = () => {
        setQuantity(prevQuantity => Math.min(prevQuantity + 1, 100)); // Set a max limit if needed
    };

    const handleDecrease = () => {
        setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1)); // Minimum of 1 token
    };

    const handleMint = async () => {
        setIsPending(true);
        setTransactionHash(null);
        setModalMessage('Transaction sent! Awaiting confirmation...');
        setIsModalOpen(true);
        /*global BigInt*/
        const totalMintPrice = parseEther((0.0004 * quantity).toString()); // Adjust mint price in wei
        try {
            const result = await writeContractAsync({
                address: '0xf30B1B8Be97cfd8b19A5a9d2973FC39B14921700', // Contract address
                abi, // Hardcoded ABI with the safeMintBatch function
                functionName: 'safeMintBatch',
                args: [BigInt(quantity)],
                value: totalMintPrice
            });
            console.log("has", result)
            setTransactionHash(result); // Store the transaction hash for confirmation
        } catch (error) {
            console.error("Minting failed", error);
            setModalMessage('Minting failed. Please try again or check your wallet connection.');
        } finally {
            setIsPending(false);
        }
    };

    useEffect(() => {
        if (isConfirmed) {
            setModalMessage('Transaction confirmed! 🎉');
        }
    }, [isConfirmed]);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <section id="mint-section" className="mint-nft-section hidden fade">
            <div className="container mint-nft-container">
                <div className="featured-nft">
                    <div className="nft-card">
                        <div className="card-shadow"></div>
                        <div className="card-overlay">
                            <img src="assets/images/NFT.jpeg" alt="NFT Card 1" />
                            <div className="card-details">
                                <h2>Lazy Art Legacy</h2>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mint-controls">
                    <h2 className="vivid-heading">Mint Your Lazy Art Legacy 💤</h2>
                    <p>Select the quantity and click "Mint" to mint your NFTs. Price per token is 0.0004 ETH.</p>
                    <div className="mint-quantity-controls">
                        <button className="quantity-btn" onClick={handleDecrease} disabled={isPending || isConfirming}>-</button>
                        <input
                            type="number"
                            id="mint-quantity"
                            min="1"
                            value={quantity}
                            onChange={e => setQuantity(Math.max(Number(e.target.value), 1))} // Ensure min value
                            className="mint-quantity"
                            disabled={isPending || isConfirming}
                        />
                        <button className="quantity-btn" onClick={handleIncrease} disabled={isPending || isConfirming}>+</button>
                    </div>
                    <button id="mint-button" className="mint-button" onClick={handleMint} disabled={isPending || isConfirming}>
                        {isPending || isConfirming ? 'Minting' : 'Mint'}
                        {isPending || isConfirming && <span className="loading-dots">...</span>}
                    </button>
                </div>
            </div>

            <NotificationModal 
                isOpen={isModalOpen}
                isPending={isPending || isConfirming}
                isConfirmed={isConfirmed}
                message={modalMessage}
                transactionHash={transactionHash}
                onClose={closeModal}
            />
        </section>
    );
};

export default MintSection;
