"use client"
import { MdPeople } from "react-icons/md";
import styles from "./card.module.css";
import { ref, onValue } from "firebase/database";
import React, { useState, useEffect } from "react";
import { realtimeDB } from "@/app/lib/firebaseconfig";
import { getUserTotal } from "@/app/components/dashboardserver";

const Card3 = () => {

    const [totalVolunteer, setTotalVolunteer] = useState(null);
    const [percentageVolunteer, setPercentageVolunteer] = useState(0);

    useEffect(() => {
        const registeredVolunteerRef = ref(realtimeDB, "totaluser/103/totalvolunteer");

        onValue(registeredVolunteerRef, (snapshot) => {
            const currentdata = snapshot.val();
            setTotalVolunteer(currentdata);

            const value = getUserTotal();
            value.then((previousdata) => {
                setPercentageVolunteer(((currentdata / previousdata[2].data().totaluser) * 100 - 100).toFixed(2));
            });
        });
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