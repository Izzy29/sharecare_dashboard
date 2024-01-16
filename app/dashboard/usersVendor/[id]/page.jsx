import styles from '@/app/ui/dashboard/users/singleUser/singleUserVendor.module.css'
import Image from 'next/image'
import { fetchOneUserVendor } from "@/app/lib/data";
import { updateUserVendor } from '@/app/lib/actions';
import Link from 'next/link';

const SingleUserVendorPage = async ({ params }) => {
    const { id } = params;
    const user = await fetchOneUserVendor(id);

    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.imgContainer}>
                    <Image src={"/noavatar.png"} alt="" fill />
                </div>
                <div className={styles.belowImg}>
                    {user.name}
                </div>
            </div>
            <div className={styles.formContainer}>
                <form action={updateUserVendor} className={styles.form}>
                    <input type="hidden" name="docID" value={id} />
                    <input type="hidden" name="id" value={user.id} />
                    <label>Vendor Name</label>
                    <input type="text" name="name" value={user.name} placeholder={user.name} readOnly />
                    <label>Email</label>
                    <input type="text" name="email" value={user.email} placeholder={user.email} readOnly />
                    <label>Address</label>
                    <input type="text" name="address" value={user.address} placeholder={user.address} readOnly />
                    <label>Phone Number</label>
                    <input type="text" name="phoneNumber" value={user.phoneNumber} placeholder={user.phoneNumber} readOnly />
                    <label>Business Registration Number</label>
                    <input type="text" name="brn" value={user.brn} placeholder={user.brn} readOnly />
                    <p className={styles.status1}>
                        <label>Current status:</label>
                        {user.status ? (
                            <span style={{ color: 'green', fontWeight: 'bold' }}> Verified</span>
                        ) : (
                            <span style={{ color: 'red', fontWeight: 'bold' }}> Unverified</span>
                        )}
                    </p>
                    <select name="status" id="status" defaultValue={user.status}>
                        <option value="true">Verified</option>
                        <option value="false">Unverified</option>
                    </select>
                    <p className={styles.buttonContainer}>
                        <Link href="./" className={styles.link} >
                            <button className={styles.backButton} type="button">
                                Back
                            </button>
                        </Link>
                        <button className={styles.updateButton} type="submit">
                            Update
                        </button>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default SingleUserVendorPage