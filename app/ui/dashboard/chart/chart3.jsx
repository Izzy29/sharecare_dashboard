"use client"

import styles from './chart.module.css'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: "Sun",
        numvol: 4000,
        click: 2400,
    },
    {
        name: "Mon",
        numvol: 3000,
        click: 1398,
    },
    {
        name: "Tue",
        numvol: 2000,
        click: 3800,
    },
    {
        name: "Wed",
        numvol: 2780,
        click: 3908,
    },
    {
        name: "Thu",
        numvol: 1890,
        click: 4800,
    },
    {
        name: "Fri",
        numvol: 2390,
        click: 3800,
    },
    {
        name: "Sat",
        numvol: 3490,
        click: 4300,
    },
];

const CustomTooltip = ({ active, payload }) => {
    if (active) {

        return (
            <div className={styles.tooltip}>
                <p className={styles.tooltip3}>{`Number of Volunteer: ${payload[0].value}`}</p>
                <p className={styles.tooltip2}>{`Estimation: ${payload[1].value}`}</p>
            </div>
        );
    }

    return null;
};

const Chart3 = () => {
    const customPayload = [
        { value: 'Number of Volunteer', type: 'line', id: 'food', color: '#8884d8' },
        { value: 'Estimation', type: 'line', id: 'estimation', color: '#bababa' },
    ];

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Number of Volunteer Involved</h2>
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
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend payload={customPayload} />
                    <Line type="monotone" dataKey="numvol" stroke="#8884d8" />
                    <Line type="monotone" dataKey="click" stroke="#bababa" strokeDasharray="3 4 5 2" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Chart3