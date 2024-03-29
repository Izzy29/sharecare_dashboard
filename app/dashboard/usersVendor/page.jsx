import styles from "@/app/ui/dashboard/users/users.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Link from "next/link";
import { fetchUsersVendor, fetchUsersVendorID } from '@/app/lib/data';
import { deleteUserVendor } from "@/app/lib/actions";
import ConfirmationButtonVendor from "@/app/ui/dashboard/users/confirmationButtonVendor";

const UsersVendorPage = async () => {

    const users = await fetchUsersVendor();
    const usersID = await fetchUsersVendorID();

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
                            <th>Verify</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={usersID[index]}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.status ? "Verified" : "Not Verified"}</td>
                                <td>
                                    <Link href={`/dashboard/usersVendor/${usersID[index]}`}>
                                        <button>Edit</button>
                                    </Link>
                                </td>
                                <td>
                                    <ConfirmationButtonVendor userId={usersID[index]} />
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

export default UsersVendorPage