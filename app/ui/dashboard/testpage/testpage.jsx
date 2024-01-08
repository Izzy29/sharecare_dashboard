"use client"
import { db } from "@/app/lib/firebaseconfig";
import { addDoc, collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import React, { useState } from 'react';

async function addDataToFirestore(name) {

    try {
        const createDocument = async (id, studentname, email, checkpoint) => {
            await setDoc(doc(db, "userstudent", id), {
                studentname,
                email,
                checkpoint
            });
        };

        // Creating 10 documents with different and similar checkpoints
        // Creating 10 more documents with different and similar checkpoints
        await createDocument("11", "Hannah Davis", "hannah@gmail.com", "Kolej Tan Sri Aishah Ghani");
        await createDocument("12", "Isaac Taylor", "isaac@gmail.com", "Kolej 10");
        await createDocument("13", "Jessica White", "jessica@gmail.com", "Kolej Tun Dr Ismail");
        await createDocument("14", "Kevin Johnson", "kevin@gmail.com", "Kolej Canselor");
        await createDocument("15", "Lily Brown", "lily@gmail.com", "Kossas");
        await createDocument("16", "Michael Chen", "michael@gmail.com", "Kolej Pendeta Zaba");
        await createDocument("17", "Natalie Miller", "natalie@gmail.com", "Kolej Tan Sri Aishah Ghani");
        await createDocument("18", "Oliver Wang", "oliver@gmail.com", "Kolej 10");
        await createDocument("19", "Penelope Smith", "penelope@gmail.com", "Kolej Tun Dr Ismail");
        await createDocument("20", "Quincy Lee", "quincy@gmail.com", "Kolej Canselor");


        /*const docRef = doc(db, "uservolunteer", name);
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
        });
        return docSnap;*/


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
        alert("Inserting successfully!");
        /*console.log(added.data())
        if (added) {
            setName("");
            const found = added.data().volunteername.includes("John Doe");
            if (found) {
                alert("Found! " + added.data().volunteername);
            }
            else {
                alert("Not found!" + added.data().volunteername);
            }
        }*/
    }

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