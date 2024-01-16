"use client"
import React, { useState, useEffect } from 'react';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import moment from 'moment';

const Testpage3 = () => {
    const formatDate = (date) => {
        return moment(date).format('L');
    };

    const getRandomValue = () => {
        return Math.floor(Math.random() * 100);
    };

    const [data, setData] = useState(() => {
        const currentDate = new Date();
        const dates = [];
        for (let i = 6; i >= 0; i--) {
            const previousDate = moment(currentDate).subtract(i, 'days').toDate();
            dates.push({
                name: formatDate(previousDate),
                valuePreviousWeek: getRandomValue(),
                valueThisWeek: getRandomValue()
            });
        }
        return dates;
    });

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        setChartData(data);
    }, [data]);

    useEffect(() => {
        const interval = setInterval(() => {
            setData(prevData => {
                const randomValue = getRandomValue();
                const newData = [...prevData.slice(1), { name: formatDate(new Date()), valuePreviousWeek: prevData[prevData.length - 1].valueThisWeek, valueThisWeek: randomValue }];
                return newData;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            {console.log(chartData)}
            <LineChart width={730} height={250} data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="valueThisWeek" name="Current Day" stroke="#8884d8" />
                <Line type="monotone" dataKey="valuePreviousWeek" name="Previous Day" stroke="#82ca9d" />
            </LineChart>
        </div>
    );
};

export default Testpage3;