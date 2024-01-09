"use client"
import { MdApartment } from "react-icons/md"
import styles from "./card.module.css";
import { ref, onValue } from "firebase/database";
import React, { useState, useEffect } from "react";
import { realtimeDB } from "@/app/lib/firebaseconfig";
import { getUserTotal } from "@/app/components/dashboardserver";

const Card2 = () => {
    const [totalVendor, setTotalVendor] = useState("");
    const [percentageVendor, setPercentageVendor] = useState(0);

    useEffect(() => {
        const registeredVendorRef = ref(realtimeDB, "totaluser/102/totalvendor");

        // Listen for changes in the value of 'totalvendor' in the database
        onValue(registeredVendorRef, (snapshot) => {
            const currentdata = snapshot.val();
            setTotalVendor(currentdata);

            const value = getUserTotal();
            value.then((previousdata) => {
                setPercentageVendor(((currentdata / previousdata[1].data().totaluser) * 100 - 100).toFixed(2));
            });
        });
    }, []);

    return (
        <div className={styles.container}>
            <MdApartment size={24} />
            <div className={styles.texts}>
                <span className={styles.title}>Registered Vendor</span>
                <span className={styles.number}>{totalVendor}</span>
                <span className={styles.detail}>
                    <span className={styles.positive}>{percentageVendor}%</span> more than previous month
                </span>
            </div>

        </div>
    )
};

export default Card2
