"use client";
import React, { useState, useEffect } from 'react';
import { ref, getStorage, listAll, deleteObject, uploadBytes } from 'firebase/storage';
import { imgDB } from "@/app/lib/firebaseconfig";
import styles from '@/app/ui/dashboard/announcement/announcement.module.css';
import { MdInfo, MdInfoOutline } from 'react-icons/md';
import { FaInfo } from 'react-icons/fa';

const StoreImageTextFirebase = () => {
  const [imageNames, setImageNames] = useState([]);
  const [txt, setTxt] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const listRef = ref(imgDB);

    listAll(listRef)
      .then((res) => {
        const names = res.items.map((itemRef) => itemRef.name);
        setImageNames(names);
      })
      .catch((error) => {
        console.log('Error listing items:', error);
      });
  }, [imageNames]);

  const handleDelete = (imageName) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this image?");
    if (!confirmDelete) {
      return;
    }

    const storage = getStorage();
    const imageRef = ref(storage, imageName);

    deleteObject(imageRef)
      .then(() => {
        alert('Image deleted successfully');
        setImageNames((prevNames) => prevNames.filter((name) => name !== imageName));
      })
      .catch((error) => {
        console.log('Error deleting image:', error);
      });
  };

  const handleUpload = (txt) => {

    if (!txt) {
      alert('Please select an annoucement!');
      return;
    }

    console.log(txt);
    const imgs = ref(imgDB, txt.name);
    uploadBytes(imgs, txt)
      .then(() => {
        alert('Annoucement uploaded successfully');
        const newImageNames = [...imageNames, txt.name];
        setImageNames(newImageNames);
      })
      .catch((error) => {
        alert('Error uploading announcement: Please Try Again');
      });
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = imageNames.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.info}>
          <label>Upload Annoucement</label>
          <MdInfoOutline className={styles.infoIcon} />
          <span className={styles.infoText}>
            Only PNG, JPG and JPEG files are allowed <br />Image size = 1080 * 400 pixels</span>
        </div>
        <div className={styles.headerUpload}>
          <input type="file" accept="image/*" onChange={(e) => setTxt(e.target.files[0])} />
          <button onClick={() => handleUpload(txt)}>
            Upload
          </button>
        </div>
      </div>

      <div className={styles.list}>
        <label>Annoucement List</label>
        {currentItems.map((name) => (
          <div className={styles.listArrange} key={name}>
            <p>{name}</p>
            <button className={styles.deleteButton} onClick={() => handleDelete(name)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className={styles.listPage}>
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(imageNames.length / itemsPerPage)}
        </span>
        <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= imageNames.length}>
          Next
        </button>
      </div>
    </div>
  );
}
export default StoreImageTextFirebase;