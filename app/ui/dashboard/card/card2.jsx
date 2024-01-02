import { MdApartment } from "react-icons/md"
import styles from "./card.module.css"

const Card2 = () => {
    return (
        <div className={styles.container}>
            <MdApartment size={24} />
            <div className={styles.texts}>
                <span className={styles.title}>Registered Vendor</span>
                <span className={styles.number}>13</span>
                <span className={styles.detail}>
                    <span className={styles.positive}>5%</span> more than previous week
                </span>
            </div>

        </div>
    )
}

export default Card2
