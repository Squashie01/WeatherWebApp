function GetWeather()
{
    const ApiKey = 'da1a34f9acba69ebf1b56a3a7ce636ce';

    var city = document.getElementById("cityName").value;

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${ApiKey}`)
    .then(
        response => response.json()
    ).then(
        data => {
            document.getElementById("country").innerHTML = data.name+", " + data.sys.country;
            document.getElementById("temp").innerHTML = Math.round(data.main.temp)+"°C";
            document.getElementById("type").innerHTML = data.weather[0].main + ", <br> Feels like " + Math.round(data.main.feels_like) + "°C";
            document.getElementById("sunrise").innerHTML = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
            document.getElementById("sunset").innerHTML = new Date(data.sys.sunset * 1000).toLocaleTimeString();
            document.getElementById("humidity").innerHTML = data.main.humidity;
            document.getElementById("speed").innerHTML = data.wind.speed;
            document.getElementById("pressure").innerHTML = data.main.pressure;
        }
    );
}

function AutoWeather(data)
{
    // This section gets the user's live location
    var api_key = '6c86d620ebc3439ea4ff3c5ed824475d';
    var latitude = data.coords.latitude;
    var longitude = data.coords.longitude;

    var api_url = 'https://api.opencagedata.com/geocode/v1/json'

    var request_url = api_url
        + '?'
        + 'key=' + api_key
        + '&q=' + encodeURIComponent(latitude + ',' + longitude)
        + '&pretty=1'
        + '&no_annotations=1';

    // see full list of required and optional parameters:
    // https://opencagedata.com/api#forward

    var request = new XMLHttpRequest();
    request.open('GET', request_url, true);

    request.onload = function() {
        // see full list of possible response codes:
        // https://opencagedata.com/api#codes

        if (request.status === 200){ 
        // Success!
        var data = JSON.parse(request.responseText);
        var CountryName = data.results[0].components.country; // gets the location

        } else if (request.status <= 500){ 
        // We reached our target server, but it returned an error
                            
        console.log("unable to geocode! Response code: " + request.status);
        var data = JSON.parse(request.responseText);
        console.log('error msg: ' + data.status.message);
        } else {
        console.log("server error");
        }

        // Getting auto weather
        const ApiKey = 'da1a34f9acba69ebf1b56a3a7ce636ce';
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${CountryName}&units=metric&appid=${ApiKey}`)
        .then(
            response => response.json()
        ).then(
            data => {
                document.getElementById("country").innerHTML = data.name+", " + data.sys.country;
                document.getElementById("temp").innerHTML = Math.round(data.main.temp)+"°C";
                document.getElementById("type").innerHTML = data.weather[0].main + ", <br> Feels like " + Math.round(data.main.feels_like) + "°C";
                document.getElementById("sunrise").innerHTML = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
                document.getElementById("sunset").innerHTML = new Date(data.sys.sunset * 1000).toLocaleTimeString();
                document.getElementById("humidity").innerHTML = data.main.humidity;
                document.getElementById("speed").innerHTML = data.wind.speed;
                document.getElementById("pressure").innerHTML = data.main.pressure;
            }
        );
    };

    request.onerror = function() {
        // There was a connection error of some sort
        console.log("unable to connect to server");        
    };

    request.send();  // make the request
}

navigator.geolocation.getCurrentPosition(AutoWeather, console.error);
