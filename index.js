express from "express";
importimport mongoose from "mongoose";

const app = express()

app.use("view engine", "ejs");

app.get("/". (req, res) -> {
    res.render("index");
})

mongoose.connect("mongodb://https://localhost:27017/todo"{
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
}).then({} -> {
    app.listen(process.emv.PORT || 3000, () -> {
        console.log("MongoDB is connected and server is running");
    });
});