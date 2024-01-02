"use client"
import React from 'react';
import styles from './testpage2.module.css';
import { jsPDF } from "jspdf";
import ReactPDF from '@react-pdf/renderer';

const Testpage2 = () => {

    const handleButton = (value) => {
        const doc = new jsPDF({
            // jsPDF supports encryption of PDF version 1.3.
            // Version 1.3 just uses RC4 40-bit which is kown to be weak and is NOT state of the art.
            // Keep in mind that it is just a minimal protection.
            encryption: {
                userPassword: "user",
                ownerPassword: "owner",
                userPermissions: ["print", "modify", "copy", "annot-forms"]
                // try changing the user permissions granted
            },
            putOnlyUsedFonts: true, orientation: "landscape"
        },
        );
        try {
            if (value === 1) {
                doc.text("my header text", 10, 10)
                doc.text("SHARECARE:", 20, 20);
                doc.text("Food Distribution Management System Report", 20, 30);
                doc.addPage("a4", "l");
                doc.text("Do you like that?", 20, 20);
                doc.save("testing.pdf");
            } else if (value === 2) {
                alert("You click the second button");
            } else if (value === 3) {
                alert("You click the third button");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <button className={styles.button} onClick={() => handleButton(1)}>Click to save in file</button>
            </div>
            <div className={styles.box}>
                <button className={styles.button} onClick={() => handleButton(2)}>Click to render to stream</button>
            </div>
            <div className={styles.box}>
                <button className={styles.button} onClick={() => handleButton(3)}>Click to render in DOM</button>
            </div>
        </div>
    )
}

export default Testpage2;
