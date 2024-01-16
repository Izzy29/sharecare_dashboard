"use client"
import { MdApartment } from "react-icons/md"
import styles from "./card.module.css";
import React, { useState, useEffect } from "react";
import { db } from "@/app/lib/firebaseconfig";
import { getUserTotal } from "@/app/components/dashboardserver";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const Card2 = () => {
    const [totalVendor, setTotalVendor] = useState("");
    const [percentageVendor, setPercentageVendor] = useState(0);

    useEffect(() => {
        const registeredVendorsRef = query(collection(db, "users"), where("role", "==", "Vendor"));

        const unsubscribe = onSnapshot(registeredVendorsRef, (querySnapshot) => {
            const currentData = querySnapshot.size;
            setTotalVendor(currentData);

            const value = getUserTotal();
            value.then((previousData) => {
                console.log(previousData[1].data().totaluser);
                setPercentageVendor(((currentData / previousData[1].data().totaluser) * 100 - 100).toFixed(2));
            });
        });

        return () => unsubscribe();
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
