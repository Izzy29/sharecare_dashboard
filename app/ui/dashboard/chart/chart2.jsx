"use client"

import styles from './chart.module.css'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: "Sun",
        foodreceived: 4000,
        estimation: 2400,
    },
    {
        name: "Mon",
        foodreceived: 3000,
        estimation: 1398,
    },
    {
        name: "Tue",
        foodreceived: 2000,
        estimation: 3800,
    },
    {
        name: "Wed",
        foodreceived: 2780,
        estimation: 3908,
    },
    {
        name: "Thu",
        foodreceived: 1890,
        estimation: 4800,
    },
    {
        name: "Fri",
        foodreceived: 2390,
        estimation: 3800,
    },
    {
        name: "Sat",
        foodreceived: 3490,
        estimation: 4300,
    },
];

const CustomTooltip = ({ active, payload }) => {
    if (active) {

        return (
            <div className={styles.tooltip}>
                <p className={styles.tooltip3}>{`Number of Food Received: ${payload[0].value}`}</p>
                <p className={styles.tooltip2}>{`Estimation: ${payload[1].value}`}</p>
            </div>
        );
    }

    return null;
};

const Chart2 = () => {
    const customPayload = [
        { value: 'Amount of Food Received', type: 'line', id: 'food', color: '#8884d8' },
        { value: 'Estimation', type: 'line', id: 'estimation', color: '#bababa' },
    ];

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Number of Food Received From Vendor</h2>
            <ResponsiveContainer width="100%" height="90%">
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 0,
                        bottom: 5,
                    }}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
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