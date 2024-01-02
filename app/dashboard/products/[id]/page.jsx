import styles from '@/app/ui/dashboard/products/singleProduct/singleProduct.module.css'
import Image from 'next/image'

const SingleProductPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.imgContainer}>
                    <Image src="/noproduct.jpg" alt="" fill />
                </div>
                IPhone

            </div>
            <div className={styles.formContainer}>
                <form action="" className={styles.form}>
                    <label>Title</label>
                    <input type="text" name="title" placeholder="IPhone" />
                    <label>Description</label>
                    <input type="text" name="desc" placeholder="This is an Iphone 15" />
                    <label>Price</label>
                    <input type="text" name="price" placeholder="RM3200" />
                    <label>Created At</label>
                    <input type="text" name="createdAt" placeholder="1/12/2023" />
                    <label>Stock</label>
                    <textarea type="text" name="stock" placeholder="72" />
                    <button>Update</button>
                </form>
            </div>
        </div>
    )
}

export default SingleProductPage