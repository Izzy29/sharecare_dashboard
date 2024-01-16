"use client"
import { db } from "@/app/lib/firebaseconfig";
import { addDoc, collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import React, { useState } from 'react';

const writeUserData = (studentTotalID, totalStudent, date) => {
    const db = getDatabase();
    set(ref(db, 'totaluser/' + studentTotalID), {
        totalStudent: totalStudent,
        date: date,
    });
};

async function addDataToFirestore(name) {

    try {
        /*const createDocumentVolunteer = async (name, role, phone, association) => {
            await addDoc(collection(db, "users"), {
                userName: name,
                role: role,
                phoneNumber: phone,
                association: association
            });
        };

        const createDocumentVendor = async (name, role, phone, email, brn, address) => {
            await addDoc(collection(db, "users"), {
                userName: name,
                role: role,
                phoneNumber: phone,
                email: email,
                brn: brn,
                address: address
            });
        };

        const createDocumentStudent = async (name, role, phone, email) => {
            await addDoc(collection(db, "users"), {
                userName: name,
                role: role,
                phoneNumber: phone,
                email: email
            });
        };*/

        //await createDocument("Rafiq Haikal", "volunteer", "0123456789", "PERMAS");
        //await createDocumentVendor("PKS Restaurant", "vendor", "0123456789", "rusyaidi@example.com", "123", "Serdang, Selangor");
        await createDocumentStudent("Thayalen Sarween", "student", "01936453764", "thayalen@gmail.com");

        //await createDocument("2", 2/12/2023, "256");
        //await createDocument("3", 3/12/2023, "154");


        /*const docRef = doc(db, "historyregistereduser", "1");
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
        await addDataToFirestore(name);
        alert("Added successfully!");
        /*console.log(added?.data()); // Add null check before calling data()

        if (added) {
            setName("");
            const found = added.data()?.usertype.includes(name); // Use e.target.value instead of just e
            if (found) {
                alert("Found! " + name);
            } else {
                alert("Not found! " + name);
            }
        }*/
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

            <form onSubmit={handleSubmit}>
                <input
                    type="hidden"
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