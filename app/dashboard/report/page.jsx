"use client";
import React from 'react';
import styles from '@/app/ui/report/report.module.css';
import { FaFilePdf } from 'react-icons/fa';
import { generatePDF } from '@/app/components/GeneratePDF';


const Report = () => {
    const monthlyReportData = [
        { id: 1, name: 'November 2023' },
        { id: 2, name: 'December 2023' },
        //{ id: 3, name: 'January 2024' },
    ];

    const documentData = [
        { id: 4, name: 'List of Registered Vendor' },
        { id: 5, name: 'List of Registered Volunteer' },
        { id: 6, name: 'List of Registered Student' },
        { id: 7, name: 'List of Association' },
    ];

    return (
        <div className={styles.container}>
            <label className={styles.text}>Monthly Report</label>
            <div className={styles.report}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.th1}>No.</th>
                            <th className={styles.th2}>Name</th>
                            <th className={styles.th3}>Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        {monthlyReportData.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td className={styles.download}>
                                    <button
                                        onClick={() => generatePDF(item.id, item.name)}
                                        className={styles.iconButton}
                                    >
                                        <FaFilePdf className={styles.icon} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <label className={styles.text}>List of Documents</label>
            <div className={styles.document}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.th1}>No.</th>
                            <th className={styles.th2}>Name</th>
                            <th className={styles.th3}>Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documentData.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id - 3}</td>
                                <td>{item.name}</td>
                                <td className={styles.download}>
                                    <button
                                        onClick={() => generatePDF(item.id, item.name)}
                                        className={styles.iconButton}
                                    >
                                        <FaFilePdf className={styles.icon} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Report;