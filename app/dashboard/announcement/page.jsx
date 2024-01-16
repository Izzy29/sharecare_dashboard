"use client";
import React, { useState, useEffect, useRef } from 'react';
import { ref, getStorage, listAll, deleteObject, uploadBytes, getMetadata } from 'firebase/storage';
import { imgDB } from "@/app/lib/firebaseconfig";
import styles from '@/app/ui/dashboard/announcement/announcement.module.css';
import { MdInfo, MdInfoOutline } from 'react-icons/md';
import moment from 'moment';
import { FaInfo } from 'react-icons/fa';

const StoreImageTextFirebase = () => {
  const [imageNames, setImageNames] = useState([]);
  const [imageDates, setImageDates] = useState([]);
  const [imageSizes, setImageSizes] = useState([]);
  const [txt, setTxt] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const listRef = ref(imgDB);

    listAll(listRef)
      .then((res) => {
        const names = res.items.map((itemRef) => itemRef.name);
        setImageNames(names);

        const getMetadataPromises = res.items.map((itemRef) =>
          getMetadata(itemRef)
        );

        Promise.all(getMetadataPromises)
          .then((metadataList) => {
            const dates = metadataList.map((metadata) =>
              moment(metadata.timeCreated).format('lll')
            );
            const sizes = metadataList.map((metadata) => metadata.size);
            setImageDates(dates);
            setImageSizes(sizes);
          })
          .catch((error) => {
            console.log('Error getting image metadata:', error);
          });
      })
      .catch((error) => {
        console.log("Error listing items:", error);
      });
  }, []);

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
      alert('Please select an announcement!');
      return;
    }

    const storage = getStorage();
    const imgs = ref(imgDB, txt.name);
    uploadBytes(imgs, txt)
      .then((snapshot) => {
        // Get the uploaded image's metadata
        return getMetadata(snapshot.ref);
      })
      .then((metadata) => {
        // Update the state with the new image's name, date, and size
        setImageNames((prevNames) => [...prevNames, txt.name]);
        setImageDates((prevDates) => [
          ...prevDates,
          moment(metadata.timeCreated).format('lll'),
        ]);
        setImageSizes((prevSizes) => [...prevSizes, metadata.size]);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        alert('Announcement uploaded successfully');
      })
      .catch((error) => {
        alert('Error uploading announcement: Please try again');
        console.log(error);
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
          <input type="file" accept="image/*" ref={fileInputRef} onChange={(e) => setTxt(e.target.files[0])} />
          <button onClick={() => handleUpload(txt)}>
            Upload
          </button>
        </div>
      </div>

      <div className={styles.containerInside}>
        <div className={styles.labelDivider}>
          <label>Announcement List</label>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Image Name</th>
              <th>Created Date</th>
              <th>File Size</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((name, index) => (
              <tr key={name}>
                <td>{name.length > 50 ? `${name.slice(0, 60)}...` : name}</td>
                <td>{imageDates[index]}</td>
                <td>{(imageSizes[index] / 1000000).toFixed(3)} MB</td>
                <td>
                  <button className={styles.deleteButton} onClick={() => handleDelete(name)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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