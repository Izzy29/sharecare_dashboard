import { handleViewVolunteer } from '@/app/lib/actions';
import { fetchOneUserVolunteer, fetchUserVolunteer } from '@/app/lib/data';
import styles from '@/app/ui/dashboard/users/singleUser/singleUserVolunteer.module.css'
import { redirect } from 'next/dist/server/api-utils';
import Image from 'next/image'

const SingleUserVolunteerPage = async ({ params }) => {

    const { id } = params;
    const user = await fetchOneUserVolunteer(id);

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
                <form action={handleViewVolunteer} className={styles.form}>
                    <input type="hidden" name="docID" value={id} />
                    <label>Volunteer Name</label>
                    <input type="text" name="name" placeholder={user.name} readOnly />
                    <label>Registration Date</label>
                    <input type="text" name="email" placeholder={user.email} readOnly />
                    <label>District</label>
                    <input type="text" name="phoneNumber" placeholder={user.phoneNumber} readOnly />
                    <label>Association</label>
                    <input type="text" name="association" placeholder={user.association} readOnly />
                    <button>Back</button>
                </form>
            </div>
        </div>
    )
}

export default SingleUserVolunteerPage