import { auth, signOut } from "@/app/auth";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import Image from "next/image";

import {
    MdDashboard,
    MdAnalytics,
    MdPeople,
    MdHelpCenter,
    MdLogout,
    MdAnnouncement,
} from "react-icons/md";

const menuItems = [
    {
        list: [
            {
                title: "Dashboard",
                path: "/dashboard",
                icon: <MdDashboard />,
            },
            {
                title: "List of Registered Vendor",
                path: "/dashboard/usersVendor",
                icon: <MdPeople />,
            },
            {
                title: "List of Registered Volunteer",
                path: "/dashboard/usersVolunteer",
                icon: <MdPeople />,
            },
            {
                title: "Announcement",
                path: "/dashboard/announcement",
                icon: <MdAnnouncement />,
            },
        ],
    },
    {
        list: [
            {
                title: "Document and Report",
                path: "/dashboard/report",
                icon: <MdAnalytics />,
            },
        ],
    },
    {
        list: [
            {
                title: "FAQ",
                path: "/dashboard/FAQ",
                icon: <MdHelpCenter />,
            },
        ],
    },
];

const Sidebar = async () => {

    const { user } = await auth();

    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <Image className={styles.userImage} src={user.img || "/noavatar.png"} alt="" width="50" height="50" />
                <div className={styles.userDetail}>
                    <span className={styles.username}>{user.name}</span>
                    <span className={styles.userTitle}>{user.position}</span>
                </div>
            </div>
            <ul className={styles.list}>
                {menuItems.map((cat) => (
                    <li key={cat.title}>
                        <span className={styles.cat}>{cat.title}</span>
                        {cat.list.map(item => (
                            <MenuLink item={item} key={item.title} />
                        ))}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar