"use client"
import React, { useEffect, useState } from 'react';
import styles from './chart.module.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const initialData = [
    {
        name: "16",
        foodreceived: 234,
        estimation: 508,
    },
    {
        name: "17",
        foodreceived: 543,
        estimation: 345,
    },
    {
        name: "18",
        foodreceived: 210,
        estimation: 645,
    },
    {
        name: "19",
        foodreceived: 234,
        estimation: 234,
    },
    {
        name: "20",
        foodreceived: 324,
        estimation: 265,
    },
    {
        name: "21",
        foodreceived: 536,
        estimation: 354,
    },
    {
        name: "22",
        foodreceived: 123,
        estimation: 554,
    },
];

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length >= 2) {
        return (
            <div className={styles.tooltip}>
                <p className={styles.tooltip3}>{`Current Month: ${payload[0].value}`}</p>
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

const Chart2 = () => {
    const [data, setData] = useState(initialData);

    useEffect(() => {
        const interval = setInterval(() => {
            setData(prevData => {
                const newData = [...prevData];
                const index = newData.findIndex(item => item.name === "22");
                if (index !== -1) {
                    newData[index] = {
                        ...newData[index],
                        foodreceived: Math.floor(newData[index].foodreceived + Math.random() * 5),
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
            <h2 className={styles.title}>Number of Food Received From Vendor</h2>
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
                    <YAxis className={styles.fontSize} label={{ value: "Kg", angle: -90, position: "insideLeft" }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend payload={customPayload} />
                    <Line type="monotone" dataKey="foodreceived" stroke="#8884d8" />
                    <Line type="monotone" dataKey="estimation" stroke="#bababa" strokeDasharray="3 4 5 2" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Chart2