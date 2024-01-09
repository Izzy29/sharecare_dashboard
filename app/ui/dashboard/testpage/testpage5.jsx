"use client"
import { getDatabase, ref, onValue } from "firebase/database";
import { getApp } from "firebase/app";
import React, { useState, useEffect } from "react";
import { writeUserData } from "@/app/components/dashboardserver";

const AddingToRealtimeDatabase = () => {
    const [totalStudent, setTotalStudent] = useState("");
    const [totalVendor, setTotalVendor] = useState("");
    const [totalVolunteer, setTotalVolunteer] = useState("");

    useEffect(() => {
        const db = getDatabase(getApp());
        const registeredStudentsRef = ref(db, "totaluser/101/totalstudent");
        const registeredVendorRef = ref(db, "totaluser/102/totalvendor");
        const registeredVolunteerRef = ref(db, "totaluser/103/totalvolunteer");

        // Listen for changes in the value of 'totalstudent' in the database
        onValue(registeredStudentsRef, (snapshot) => {
            const data = snapshot.val();
            setTotalStudent(data);
        });

        // Listen for changes in the value of 'totalvendor' in the database
        onValue(registeredVendorRef, (snapshot) => {
            const data = snapshot.val();
            setTotalVendor(data);
        });

        // Listen for changes in the value of 'totalvolunteer' in the database
        onValue(registeredVolunteerRef, (snapshot) => {
            const data = snapshot.val();
            setTotalVolunteer(data);
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        writeUserData(101, 102, 103, totalStudent, totalVendor, totalVolunteer);
    };

    return (
        <div>
            <div>
                <form action="" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="totalstudent"
                        placeholder="Enter Number of Total Student"
                    />
                    <input
                        type="text"
                        name="totalvendor"
                        placeholder="Enter Number of Total Vendor"
                    />
                    <input
                        type="text"
                        name="totalvolunteer"
                        placeholder="Enter Number of Total Volunteer"
                    />
                    <h1>Total Students: {totalStudent}</h1>
                    <h1>Total Vendors: {totalVendor}</h1>
                    <h1>Total Volunteers: {totalVolunteer}</h1>
                    <button type="submit">Click this</button>
                </form>
            </div>
        </div>
    );
};

export default AddingToRealtimeDatabase;