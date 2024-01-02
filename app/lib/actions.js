"use server";

import { revalidatePath } from "next/cache";
import { UserVen, UserVol } from "./model";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import { signIn } from "../auth";

export const deleteUserVendor = async (formData) => {
    console.log(formData);
    const { id } = Object.fromEntries(formData);

    try {
        connectToDB();
        await UserVen.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
        throw new Error("Failed to delete user!");
    }

    revalidatePath("/dashboard/usersVendor");
};

export const deleteUserVolunteer = async (formData) => {
    console.log(formData);
    const { id } = Object.fromEntries(formData);

    try {
        connectToDB();
        await UserVol.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
        throw new Error("Failed to delete user!");
    }

    revalidatePath("/dashboard/usersVolunteer");
};

export const updateUserVendor = async (formData) => {
    const { id, vendorname, registrationdate, district, businesstype, status } =
        Object.fromEntries(formData);
    console.log("Im here!");

    try {
        connectToDB();

        const updateFields = {
            vendorname,
            registrationdate,
            district,
            businesstype,
            status,
        };

        Object.keys(updateFields).forEach(
            (key) =>
                (updateFields[key] === "" || undefined) && delete updateFields[key]
        );

        await UserVen.findByIdAndUpdate(id, updateFields);
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