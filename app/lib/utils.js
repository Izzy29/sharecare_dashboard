import mongoose from 'mongoose';

// Define the caching object outside the function
const connection = {};

export const connectToDB = async () => {
    try {
        // Check if already connected
        if (connection.isConnected) {
            console.log('Already connected to the database');
            return;
        }

        // Connect to the database
        const db = await mongoose.connect(process.env.MONGO);

        // Update connection status
        connection.isConnected = db.connections[0].readyState;

        console.log('Connected to the database');
    } catch (error) {
        // Handle connection errors
        throw new Error(error);
    }
};
