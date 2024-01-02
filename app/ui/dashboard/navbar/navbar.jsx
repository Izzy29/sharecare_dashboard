import styles from './navbar.module.css';
import { auth, signOut } from "@/app/auth";
import Navigation from './navigation/navigation';
import { MdLogout, MdNotifications, MdOutlineChat, MdPublic, MdSearch } from "react-icons/md";


const Navbar = () => {

    return (
        <div className={styles.container}>
            <div ><Navigation /></div>
            <div className={styles.menu}>
                <div className={styles.icons}>
                    <form action={async () => {
                        "use server"
                        await signOut();
                    }}>
                        <button className={styles.logout}>
                            <MdLogout />
                            <span className={styles.tooltip}>Logout</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
