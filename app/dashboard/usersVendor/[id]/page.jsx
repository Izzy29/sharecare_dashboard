import styles from '@/app/ui/dashboard/users/singleUser/singleUserVendor.module.css'
import Image from 'next/image'
import { fetchUserVendor } from "@/app/lib/data";
import { updateUserVendor } from '@/app/lib/actions';
import Link from 'next/link';

const SingleUserVendorPage = async ({ params }) => {

    const { id } = params;
    const user = await fetchUserVendor(id);

    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.imgContainer}>
                    <Image src={user.img || "/noavatar.png"} alt="" fill />
                </div>
                <div className={styles.belowImg}>
                    {user.vendorname}
                </div>

            </div>
            <div className={styles.formContainer}>
                <form action={updateUserVendor} className={styles.form}>
                    <input type="hidden" name="id" value={user.id} />
                    <label>Vendor Name</label>
                    <input type="text" name="vendorname" placeholder={user.vendorname} readOnly />
                    <label>Registration Date</label>
                    <input type="text" name="registrationdate" placeholder={user.registrationdate} readOnly />
                    <label>District</label>
                    <input type="text" name="district" placeholder={user.district} readOnly />
                    <label>Business Type</label>
                    <input type="text" name="businesstype" placeholder={user.businesstype} readOnly />
                    <p className={styles.status1}>
                        <label>Current status:</label>
                        {user.status ? (
                            <span style={{ color: 'green', fontWeight: 'bold' }}> Verified</span>
                        ) : (
                            <span style={{ color: 'red', fontWeight: 'bold' }}> Unverified</span>
                        )}
                    </p>
                    <select name="status" id="status">
                        <option value="true" selected={user.status}>Verified</option>
                        <option value="false" selected={!user.status}>Unverified</option>
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
        </div >
    )
}

export default SingleUserVendorPage