import React from 'react';
import styles from '@/app/ui/report/report.module.css';
import { FaFilePdf } from 'react-icons/fa';

const Report = () => {
    const monthlyReportData = [
        { id: 1, name: 'November 2023' },
        { id: 2, name: 'December 2023' },
        { id: 3, name: 'January 2023' },
    ];

    const documentData = [
        { id: 1, name: 'List of Registered Vendor' },
        { id: 2, name: 'List of Registered Volunteer' },
        { id: 3, name: 'List of Registered Student' },
        { id: 4, name: 'List of Association' },
    ];

    return (
        <div className={styles.container}>
            <text className={styles.text}>Monthly Report</text>
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
                                    <FaFilePdf />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <text className={styles.text}>List of Documents</text>
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
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td className={styles.download}>
                                    <FaFilePdf />
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
