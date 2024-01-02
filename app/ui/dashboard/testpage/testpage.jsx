"use client"
import { db } from "@/app/lib/firebaseconfig";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import React, { useState } from 'react';

async function addDataToFirestore(name) {

    try {

        const docRef = doc(db, "uservolunteer", name);
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
        console.log(added.data())
        if (added) {
            setName("");
            const found = added.data().volunteername.includes("John Doe");
            if (found) {
                alert("Found! " + added.data().volunteername);
            }
            else {
                alert("Not found!" + added.data().volunteername);
            }
        }
    }

    return (
        <div>
            <h1>Beta version 1.0</h1>
            <h2>Send data to firestore database!</h2>

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