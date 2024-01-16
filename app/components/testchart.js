import { db } from '@/app/lib/firebaseconfig';
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';

export const FetchMonthData = async () => {
    const q = query(collection(db, "historystudentreceivedfooddecember2023"));
    const querySnapshot = await getDocs(q);
    //const cm = getDoc(db, "historystudentreceivedfoodjanuary2024");
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });

}