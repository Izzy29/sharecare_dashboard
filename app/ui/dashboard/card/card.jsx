"use client"
import { MdPeople } from "react-icons/md";
import styles from "./card.module.css";
import React, { useState, useEffect } from "react";
import { db } from "@/app/lib/firebaseconfig";
import { getUserTotal, updatePreviousTotal } from "@/app/components/dashboardserver";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const Card = () => {
    const [totalStudent, setTotalStudent] = useState("");
    const [percentageStudent, setPercentageStudent] = useState(0);

    updatePreviousTotal();

    useEffect(() => {
        const registeredStudentsRef = query(collection(db, "users"), where("role", "==", "Student"));

        const unsubscribe = onSnapshot(registeredStudentsRef, (querySnapshot) => {
            const currentData = querySnapshot.size;
            setTotalStudent(currentData);

            const value = getUserTotal();
            value.then((previousData) => {
                setPercentageStudent(((currentData / previousData[0].data().totaluser) * 100 - 100).toFixed(2));
            });
        });

        return () => unsubscribe();
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