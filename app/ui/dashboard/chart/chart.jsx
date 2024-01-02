"use client"

import styles from './chart.module.css'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        day: "21/1",
        food: 4000,
        estimation: 2400,
    },
    {
        day: "22/1",
        food: 3000,
        estimation: 1398,
    },
    {
        day: "23/1",
        food: 2000,
        estimation: 3800,
    },
    {
        day: "24/1",
        food: 2780,
        estimation: 3908,
    },
    {
        day: "25/1",
        food: 1890,
        estimation: 4800,
    },
    {
        day: "26/1",
        food: 2390,
        estimation: 3800,
    },
    {
        day: "27/1",
        food: 3490,
        estimation: 4300,
    },
];

const CustomTooltip = ({ active, payload }) => {
    if (active) {

        return (
            <div className={styles.tooltip}>
                <p className={styles.tooltip3}>{`Number of Student: ${payload[0].value}`}</p>
                <p className={styles.tooltip2}>{`Estimation: ${payload[1].value}`}</p>
            </div>
        );
    }

    return null;
};

const Chart = () => {

    const customPayload = [
        { value: 'Number of Student', type: 'line', id: 'food', color: '#8884d8' },
        { value: 'Estimation', type: 'line', id: 'estimation', color: '#bababa' },
    ];

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Number of Student Received the Food</h2>
            <ResponsiveContainer width="100%" height="90%">
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend payload={customPayload} />
                    <Line type="monotone" dataKey="food" stroke="#8884d8" />
                    <Line type="monotone" dataKey="estimation" stroke="#bababa" strokeDasharray="3 4 5 2" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;