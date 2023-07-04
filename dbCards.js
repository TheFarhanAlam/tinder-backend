import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
    name: String,
    imgUrl: String
});

const User = mongoose.model("User", cardSchema);

export default User;