import React from 'react'
import styles from "@/app/ui/report/report.module.css"
import { FaCalendarAlt } from "react-icons/fa";

const Report = () => {
    return (
        <div className={styles.container}>
            <h3>All Report History</h3>
            <div className={styles.list}>
                <table className={styles.table}>
                    <tr>
                        <td className={styles.a}>
                            <FaCalendarAlt className={styles.icons} />
                        </td>
                        <td className={styles.b}>August 2023</td>
                        <td className={styles.c}>
                            <div className={styles.buttons}>
                                <button className={`${styles.button} ${styles.delete}`}>Download</button>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default Report