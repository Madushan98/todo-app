const express = require("express");
const bodyParser = require("body-parser");



let items = [];
let workItems = [];

const app = express();



app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));


app.get('/', function (req, res) {

    let today = new Date();

    let currentDay = today.getDate();
    let day = "";



    switch (currentDay) {

        case 0:
            day = "Sunday"
            break;
        case 1:
            day = "Monday"
            break;
        default:
            day = "tuesday"


    }
    res.render("list", {
        day: day,
        NewItem: items
    });

});


app.post("/", function (req, res) {
    let item = req.body.newItem;
    console.log(req.body);

    if (req.body.list1 == "Work") {
        workItems.push(item);

        res.redirect("/work");
    } else {
        items.push(item);

        res.redirect("/");
    }



});


app.get("/work", function (req, res) {
    res.render("list", {
        day: "Work",
        NewItem: workItems,
    });

});

app.get("/about", function (req, res) {
    res.render("about");

});



app.listen(8080, function () {
    console.log('8080 is the magic port');
});
