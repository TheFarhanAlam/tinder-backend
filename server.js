import express from "express"
import mongoose from "mongoose"
import User from "./dbCards.js";
import bodyParser from "body-parser";
import cors from "cors"
import dotenv from "dotenv"

const dotenve = dotenv.config();


// App config 
const app = express();
const port = process.env.PORT || 8000;
const connectionUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@tinder.yay14mt.mongodb.net/?retryWrites=true&w=majority`

// Middlewares 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());


// DB config 
mongoose.connect(connectionUrl)
.then(() => {
    console.log("Connection Successfully");
})

// API Endpoint
app.post("/add", (req, res)=> {
    const {name, imgUrl} = req.body;
    const user = new User({
        name: name,
        imgUrl: imgUrl
    })
    user.save();
    res.send(user)
});

app.get("/tinder/cards", (req, res) => {
    const dbCard = req.body;
    User.find(dbCard)
    .then((result) => {
        res.status(201).send(result)
    })
})

// Listener 
app.listen(port, () => {
    console.log(`Listening to the ${port}`);
})