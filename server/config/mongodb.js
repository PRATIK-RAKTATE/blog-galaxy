import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log("mongodb connected at ", process.env.MONGO_URI)
    })

    mongoose.connect(`${process.env.MONGO_URI}/auth-module`);
}

export default connectDB;