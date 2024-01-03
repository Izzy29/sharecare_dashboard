import styles from "@/app/ui/help/help.module.css"

const FAQ = () => {
    const faqData = [
        {
            question: "1) What is the ShareCare Food Distribution Management System?",
            answer: "ShareCare is a system than can help to distribute food leftover from any sources such as hotel/restaurant to reduce food waste."
        },
        {
            question: "2) Where is the data coming from?",
            answer: "Basically, all the sata showing inside this system received from our mobile application which is ShareCare: Food Distribution Management Mobile Application."
        },
        {
            question: "3) What is the function of Dashboard?",
            answer: "Dashboard is where all the data visualization will show about the performance of the ShareCare System. This is where all the real-time data will be represent about the current data that has been received from our mobile application. This includes upper oirganization to do some analysis based on the current data."
        },
        {
            question: "4) What is Annoucement?",
            answer: "Annoucement is where all the advertisement from different student association want to promate their current event regarding food donation including foodbank. Admin can help to manage the annoucement by adding new annoucement, view the annoucement and delete the annoucement."
        },
        {
            question: "5) What is Document and Report?",
            answer: "Document and Report is where all the report and document that has been generated from the system will be shown. This includes the monthly report and all the information about the vendor, volunteer, and student."
        },
        {
            question: "6) How do I logout?",
            answer: "Admin can logout by clicking on the logout button on the top right corner of the dashboard."
        }

    ];

    return (
        <div className={styles.container}>
            {faqData.map((item, index) => (
                <div className={styles.box} key={index}>
                    <div className={styles.question}>
                        {item.question}
                    </div>
                    <div className={styles.answer}>
                        {item.answer}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FAQ;