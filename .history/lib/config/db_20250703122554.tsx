import mongoose from "mongoose"
 const connectDB = async ()=>{
try {
    mongoose.connection.on('connected',()=> console.log("Connexion reussi sur db"))
    await mongoose.connect(`${process.env.MONGODB_URI}/cars-db`)
} catch (error as any) {
    console.log(error.message)
}
}
export  default connectDB 