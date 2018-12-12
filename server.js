var express = require('express');
var request = require('request');
var bodyparser = require('body-parser');
var app = express();
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
    let data = {
        trainPos: null,
        error: null
    }
    res.render('index', { data: data });
})

app.post('/', function (req, res) {
    var trainNum = req.body.trainNum;
    var date = req.body.date;
    date = date.split('-').reverse().join('-');
    var url = `https://api.railwayapi.com/v2/live/train/${trainNum}/date/${date}/apikey/dummyAPIKEY/`; //Src: https://railwayapi.com
    request(url, function (err, response, body) {
        if (err) {
            let data = {
                trainPos: null,
                error: "Error Occured, please try again!"
            }
            res.render('index', { data: data });
        } else {
            let data = JSON.parse(body);

            var obj = {};
            obj.position = data.position;
            obj.currentStation = data.current_station.name;
            obj.trainName = data.train.name;
            console.log(obj);
            let temp = {
                trainPos: obj,
                error: null
            }
            res.render('index', { data: temp });
        }
    })
})


app.listen(3000, function () {
    console.log('App running on 3000');
})
