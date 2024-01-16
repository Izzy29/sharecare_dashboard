"use client"
import { MdPeople } from "react-icons/md";
import styles from "./card.module.css";
import React, { useState, useEffect } from "react";
import { db } from "@/app/lib/firebaseconfig";
import { getUserTotal } from "@/app/components/dashboardserver";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const Card3 = () => {

    const [totalVolunteer, setTotalVolunteer] = useState(null);
    const [percentageVolunteer, setPercentageVolunteer] = useState(0);

    useEffect(() => {
        const registeredVolunteersRef = query(collection(db, "users"), where("role", "==", "Volunteer"));

        const unsubscribe = onSnapshot(registeredVolunteersRef, (querySnapshot) => {
            const currentData = querySnapshot.size;
            setTotalVolunteer(currentData);

            const value = getUserTotal();
            value.then((previousData) => {
                setPercentageVolunteer(((currentData / previousData[2].data().totaluser) * 100 - 100).toFixed(2));
            });
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className={styles.container}>
            <MdPeople size={24} />
            <div className={styles.texts}>
                <span className={styles.title}>Registered Volunteer</span>
                <span className={styles.number}>{totalVolunteer}</span>
                <span className={styles.detail}>
                    <span className={styles.positive}>{percentageVolunteer}%</span> more than previous month
                </span>
            </div>
        </div>
    )
}

export default Card3;