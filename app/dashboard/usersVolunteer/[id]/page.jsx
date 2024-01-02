import { handleViewVolunteer } from '@/app/lib/actions';
import { fetchUserVolunteer } from '@/app/lib/data';
import styles from '@/app/ui/dashboard/users/singleUser/singleUserVolunteer.module.css'
import { redirect } from 'next/dist/server/api-utils';
import Image from 'next/image'

const SingleUserVolunteerPage = async ({ params }) => {

    const { id } = params;
    const user = await fetchUserVolunteer(id);

    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.imgContainer}>
                    <Image src={user.img || "/noavatar.png"} alt="" fill />
                </div>
                <div className={styles.belowImg}>
                    {user.volunteername}
                </div>

            </div>
            <div className={styles.formContainer}>
                <form action={handleViewVolunteer} className={styles.form}>
                    <label>Volunteer Name</label>
                    <input type="text" name="volunteername" placeholder={user.volunteername} readOnly />
                    <label>Registration Date</label>
                    <input type="text" name="registrationdate" placeholder={user.registrationdate} readOnly />
                    <label>District</label>
                    <input type="text" name="district" placeholder={user.district} readOnly />
                    <label>Association</label>
                    <input type="text" name="association" placeholder={user.association} readOnly />
                    <button>Back</button>
                </form>
            </div>
        </div>
    )
}

export default SingleUserVolunteerPage