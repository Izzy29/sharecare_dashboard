import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const RealTimeChart = ({ data }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        setChartData(data);
    }, [data]);

    return (
        <LineChart width={500} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
    );
};

export default RealTimeChart;