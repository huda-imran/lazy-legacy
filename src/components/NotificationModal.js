import React from 'react';
import './NotificationModal.css';

const NotificationModal = ({ message, isOpen, isPending, isConfirmed, transactionHash, onClose }) => {
    return (
        <div id="notification-modal" className={isOpen ? 'open' : 'hidden'}>
            <div id="notification-message">
                {isPending ? (
                    <>
                        <p>{message}</p>
                        <p>Transaction is pending...</p>
                    </>
                ) : isConfirmed && transactionHash ? (
                    <>
                        <p>{message}</p>
                        <p>
                            <a href={`https://scrollscan.com/tx/${transactionHash}`} target="_blank" rel="noopener noreferrer">
                                View on Block Explorer
                            </a>
                        </p>
                    </>
                ) : (
                    <p>{message}</p>
                )}
            </div>
            {isConfirmed && (
                <button className="close" onClick={onClose}>Close</button>
            )}
        </div>
    );
};

export default NotificationModal;
