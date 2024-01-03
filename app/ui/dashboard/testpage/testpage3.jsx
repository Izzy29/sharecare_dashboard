"use client"
import RealTimeChart from '@/app/components/RealTimeChart';
import { useState, useEffect } from 'react';

const Testpage3 = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setData((prevData) => {
                const newValue = Math.random() * 100; // Generate a random value
                const newData = [...prevData, { name: new Date().toLocaleTimeString(), value: newValue }];
                return newData.slice(-10); // Keep only the last 10 data points
            });
        }, 3000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div>
            <h1>Real-Time Chart</h1>
            <RealTimeChart data={data} />
        </div>
    );
};

export default Testpage3;