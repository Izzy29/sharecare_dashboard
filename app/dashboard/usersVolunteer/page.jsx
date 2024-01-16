import styles from "@/app/ui/dashboard/users/users.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Link from "next/link";
import Image from "next/image";
import { fetchUserVolunteer, fetchUserVolunteerID } from "@/app/lib/data";
import ConfirmationButtonVolunteer from "@/app/ui/dashboard/users/confirmationButtonVolunteer";

const UsersVolunteerPage = async () => {

    const users = await fetchUserVolunteer();
    const usersID = await fetchUserVolunteerID();

    return (
        <div>
            <div className={styles.header}>
            </div>
            <div className={styles.content}>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Association</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={usersID[index]}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.association}</td>
                                <td>
                                    <Link href={`/dashboard/usersVolunteer/${usersID[index]}`}>
                                        <button>View</button>
                                    </Link>
                                </td>
                                <td>
                                    <ConfirmationButtonVolunteer userId={usersID[index]} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.footer}>
                Page Number
            </div>
        </div>
    );
};

export default UsersVolunteerPage;