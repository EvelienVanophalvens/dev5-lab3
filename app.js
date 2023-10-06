class App{
    constructor(){
        this.getLocation();
        this.lat;
        this.lng;
    }

    getLocation(){
        navigator.geolocation.getCurrentPosition(this.gotLocation.bind(this), this.errorLocation.bind(this));
    }

    gotLocation(result){
        this.lat = result.coords.latitude;
        this.lng = result.coords.longitude;
        this.getWeather();
    }

    errorLocation(err){
        console.log(err);
    }

    getWeather(){
        //https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m
        let url = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&timezone=auto&current_weather=true`;
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                document.querySelector('#weather').innerHTML = data.current_weather.temperature + '°C';
            })
            .catch(err => {
                console.log(err);
            })

    }

  




}

let app = new App();
