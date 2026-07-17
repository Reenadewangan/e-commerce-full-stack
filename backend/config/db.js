const dns = require("dns");
const mongoose = require("mongoose");

const configureDns = () => {
    const dnsServers = process.env.DNS_SERVERS;

    if (!dnsServers) {
        return;
    }

    const servers = dnsServers
        .split(",")
        .map((server) => server.trim())
        .filter(Boolean);

    if (servers.length > 0) {
        dns.setServers(servers);
    }
};

const connectDB=async()=>{
    try{
        configureDns();

        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is missing from .env");
        }

        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
        });
        console.log("MongoDB connect successfully");
    }
    catch(error){
        console.error('MongoDB connection failed:', error.message);

        if (error.message.includes("IP whitelist")) {
            console.error("Add your current IP address in MongoDB Atlas: Network Access -> Add IP Address.");
        }

        process.exit(1);
    }
};

module.exports=connectDB;
