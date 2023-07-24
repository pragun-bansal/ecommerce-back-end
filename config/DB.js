const mongoose = require("mongoose");

async function connectMongoDB(){
return mongoose
.connect(process.env.MONGODB_URL)
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log(err));
}

module.exports={
    connectMongoDB
}