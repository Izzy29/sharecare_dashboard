"use client";
import React, { useState, useEffect } from 'react';
import { ref, getStorage, listAll, deleteObject, uploadBytes } from 'firebase/storage';
import { imgDB } from "@/app/lib/firebaseconfig";

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
        console.log(txt);
        const imgs = ref(imgDB, txt.name);
        uploadBytes(imgs, txt)
            .then(() => {
                alert('Image uploaded successfully');
                const newImageNames = [...imageNames, txt.name];
                setImageNames(newImageNames);
            })
            .catch((error) => {
                alert('Error uploading image:', error);
            });
    };

    const containerStyle = {
        padding: '20px',
        backgroundColor: '#f2f2f2',
    };

    const inputStyle = {
        marginBottom: '10px',
    };

    const buttonStyle = {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        cursor: 'pointer',
    };

    const deleteButtonStyle = {
        backgroundColor: '#dc3545',
        color: '#fff',
        padding: '5px 10px',
        border: 'none',
        cursor: 'pointer',
        marginLeft: '10px',
    };

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = imageNames.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div style={containerStyle}>
            <input type="file" style={inputStyle} onChange={(e) => setTxt(e.target.files[0])} />
            <button style={buttonStyle} onClick={() => handleUpload(txt)}>
                Submit
            </button>

            <div>
                {currentItems.map((name) => (
                    <div key={name}>
                        <p>{name}</p>
                        <button style={deleteButtonStyle} onClick={() => handleDelete(name)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div>
                <div>
                    <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= imageNames.length}>
                        Next
                    </button>
                    <span>
                        Page {currentPage} of {Math.ceil(imageNames.length / itemsPerPage)}
                    </span>
                </div>
            </div>
        </div>
    );
}
export default StoreImageTextFirebase;