"use client"
import { MdPeople } from "react-icons/md";
import styles from "./card.module.css";
import { ref, onValue } from "firebase/database";
import React, { useState, useEffect } from "react";
import { realtimeDB } from "@/app/lib/firebaseconfig";
import { getUserTotal } from "@/app/components/dashboardserver";

const Card = () => {
    const [totalStudent, setTotalStudent] = useState("");
    const [percentageStudent, setPercentageStudent] = useState(0);

    useEffect(() => {
        const registeredStudentsRef = ref(realtimeDB, "totaluser/101/totalstudent");

        // Listen for changes in the value of 'registeredStudents' in the database
        onValue(registeredStudentsRef, (snapshot) => {
            const currentdata = snapshot.val();
            setTotalStudent(currentdata);

            const value = getUserTotal();
            value.then((previousdata) => {
                setPercentageStudent(((currentdata / previousdata[0].data().totaluser) * 100 - 100).toFixed(2));
            });
        });
    }, []);

    return (
        <div className={styles.container}>
            <MdPeople size={24} />
            <div className={styles.texts}>
                <span className={styles.title}>Registered Student</span>
                <span className={styles.number}>{totalStudent}</span>
                <span className={styles.detail}>
                    <span className={styles.positive}>{percentageStudent}%</span> more than previous month
                </span>
            </div>
        </div>
    );
};

export default Card;