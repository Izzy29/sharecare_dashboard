import styles from "@/app/ui/dashboard/users/users.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Link from "next/link";
import Image from "next/image";
import { fetchUsers, fetchUsersVendor } from "@/app/lib/data";
import { deleteUserVendor } from "@/app/lib/actions";

const UsersVendorPage = async ({ searchParams }) => {

    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
    const { count, users } = await fetchUsers(q, page);

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Search for a vendor..." />

            </div>
            <table className={styles.table}>
                <thead className={styles.header}>
                    <tr>
                        <td>Vendor Name</td>
                        <td>Registration Date</td>
                        <td>District Date</td>
                        <td>Business Type</td>
                        <td>Status</td>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>
                                <div className={styles.user}>
                                    <Image
                                        src={user.img || "/noavatar.png"}
                                        alt=""
                                        width={40}
                                        height={40}
                                        className={styles.userImage}
                                    />
                                    {user.vendorname}
                                </div>
                            </td>
                            <td>{user.registrationdate.toString().slice(4, 16)}</td>
                            <td>{user.district}</td>
                            <td>{user.businesstype}</td>
                            <td>
                                {user.status ? (
                                    <span style={{ color: 'green', fontWeight: 'bold' }}>Verified</span>
                                ) : (
                                    <span style={{ color: 'red', fontWeight: 'bold' }}>Unverified</span>
                                )}
                            </td>
                            <td>
                                <div className={styles.buttons}>
                                    <Link href={`/dashboard/usersVendor/${user.id}`}>
                                        <button className={`${styles.button} ${styles.view}`}>
                                            View
                                        </button>
                                    </Link>
                                    <form action={deleteUserVendor}>
                                        <input type="hidden" name="id" value={user.id} />
                                        <button className={`${styles.button} ${styles.delete}`}>
                                            Delete
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination count={count} />
        </div>
    );
};

export default UsersVendorPage