import "dotenv/config"
import { connectDB } from "./src/database/database.js"
import { app } from "./src/app.js"

const port = process.env.PORT || 5000

connectDB()
.then(() => {
    app.listen(port, () => console.log(`Server is listening on PORT: ${port}`))
})
.catch(error => {
    console.log(`DB connection failed! Error: ${error}`)
    process.exit(1)
})