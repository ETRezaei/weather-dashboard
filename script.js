let city = "";
let apiKey = "90c33975c2007dd9981fa7016cb6641e";

let cities = ["New York", "Chicago", "Denver"];
$.each(cities,function(i,v){
    let newLi = $("<li>");
    let newBtn = $("<a>");
    newBtn.text(v);
    newLi.append(newBtn);
    newLi.attr("class","list-group-item list-group-item-info");
    $("#city").append(newLi);

})


function getWeather(userPickedCity){
    let queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + userPickedCity +",us&APPID=" + apiKey
                         // api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=90c33975c2007dd9981fa7016cb6641e

    let todayUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + userPickedCity +",us&APPID=" + apiKey
    $.ajax({
        url: todayUrl,
        method: "GET"
    }).then(function(response){
        console.log(response);
        let weather = response.weather;
        let iconCode = weather[0].icon;
        let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
        let date = moment().format('MMMM Do YYYY');
        
        $("#wicon").attr("src", iconUrl);
        $("#city-date").text(response.name + " " + date);
        $("#main-temp").text("Temperature: " + response.main.temp);
        $("#main-humid").text("Humidity: " + response.main.humidity + " %");
        $("#wind-sppd").text( "Wind Speed: " + response.wind.speed + " MPH");
    })

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
       
        // $("#sunset-time").text("Sunset Time: " + response.city.sunset);
        let counter = 1;
        for(let i = 7; i <= 39; i+=8){
            let info = response.list[i];
            $("#date" + counter).text(info.dt_txt.split(" ", 1));
            $("#wicon" + counter).attr("src", iconUrl);
            $("#temp" + counter).text("Temperature:" + info.main.temp);          
            $("#humid" + counter).text("Humidity: " + info.main.humidity + " %");
            counter ++;

        }



    })
}
$(".list-group-item-info").on("click", function(){
    city = $(this).text();
    getWeather(city);
})
$("#b").on("click", function(event){
    event.preventDefault();
    city = $("#input").val();
    getWeather(city);
    let newbutton = $("<a>");
    let newLi = $("<li>");
    newbutton.append(city);
    newLi.append(newbutton);
    newLi.attr("class","list-group-item list-group-item-info");
    $("#city").append(newLi);

})

