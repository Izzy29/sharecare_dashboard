import { MdPeople } from "react-icons/md"
import styles from "./card.module.css"

const Card3 = () => {
    return (
        <div className={styles.container}>
            <MdPeople size={24} />
            <div className={styles.texts}>
                <span className={styles.title}>Registered Volunteer</span>
                <span className={styles.number}>300</span>
                <span className={styles.detail}>
                    <span className={styles.positive}>18%</span> more than previous week
                </span>
            </div>

        </div>
    )
}

export default Card3
