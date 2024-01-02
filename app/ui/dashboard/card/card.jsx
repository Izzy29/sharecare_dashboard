import { MdPeople } from "react-icons/md"
import styles from "./card.module.css"

const Card = () => {
    return (
        <div className={styles.container}>
            <MdPeople size={24} />
            <div className={styles.texts}>
                <span className={styles.title}>Registered Student</span>
                <span className={styles.number}>3500</span>
                <span className={styles.detail}>
                    <span className={styles.positive}>13%</span> more than previous week
                </span>
            </div>

        </div>
    )
}

export default Card
