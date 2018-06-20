var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var request = require('request');
var fs = require('graceful-fs');
var moment = require('moment');
//var Forecast = require('forecast');

//If you wish to utilize weather logging, set up a Dark Sky API by visiting https://darksky.net/dev
//initializing weather
//var forecast = new Forecast({
//    service: 'darksky',
//    key: 'PUT_YOUR_API_KEY_HERE',
//    units: 'fahrenheit',
//    cache: true,
//    ttl: {
//        minutes: 27,
//        seconds: 45
//    }
//});

var requestSettings = {
    method: 'GET',
    url: 'https://data.texas.gov/download/rmk2-acnw/application%2Foctet-stream',
    encoding: null
};

function requestStop(stop_id){
    request(requestSettings, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var feed = GtfsRealtimeBindings.FeedMessage.decode(body);
            var posix = [];
            var routes = ["1", "2", "3", "4", "5", "6", "7", "10", "17", "18", "19", "20", "21", "22", "30", "37", "100", "103", "110", "111", "122", "127", "135", "142", "171", "201", "214", "228", "233", "237", "238", "240", "243", "271", "275", "311", "320", "323", "333", "338", "350", "383", "392", "410", "411", "412", "464", "465", "466", "470", "481", "483", "484", "485", "486", "490", "491", "492", "640", "641", "642", "653", "656", "661", "663", "670", "671", "672", "680", "681", "682", "801", "803", "980", "981"];
            var route = "";
            console.log("Stop " + stop_id);
            feed.entity.forEach(function (entity) {
                    route = entity.trip_update.trip.route_id;
                    if ((routes.includes(route)) == true) {
                        var updates = (entity.trip_update.stop_time_update);
                        updates.forEach(function (value) {
                            if (value.stop_id == stop_id) {
                                try {
                                    let timestamp = (value.arrival.time);
                                }
                                catch (err) {
                                    console.log('Error!');
                                    console.error(err);
                                    requestStop(stop_id);
                                }
                                let timestamp = (value.arrival.time);
                                delay = (value.arrival.delay);

                                let date = new Date((timestamp) * 1000);
                                posix.push(date);
                                posix.forEach(function (date) {
                                    var hours, minutes, seconds, curr;
                                    hours = date.getHours();
                                    minutes = "0" + date.getMinutes();
                                    seconds = "0" + date.getSeconds();
				    pushToArray(hours, minutes, seconds, delay, route, global.curr, stop_id);
                                });
                                posix = [];
                            }
                        });
                    }
            });
            };
    })
    };

            function pushToArray(hours_part, minutes_part, seconds_part, delay, route, curr, stop_id) {
                var CurrentDate = moment().format('MM/DD/YYYY');
		var formattedTime = ("Date: " + CurrentDate +  ', Weather: ' + global.curr + ', Route: ' + route + ", Scheduled Arrival: " + hours_part + ':' + minutes_part.substr(-2) + ':' + seconds_part + ', Delay (in seconds): ' + delay + '\r\n');
		fs.appendFile('log' + stop_id.toString() + '.txt', formattedTime, function (err) {
                    if (err)
                        return console.log(err);
                });
            }

            var CurrentDate = moment().format('MM/DD/YYYY');
            console.log(CurrentDate);

//If utilizing Dark Sky API, uncomment below and add coordinates for weather location
//forecast.get([LATITUDE, LONGITUDE], function (err, weather) {
//    if (err) {
//        return console.dir(err);
//    }
//    global.curr;
//    global.curr = weather['currently']['summary'];
//})

    requestStop(4120); //22nd and Pearl
    requestStop(5353); //Guadalupe and 27th
    requestStop(5863); //UT Dean Keeton Station (SB)
  //requestStop(xxxx);  add as many Stops as you would like. Stop IDs can be found on www.capmetro.org/stopid
