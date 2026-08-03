import "dotenv/config"

if (!process.env.MONGODB_URI){
    throw new Error("MONGODB_URI is not defined in environmental variables")
}

const config = {
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET:process.env.JWT_SECRET
}

export default config