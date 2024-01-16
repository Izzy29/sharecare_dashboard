"use client"
import React, { useState, useEffect } from 'react';
import styles from './chart.module.css'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const generateRandomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const initialData = [
    {
        name: "16",
        volunteer: generateRandomValue(200, 800),
        estimation: generateRandomValue(200, 800),
    },
    {
        name: "17",
        volunteer: generateRandomValue(200, 800),
        estimation: generateRandomValue(200, 800),
    },
    {
        name: "18",
        volunteer: generateRandomValue(200, 800),
        estimation: generateRandomValue(200, 800),
    },
    {
        name: "19",
        volunteer: generateRandomValue(200, 800),
        estimation: generateRandomValue(200, 800),
    },
    {
        name: "20",
        volunteer: generateRandomValue(200, 800),
        estimation: generateRandomValue(200, 800),
    },
    {
        name: "21",
        volunteer: generateRandomValue(200, 800),
        estimation: generateRandomValue(200, 800),
    },
    {
        name: "22",
        volunteer: generateRandomValue(200, 800),
        estimation: generateRandomValue(200, 800),
    },
];
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length >= 2) {
        return (
            <div className={styles.tooltip}>
                <p className={styles.tooltip3}>{`Current Month ${payload[0].value}`}</p>
                <p className={styles.tooltip2}>{`Previous Month: ${payload[1].value}`}</p>
            </div>
        );
    } else if (active && payload && payload.length === 1) {
        return (
            <div className={styles.tooltip}>
                <p className={styles.tooltip2}>{`Previous Month: ${payload[0].value}`}</p>
            </div>
        );
    }

    return null;
};

const Chart3 = () => {
    const [data, setData] = useState(initialData);

    useEffect(() => {
        const interval = setInterval(() => {
            setData(prevData => {
                const newData = [...prevData];
                const index = newData.findIndex(item => item.name === "22");
                if (index !== -1) {
                    newData[index] = {
                        ...newData[index],
                        volunteer: Math.floor(newData[index].volunteer + Math.random() * 10),
                    };
                }
                return newData;
            });
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const customPayload = [
        { value: 'Current Month', type: 'line', id: 'food', color: '#8884d8' },
        { value: 'Previous Month', type: 'line', id: 'estimation', color: '#bababa' },
    ];

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Number of Volunteer Involved</h2>
            <ResponsiveContainer width="100%" height="90%">
                <LineChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 0,
                        bottom: 5,
                    }}
                >
                    <XAxis dataKey="name" className={styles.fontSize} />
                    <YAxis className={styles.fontSize} label={{ value: "Number of Volunteer", angle: -90, position: "insideLeft", style: { textAnchor: "middle" } }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend payload={customPayload} />
                    <Line type="monotone" dataKey="volunteer" stroke="#8884d8" />
                    <Line type="monotone" dataKey="estimation" stroke="#bababa" strokeDasharray="3 4 5 2" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Chart3