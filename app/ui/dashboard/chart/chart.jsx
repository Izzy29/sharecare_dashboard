"use client"

import React, { useState, useEffect } from 'react';
import styles from './chart.module.css'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const initialData = [
    {
        name: "16",
        studentreceived: 123,
        estimation: 320,
    },
    {
        name: "17",
        studentreceived: 524,
        estimation: 987,
    },
    {
        name: "18",
        studentreceived: 456,
        estimation: 765,
    },
    {
        name: "19",
        studentreceived: 323,
        estimation: 543,
    },
    {
        name: "20",
        studentreceived: 863,
        estimation: 786,
    },
    {
        name: "21",
        studentreceived: 276,
        estimation: 276,
    },
    {
        name: "22",
        studentreceived: 103,
        estimation: 425,
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

const Chart = () => {
    const [data, setData] = useState(initialData);

    useEffect(() => {
        const interval = setInterval(() => {
            setData(prevData => {
                const newData = [...prevData];
                const index = newData.findIndex(item => item.name === "22");
                if (index !== -1) {
                    newData[index] = {
                        ...newData[index],
                        studentreceived: Math.floor(newData[index].studentreceived + Math.random() * 8),
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
        { value: 'Current Month', type: 'line', id: 'student', color: '#8884d8' },
        { value: 'Previous Month', type: 'line', id: 'estimation', color: '#bababa' },
    ];

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Number of Student Received Food</h2>
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
                    <YAxis className={styles.fontSize} label={{ value: "Number of Student", angle: -90, position: "insideLeft", style: { textAnchor: "middle" } }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend payload={customPayload} />
                    <Line type="monotone" dataKey="studentreceived" stroke="#8884d8" />
                    <Line type="monotone" dataKey="estimation" stroke="#bababa" strokeDasharray="3 4 5 2" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;