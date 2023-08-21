import mongoose from "mongoose";

const connectionString = process.env.ATLAS_URI || "";
let connection = "";

try {
  await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  connection = mongoose.connection;
  
  connection.on("error", (error) => {
    console.error("Error connecting to MongoDB:", error);
  });
  
  connection.once("open", () => {
    console.log("Connected to MongoDB using Mongoose");
  });
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
}

export default connection;
