// Assuming you have a styles.loading class in your CSS
import React from 'react';
import styles from '../ui/dashboard/loading.module.css'

export default function Loading() {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.loading}>
                Loading...
            </div>
        </div>
    );
}
