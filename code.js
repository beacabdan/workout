var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";


function init()
{
    var d = new Date();
    var n = d.getDay()
    var x = document.createElement("h1");
    var t = document.createTextNode(weekday[d.getDay()] + " Workout");
    x.appendChild(t);
    document.body.appendChild(x);
}