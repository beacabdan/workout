var carouselIndex = 0;

function init()
{
    var d = new Date();
    var x = document.getElementById("mainTitle");
    x.innerText = getWeekDay() + ", " + d.getDate() + " de " + getMonth();

    carousel();
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
    var weekday = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];

    var d = new Date();
    return weekday[d.getDay()];
}

function getMonth()
{
    var month = new Array(12);
    month[0] = "Enero";
    month[1] = "Febrero";
    month[2] = "Marzo";
    month[3] = "Abril";
    month[4] = "Mayo";
    month[5] = "Junio";
    month[6] = "Julio";
    month[7] = "Agosto";
    month[8] = "Septiembre";
    month[9] = "Octubre";
    month[10] = "Noviembre";
    month[11] = "Diciembre";
  
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

  function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";  
    }
    carouselIndex++;
    if (carouselIndex > x.length) {carouselIndex = 1}    
    x[carouselIndex-1].style.display = "block";  
    setTimeout(carousel, 4000);    
  }