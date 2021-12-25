const express = require('express');
const { Console } = require("console");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();

class toDoList {
    constructor(_id, taskTitle, insertdate, isCompleted){
        this._id = id;
        this.taskTitle = taskTitle;
        this.insertdate = insertdate;
        this.isCompleted = isCompleted;
    } 
}

const uri = "mongodb+srv://Yesudei:yesudei@yesutest1.k1ohz.mongodb.net/Shalgalt?retryWrites=true&w=majority";

const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const collection = client.db("Shalgalt").collection("List");

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('views'));
app.use(express.static('/public/home.css'));
app.use(express.static('/CSS'));
app.use('/CSS', express.static(__dirname + '/CSS/home.css'));

app.get("/", function(req, res) {
    const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    let list_arr = [];
    client.connect((error, result) => {
        const collection = client.db("Shalgalt").collection("List");
        collection.find().toArray().then( result => {
            list_arr = result.slice();
        }).catch(error => console.error(error))
    });
    
    console.log(list_arr);
    client.close();
    res.render('index', {List: list_arr});
    //res.sendFile(__dirname + "/home.html");
});
app.get("/index", function(req,res) {
    res.sendFile(__dirname + "/index.html")
});
app.post("/", function(req, res) {
    var _taskTitle = "Task 1"
    var _insertDate = Date.now()
    var _isCompleted = "1"

    client.connect((error, result ) =>{
        const collection = client.db("Shalgalt").collection("List");
        collection.insertOne({id: 1, taskTitle: "myTask1", insertdate: Date.now(), isCompleted: true}).then(result => { console.log(result)}).catch(error=>console.error(error));
        client.close();
    })

});

app.listen(3000, function() {
    console.log('Starting server at port 3000')
});