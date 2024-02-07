import mongoose from "mongoose";

const config={
    isConnected:0
}
export async function createDb(){
    if(config.isConnected){
        return;
    }
    try {
         const db_options={
            dbname:"tododb"
         }
         const {connection}=await mongoose.connect(process.env.MONGO_URL,db_options);
         console.log("database connected successfully !!")
         config.isConnected=connection.readyState;
    }catch (error) {
        console.log("error occured ---> ",error)
    }
}