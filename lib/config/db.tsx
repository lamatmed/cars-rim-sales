import mongoose from "mongoose"
 const connectDB = async ()=>{
try {
    mongoose.connection.on('connected',()=> console.log("Connexion reussi sur db"))
    await mongoose.connect(`${process.env.MONGODB_URI}/cars-db`)
} catch (error) {
    if (error instanceof Error) {
  console.log(error.message);
} else {
  console.log("Une erreur inconnue s'est produite.");
}

}
}
export  default connectDB 