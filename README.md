# CapMetro Realtime Data Logger
A Node.js script that retrieves real-time CapMetro bus position data and outputs upcoming arrival times (including delay) for a specified bus stop. This script is useful for analyzing when and why arrivals at a bus stop might be delayed and can be used for long-term data logging and mining. Realtime data for this project is acquired from [data.texas.gov](https://data.texas.gov/Transportation/CMTA-Trip-Updates-PB-File/rmk2-acnw) and is in the [General Transit Feed Specification](https://developers.google.com/transit/gtfs-realtime/) format.

## Dependencies:
- GTFS Realtime Bindings (installed via `npm install gtfs-realtime-bindings`)
- request (installed via `npm install request`)
- graceful-fs (installed via `npm install graceful-fs`)
- moment (installed via `npm install moment`)
#### Optional:
- forecast (installed via `npm install forecast`)
- util (installed via `npm install util`)
- exec (installed via `npm install exec`)

## Configuration:

#### Weather: 

If you wish to include the status of the weather in your output, you will need to set up a weather API on [DarkSky.net](https://darksky.net/dev) The API key you are given should be inserted in line 11. You will also need to [obtain the coordinates](https://www.maps.ie/coordinates.html) for your location, which are inserted on line 87.

#### Output:

This script uses graceful-fs to output a text log file for each bus stop specified. Each bus stop will have its own output file 'logXXXX.txt' that displays in this fashion:

- `"Date: 06/20/2018, Route: 3, Scheduled Arrival: 13:02:00, Delay (in seconds): 180"`

These text logs will be created (and subsequently appended) in the same folder as script. 

#### Looper:

If you wish to run this script for long-term data logging, it is advised to use "CapMetro_Looper.js". When placed in the same folder, this looper script will run the data logger every X milliseconds (default is 1800000ms / 30min). In the event of any errors, the looper will simply output the error message to console and continue to run. 
