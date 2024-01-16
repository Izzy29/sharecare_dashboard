import { ref, set } from "firebase/database";
import { db, realtimeDB } from "../lib/firebaseconfig";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";

export const writeUserData = (totalstudentID, totalvendorID, totalvolunteerID, totalstud, totalvendor, totalvolunteer) => {
    set(ref(realtimeDB, 'totaluser/' + totalstudentID), {
        totalstudent: totalstud,
    });

    set(ref(realtimeDB, 'totaluser/' + totalvendorID), {
        totalvendor: totalvendor,
    });

    set(ref(realtimeDB, 'totaluser/' + totalvolunteerID), {
        totalvolunteer: totalvolunteer,
    });

    alert("Realtime Database Updated!")
}

export const getUserTotal = async () => {
    const docRefStudent = doc(db, "historyregistereduser", "1");
    const docSnapStudent = (await getDoc(docRefStudent));

    const docRefVendor = doc(db, "historyregistereduser", "2");
    const docSnapVendor = (await getDoc(docRefVendor));

    const docRefVolunteer = doc(db, "historyregistereduser", "3");
    const docSnapVolunteer = (await getDoc(docRefVolunteer));

    const totalHistoryUser = [docSnapStudent, docSnapVendor, docSnapVolunteer];

    return totalHistoryUser;
}

export const updatePreviousTotal = async () => {
    const historyRef = doc(db, "historyregistereduser", "1");
    const vendorRef = doc(db, "historyregistereduser", "2");
    const volunteerRef = doc(db, "historyregistereduser", "3");
    const userRef = collection(db, "users");

    const [docSnap, docSnapVendor, docSnapVolunteer] = await Promise.all([
        getDoc(historyRef),
        getDoc(vendorRef),
        getDoc(volunteerRef)
    ]);

    const studentQuery = query(userRef, where("role", "==", "Student"));
    const vendorQuery = query(userRef, where("role", "==", "Vendor"));
    const volunteerQuery = query(userRef, where("role", "==", "Volunteer"));

    const [studentDocs, vendorDocs, volunteerDocs] = await Promise.all([
        getDocs(studentQuery),
        getDocs(vendorQuery),
        getDocs(volunteerQuery)
    ]);

    const totalStudent = studentDocs.size;
    const totalVendor = vendorDocs.size;
    const totalVolunteer = volunteerDocs.size;

    const previousDateStud = docSnap.data().previousDate.toDate();
    const previousDateVendor = docSnapVendor.data().previousDate.toDate();
    const previousDateVolunteer = docSnapVolunteer.data().previousDate.toDate();
    const currentDate = new Date();

    const timeDifferenceStud = Math.abs(currentDate - previousDateStud) / 36e5;
    const timeDifferenceVendor = Math.abs(currentDate - previousDateVendor) / 36e5;
    const timeDifferenceVolunteer = Math.abs(currentDate - previousDateVolunteer) / 36e5;

    if (timeDifferenceStud >= 24) {
        const totalUser = docSnap.data().totaluser;
        const newTotalUser = parseInt(totalStudent);

        await updateDoc(historyRef, {
            totaluser: newTotalUser,
            previousDate: currentDate,
        });
    }
    if (timeDifferenceVendor >= 24) {
        const totalUserVendor = docSnapVendor.data().totaluser;
        const newTotalUserVendor = parseInt(totalVendor);

        await updateDoc(vendorRef, {
            totaluser: newTotalUserVendor,
            previousDate: currentDate,
        });
    }
    if (timeDifferenceVolunteer >= 24) {
        const totalUserVolunteer = docSnapVolunteer.data().totaluser;
        const newTotalUserVolunteer = parseInt(totalVolunteer);

        await updateDoc(volunteerRef, {
            totaluser: newTotalUserVolunteer,
            previousDate: currentDate,
        });
    }
}
