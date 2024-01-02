import React from 'react'
import styles from '@/app/ui/dashboard/announcement/announcement.module.css'
import Image from 'next/image'
import { FaUpload } from "react-icons/fa";

const Announcement = () => {
  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.left}>
          <Image className={styles.userImage} src={"/login.jpg"} alt="" width="800" height="200" />
          <h2>Current Annoucement</h2>
        </div>
        <div className={styles.right}>
          <div className={styles.top}>
            <h3>Upload New Annoucement</h3>
          </div>
          <div className={styles.mid}>
            <FaUpload className={styles.icon} />
            <p>PNG, JPG and JPEG files are allowed
              Image size = 1080 * 400 pixels</p>
          </div>
          <div className={styles.bottom}>
            <input type="file" id="myfile" name="myfile" className={styles.file}>
            </input>
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <div className={styles.box1}>
          <h3>All Announcement</h3>
        </div>
        <div className={styles.box2}>

          <Image className={styles.userImage} src={"/login.jpg"} alt="" width="60" height="60" />
          Kelab Harmoni UPM
        </div>
      </div>
    </div>
  )
}

export default Announcement