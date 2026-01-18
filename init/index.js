const mongoose = require("mongoose")
const Listing = require("../models/listing.js")
const initData = require("./data.js")
require('dotenv').config();


// mongodb connection
main()
.then(()=>{console.log("Database connected successfully")})
.catch(err => console.log(err))

async function main(){
    await mongoose.connect(process.env.DB_URL)
}

const initDB = async() =>{
    await Listing.deleteMany({})
    initData.data = initData.data.map((obj)=>({
        ...obj,
        owner: "695fc697a686203d4f3c548a",
    }));
    await Listing.insertMany(initData.data)
    console.log("data inserted successfully")
}

initDB();

