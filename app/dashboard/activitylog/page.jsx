"use client"
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment-timezone';
import styles from '@/app/ui/dashboard/activitylog/activitylog.module.css';
import { db } from '@/app/lib/firebaseconfig';
import { collection, getDocs } from 'firebase/firestore';

const ActivityLog = () => {
    const [activityData, setActivityData] = useState([]);

    useEffect(() => {
        const fetchActivityData = async () => {
            try {
                const snapshot = await getDocs(collection(db, 'activitylog'));
                const data = snapshot.docs.map((doc) => doc.data());
                setActivityData(data);
            } catch (error) {
                console.error('Error fetching activity data:', error);
            }
        };

        fetchActivityData();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <label>List of Recent Activity</label>
                <button>Delete</button>
            </div>
            <div className={styles.content}>
                <table>
                    <thead>
                        <tr>
                            <th className={styles.th1}>Description</th>
                            <th className={styles.th2}>Modified Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {[...activityData].reverse().map((data, index) => (
                            <tr key={index}>
                                <td>{data.activity}</td>
                                <td>{moment(data.modiDate.toDate()).tz('Asia/Kuala_Lumpur').format('lll')}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ActivityLog;