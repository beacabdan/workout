function init()
{
    var x = $("#mainTitle");

    var d = new Date();
    // var x = document.createElement("h1");
    var t = document.createTextNode(getWeekDay() + " Workout (" + getMonth() + " " + d.getDate() + ")");
    x.appendChild(t);
    document.body.appendChild(x);

    var btn = document.createElement("btn");
    btn.classList.add("w3-button");
    btn.classList.add("w3-hover-red");
    t = document.createTextNode("WORKOUT OF THE DAY")
    document.body.appendChild(btn);

    btn = document.createElement("btn");
    btn.classList.add("w3-button");
    btn.classList.add("w3-hover-red");
    t = document.createTextNode("LIGHT CONDITIONING")
    document.body.appendChild(btn);

    whichWorkout();
}

function whichWorkout()
{
    var cathegory = ["cardio", "HIIT", "pilates", "yoga", "weight training"]
    var day = getDayOfYear()
    var workout = day % 5;
    var p = document.createElement("p");
    var t = document.createTextNode("Today's focus: " + cathegory[workout]);
    p.appendChild(t);
    document.body.appendChild(p);
    
    if (workout == 0) cardioWorkout();
}

function cardioWorkout()
{
    var exercises = [];
}

function getWeekDay()
{
    var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    var d = new Date();
    return weekday[d.getDay()];
}

function getMonth()
{
    var month = new Array(12);
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
  
    var d = new Date();
    return month[d.getMonth()];
  }

  function getDayOfYear()
  {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    return day;
  }