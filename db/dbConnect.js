import mongoose from "mongoose";

// Mongo Db Connection Function
export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(`${process.env.MONGO_DB_URI}/tofound`)
        console.warn(`Mongo DB connectiong succesfull to ${conn.connection.db.databaseName}`)
    }
    catch(err){
        console.error(`Something went wrong to connect to databse` + err)
        throw err
    }
}