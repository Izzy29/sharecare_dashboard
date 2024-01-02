import styles from "@/app/ui/help/help.module.css"

const FAQ = () => {
    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.question}>
                    1) What is the ShareCare Food Distribution and Volunteering Management System?
                </div>
                <div className={styles.answer}>
                    ShareCare is a system than can help to distribute food leftover from any sources such as hotel/restaurant to reduce food waste.
                </div>
            </div>
            <div className={styles.box}>
                <div className={styles.question}>
                    2) What is the ShareCare Food Distribution and Volunteering Management System Admin?
                </div>
                <div className={styles.answer}>
                    ShareCare Admin is a module that can help to monitor how much food can be saved per day and also can produce monthly report.
                </div>
            </div>
        </div>
    )
}

export default FAQ;