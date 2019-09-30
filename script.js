let city = "";

let apiKey = "90c33975c2007dd9981fa7016cb6641e";


function getWeather(userPickedCity){
    let queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + userPickedCity +",us&APPID=" + apiKey
                         // api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=90c33975c2007dd9981fa7016cb6641e

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        console.log(response);
        
       
        let main = response.list;
        let date = main[0].dt_txt.split(" ", 1);
        let weather = main[0].weather;
        let iconCode = weather[0].icon;
        let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
        $("#wicon").attr("src", iconUrl);
        $("#city-date").text(response.city.name + " " + date);
        $("#main-temp").text("Temperature: " + main[0].main.temp);
        $("#main-humid").text("Humidity: " + main[0].main.humidity + "%");
        $("#wind-sppd").text( "Wind Speed: " + main[0].wind.speed + "MPH");
        // $("#sunset-time").text("Sunset Time: " + response.city.sunset);

    })
}
$(".list-group-item-info").on("click", function(){
    city = $(this).text();
    getWeather(city);
})
$("#b").on("click", function(event){
    event.preventdefault();
    city = $(this).val();
    getWeather(city);
})

