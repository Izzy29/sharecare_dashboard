"use client"
import React, { useState, useEffect } from 'react';

const RealtimeNotification = () => {
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
            }, 6000); // Hide after 3 seconds
        }, 2000); // Show after 2 seconds
    }, []);

    return (
        <div>
            {showNotification && (
                <div
                    style={{
                        position: 'fixed',
                        top: '-100px', // Start off the screen
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'white',
                        padding: '10px',
                        transition: 'top 1000ms cubic-bezier(0.68, -0.55, 0.27, 1.55)' // Animation duration and timing function
                    }}
                >
                    This is a mock notification!
                </div>
            )}
        </div>
    );
};

export default RealtimeNotification;