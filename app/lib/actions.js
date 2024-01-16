"use server";

import { revalidatePath } from "next/cache";
import { UserVen, UserVol } from "./model";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import { signIn } from "../auth";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseconfig";

export const deleteUserVendor = async (formData) => {
    const { id } = Object.fromEntries(formData);
    console.log(id);
    try {
        await deleteDoc(doc(db, "users", id));
    } catch (err) {
        console.log(err);
        throw new Error("Failed to delete user!");
    }

    revalidatePath("/dashboard/usersVendor");
};

export const deleteUserVolunteer = async (formData) => {
    const { id } = Object.fromEntries(formData);
    console.log(id);
    try {
        await deleteDoc(doc(db, "users", id));
    } catch (err) {
        console.log(err);
        throw new Error("Failed to delete user!");
    }

    revalidatePath("/dashboard/usersVolunteer");
};

export const updateUserVendor = async (formData) => {
    const { docID, id, name, email, address, phoneNumber, brn, status } = Object.fromEntries(formData);

    try {
        await setDoc(doc(db, "users", docID), {
            id: id,
            name: name,
            email: email,
            address: address,
            phoneNumber: phoneNumber,
            brn: brn,
            status: (status === "true"),
            role: "Vendor"
        });
    } catch (err) {
        console.log(err);
        throw new Error("Failed to update user!");
    }
    revalidatePath("/dashboard/usersVendor");
    redirect("/dashboard/usersVendor");
};

export const handleViewVolunteer = () => {
    redirect("/dashboard/usersVolunteer");
};

export const authenticate = async (prevState, formData) => {
    const { username, password } = Object.fromEntries(formData);

    try {
        await signIn("credentials", { username, password });
    } catch (err) {
        if (err.message.includes("CredentialsSignin")) {
            return "Wrong Credentials";
        }
        throw err;
    }
};

export const handleBack = () => {
    redirect('/dashboard/usersVendor');
}