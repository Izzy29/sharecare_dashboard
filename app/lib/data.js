import { UserVen, UserVol, StudRecFood } from "./model"
import { connectToDB } from "./utils";
import { db } from "@/app/lib/firebaseconfig";
import { getFirestore, collection, query, where, limit, getDocs, getDoc, doc } from "firebase/firestore";


//To fetch vendor using firebase
export const fetchUsersVendor = async () => {
    try {
        const q = query(collection(db, "users"), where("role", "==", "Vendor"));
        const querySnapshot = await getDocs(q);
        const users = querySnapshot.docs.map(doc => doc.data());
        return users;

    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch the user!");
    }
}

//Fetch document ID using firebase
export const fetchUsersVendorID = async () => {
    try {
        const q = query(collection(db, "users"), where("role", "==", "Vendor"));
        const querySnapshot = await getDocs(q);
        const usersID = querySnapshot.docs.map(doc => doc.id);
        return usersID;

    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch the user!");
    }
}

//Fetch specific uservendor
export const fetchOneUserVendor = async (id) => {
    try {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);

        return docSnap.data();
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch the user!");
    }
}

//To fetch volunteer informations
export const fetchUsersVol = async (q, page) => {
    const regex = new RegExp(q, "i");

    const ITEM_PER_PAGE = 5;

    try {
        connectToDB()
        const count = await UserVol.find({ volunteername: { $regex: regex } }).count();
        const users = await UserVol.find({ volunteername: { $regex: regex } }).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page - 1));
        return { count, users };

    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch users!");
    }
}

//To fetch single volunteer information
export const fetchUserVolunteer = async () => {
    try {
        const q = query(collection(db, "users"), where("role", "==", "Volunteer"));
        const querySnapshot = await getDocs(q);
        const users = querySnapshot.docs.map(doc => doc.data());
        return users;

    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch the user!");
    }
}

export const fetchUserVolunteerID = async () => {
    try {
        const q = query(collection(db, "users"), where("role", "==", "Volunteer"));
        const querySnapshot = await getDocs(q);
        const usersID = querySnapshot.docs.map(doc => doc.id);
        return usersID;

    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch the user!");
    }
}

export const fetchOneUserVolunteer = async (id) => {
    try {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);

        return docSnap.data();
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch the user!");
    }
}

export const fetchStudRecFood = async () => {
    try {
        connectToDB()
        const user = await StudRecFood.find({});
        return user;

    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch the user!");
    }
}