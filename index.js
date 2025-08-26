import express from "express"
import connectDB from "./db/db.js"
import dotenv from "dotenv"
import urlRoutes from "./routes/url.route.js"
import { getUserUrls, getCurrentUser, getUserProfile, loginUser, logoutUser, routeToShortID, signupUser } from "./controllers/url.controller.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import { authMiddleware } from "./middleware/auth.midleware.js"

dotenv.config({})
const app = express()
const port = process.env.PORT || 3000;

app.use(cors({origin:"https://url-shortner-frontend-bay.vercel.app",credentials:true}))
app.use(express.json())
app.use(cookieParser())

connectDB()

app.use("/api/shorturl",urlRoutes)


// app.get("/all/shorturl",authMiddleware,getUserUrls)

app.get("/:shortId",routeToShortID)

app.get("/user/profile",authMiddleware,getUserProfile)


app.listen(port,() => {
    console.log(`app listening at port number ${port}`)
})
