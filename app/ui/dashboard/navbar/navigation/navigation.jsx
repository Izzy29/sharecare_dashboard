"use client"

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from './navigation.module.css';

import React from 'react'

const Navigation = () => {
    const pathname = usePathname();
    const [title, setTitle] = useState('');

    useEffect(() => {
        // Your logic to determine the title based on the selection
        const getTitleFromSelection = (selection) => {
            console.log(selection);
            switch (selection) {
                case 'dashboard':
                    return 'Dashboard ';
                case 'usersVendor':
                    return 'List of Registered Vendor';
                case 'usersVolunteer':
                    return 'List of Registered Volunteer';
                case 'announcement':
                    return 'Announcement';
                case 'report':
                    return 'Reports';
                case 'settings':
                    return 'Settings';
                case 'FAQ':
                    return 'Frequent Asked Question (FAQ)';
                case 'test':
                    return 'Testing Area';
                case 'activitylog':
                    return 'Activity Log';
                default:
                    return 'User Information';
            }
        };

        const currentSelection = pathname.split("/").pop();
        const newTitle = getTitleFromSelection(currentSelection);

        // Update the title state
        setTitle(newTitle);
    }, [pathname]);
    return (
        <div className={styles.title}>{title}</div>
    );
}

export default Navigation