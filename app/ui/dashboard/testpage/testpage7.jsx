import Link from 'next/link';
import styles from './testpage7.module.css';
import { fetchUsersVendor, fetchUsersVendorID } from '@/app/lib/data';

const ListOfRegisteredVendor = async () => {
    const users = await fetchUsersVendor();
    const usersID = await fetchUsersVendorID();

    console.log(usersID);

    return (
        <div>
            <div className={styles.header}>
                <h1>User List</h1>
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
                                    <button>Delete</button>
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

export default ListOfRegisteredVendor;