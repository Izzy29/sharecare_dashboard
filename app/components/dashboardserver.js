import { ref, set } from "firebase/database";
import { db, realtimeDB } from "../lib/firebaseconfig";
import { doc, getDoc } from "firebase/firestore";

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