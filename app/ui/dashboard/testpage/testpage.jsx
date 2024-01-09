"use client"
import { db } from "@/app/lib/firebaseconfig";
import { addDoc, collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import React, { useState } from 'react';

async function addDataToFirestore(name) {

    try {
        /*const createDocument = async (id, usertype, totaluser) => {
            await setDoc(doc(db, "currentregistereduser", id), {
                usertype,
                totaluser
            });
        };

        // Creating 10 documents with different and similar checkpoints
        // Creating 10 more documents with different and similar checkpoints
        await createDocument("1", "student", "345");
        await createDocument("2", "vendor", "10");
        await createDocument("3", "volunteer", "52");*/


        const docRef = doc(db, "historyregistereduser", "1");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }

        //To fetch all user
        /*const querySnapshot = await getDocs(collection(db, "uservolunteer"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });*/
        return docSnap;


    } catch (error) {
        console.error("Error getting the data ", error);
        return false;
    }
}

const Testpage = () => {
    const [name, setName] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        const added = await addDataToFirestore(name);
        console.log(added?.data()); // Add null check before calling data()

        if (added) {
            setName("");
            const found = added.data()?.usertype.includes(name); // Use e.target.value instead of just e
            if (found) {
                alert("Found! " + name);
            } else {
                alert("Not found! " + name);
            }
        }
    };

    const handleRetrieve = async () => {
        getDocs(collection(db, 'uservendor'))
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // Access the data for each user document
                    const userData = doc.data();
                    console.log(userData);
                });
                alert("Please check your console.log!");
            })
            .catch((error) => {
                console.log('Error getting user data:', error);
            });
    }

    return (
        <div>
            <h1>Beta version 1.0</h1>
            <h2>Send data to firestore database!</h2>
            <button onClick={() => { handleRetrieve() }}>Retrieve List of Data From User Vendor</button>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Input your name"
                    onChange={(e) => {
                        setName(e.target.value);
                        console.log(e.target.value);
                    }}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default Testpage