$(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 10
                }, 400);
                return false;
            }
        }
    });
});

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}


$(document).ready(function(){
    displayTime();
    setInterval(displayTime, 1000);

    var zip, country, locIP, latIP, lonIP = '';

    /* https://ipinfo.io/json?token=62f16ef67528e4 */

    $.get("https://ipinfo.io/json", function (response) {
        $("#ip").html("IP: " + response.ip);
        locIP = (response.loc).split(",");
        latIP = locIP[0];
        lonIP = locIP[1];
        if(response.city != ''){
            $("#address").html(response.city + ", " + response.region);
            $("#details").html(JSON.stringify(response, null, 4));
        }
        console.log('city ' + response.city);

    }, "jsonp");

    setTimeout(function(){
        var tempString = "https://api.openweathermap.org/data/2.5/weather?lat=" + latIP + "&lon=" + lonIP + "&appid=62586c3c7465e498380af78d50211e67&units=metric&lang=it";
//console.log(locIP + ' | ' + latIP + ' | ' +lonIP + ' | ');
$.get(tempString, function (response) {
$('.temperatura').text((Math.round(response.main.temp * 10) / 10).toFixed(1));
}, "jsonp");
}, 1000)  

})

/* time */
function displayTime() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();

    if(hours < 10) {
        hours = "0" + hours;
    }
    if(minutes < 10) {
        minutes = "0" + minutes;
    }        
    if(seconds < 10) {
        seconds = "0" + seconds;
    }

    var clockDiv = document.getElementById('live-clock');

    clockDiv.innerText = hours + ":" + minutes + ":" + seconds;
}       