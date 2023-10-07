class App{
    constructor(){
        this.getLocation();
        this.lat;
        this.lng;
        this.getQuote();
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
                this.advertiment(data.current_weather.temperature);
            })
            .catch(err => {
                console.log(err);
            })


    }

    getQuote(){
        let url = "https://cors-anywhere.herokuapp.com/https://zenquotes.io?api=random";
        fetch(url, {
            "method": "GET",
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            document.querySelector('#quote').innerHTML = `"${data[0].q}"`;
        })
        .catch(err => {
            console.error(err);
        });
    }

    advertiment(temperature){
        if(temperature < 10){
            document.querySelector('#advertisment').style.backgroundImage  = "url('img/advertismentWinter.jpg')";
        }else {
            document.querySelector('#advertisment').style.backgroundImage  = "url('img/advertismentSummer.jpg')";
        }
    }

}

let app = new App();
