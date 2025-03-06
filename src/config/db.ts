import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const mongoDbURL = process.env.CONNECTION_URL as string;

export default (async () => {
    try {
        await mongoose.connect(mongoDbURL);
        console.log('MongoDB connected!!!');

    } catch (error) {
        console.log('Error >>', error);
        process.exit(1);
    }
})();