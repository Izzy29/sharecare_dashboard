"use client"
import { deleteUserVolunteer } from '@/app/lib/actions';
import React from 'react';

const ConfirmationButtonVolunteer = ({ userId }) => {
    const confirmDelete = (event) => {
        // Ask for confirmation
        const confirmed = window.confirm("Are you sure you want to delete? This action cannot be undone.");

        // If the user confirms, proceed with form submission
        if (confirmed) {
            return true;
        }

        // Otherwise, prevent form submission
        event.preventDefault();
        return false;
    };

    return (
        <div>
            <form action={deleteUserVolunteer} onSubmit={confirmDelete}>
                <input type="hidden" name="id" value={userId} />
                <button>Delete</button>
            </form>
        </div>
    );
};

export default ConfirmationButtonVolunteer;