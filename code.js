var carouselIndex = 0;
var carouselTimer = null;
var motivacion = null;
var ejerciciosJson = null;
var ejercicios = {};

function init() {
  //change title
  var d = new Date();
  document.getElementById("mainTitle").innerText = getWeekDay() + ", " + d.getDate() + " de " + getMonth();

  //change motivation text
  $.getJSON("https://raw.githubusercontent.com/beacabdan/workout/master/motivacion.json", function (data) { motivacion = data; }).then(() => addMotivation());
  $.getJSON("https://spreadsheets.google.com/feeds/cells/10wsaGvSqAj5Kb0smB6sLl9kXPP_D_9S9yUEMqAumP24/1/public/full?alt=json", function (data) { ejerciciosJson = data; }).then(() => getExercises());

  var wod = document.getElementById("wod");
  wod.onclick = onButtonWod;
  var light = document.getElementById("light");
  light.onclick = onButtonTonification;

  carousel();
}

function onButtonWod() {
  hideStart();
  var tipoEntreno = 0;

  var workout = whichWorkout();
  writeWorkout(workout);
}

function onButtonTonification() {
  hideStart();
  document.getElementById("workoutDia").innerText = "Un poco de tonificación";
  document.getElementById("workoutDiaSmall").innerText = "Tonificación";
  var tipoEntreno = 1;

  var thisWorkout = [];
  //calentamiento
  var someExercises = ejercicios.calentamiento.ejercicios;
  someExercises = shuffle(someExercises);
  thisWorkout.push(someExercises[0]);

  //ejercicio
  someExercises = ejercicios.tonificación.ejercicios;
  someExercises = shuffle(someExercises);
  thisWorkout.push(someExercises[0]);
  thisWorkout.push(someExercises[1]);
  thisWorkout.push(someExercises[2]);
  thisWorkout.push(someExercises[4]);

  //enfriamiento
  someExercises = ejercicios.estiramientos.ejercicios;
  someExercises = shuffle(someExercises);
  thisWorkout.push(someExercises[0]);

  writeWorkout(thisWorkout);
}

function hideStart() {
  myStopFunction(carouselTimer);
  document.getElementById("main").style.display = "none";
  document.getElementById("slideshow").style.display = "none";
  document.getElementById("trainingBtns").classList.add("w3-hide-small")
  document.getElementById("greyFooter").classList.add("w3-hide-small");
  

  var main = document.getElementById("wod-section");
  main.style.display = "block";
  main.innerHTML = "";
  document.getElementById("goBack").style.display = "block";
  document.getElementById("playWorkout").style.display = "block";
}

function undoHideStart() {
  carousel();
  document.getElementById("main").style.display = "block";
  document.getElementById("slideshow").style.display = "block";
  document.getElementById("trainingBtns").classList.remove("w3-hide-small");
  document.getElementById("greyFooter").classList.remove("w3-hide-small");

  var main = document.getElementById("wod-section");
  main.style.display = "none";
  main.innerHTML = "";
  document.getElementById("goBack").style.display = "none";
  document.getElementById("playWorkout").style.display = "none";

  document.getElementById("modal").style.display = "none";

  document.getElementById("workoutDia").innerText = "El entrenamiento de hoy:";
  document.getElementById("workoutDiaSmall").innerText = "Entrenamiento";
}

function addMotivation() {
  document.getElementById("motivacion").innerHTML = motivacion.beneficios[Math.floor(Math.random() * motivacion.beneficios.length)] + "</br>Además, el deporte tiene tres cualidades que nos apasionan a todas:"
}

function whichWorkout() {
  var cathegory = ["Cardio", "HIIT", "Pilates", "Yoga", "Weight Training"]
  var day = getDayOfYear();
  var workout = day % 5;
  document.getElementById("workoutDia").innerText = "WOD: " + cathegory[workout];
  document.getElementById("workoutDiaSmall").innerText = "WOD";

  if (workout > -1)
  {
    return cardioWorkout();
  }
}

function writeWorkout(workout) {
  var counter = 0;
  var container = document.getElementById("wod-section");
  for (const ejercicio of workout) {
    counter++;
    var ejercDiv = document.createElement("button");
    ejercDiv.classList.add("w3-btn");
    ejercDiv.classList.add("w3-card");
    ejercDiv.classList.add("w3-panel");
    ejercDiv.setAttribute("id", "ej" + counter);
    ejercDiv.value = ejercicio;
    ejercDiv.style = "width: 100%; white-space: normal;";
    ejercDiv.onclick = openModal;
    container.appendChild(ejercDiv);
    var fila = document.createElement("div");
    fila.classList.add("w3-row")
    ejercDiv.appendChild(fila);
    var ejercDiv2 = document.createElement("div");
    ejercDiv2.classList.add("w3-col");
    ejercDiv2.style = "width: 70%";
    ejercDiv2.classList.add("w3-container");
    ejercDiv2.classList.add("w3-justify");
    fila.appendChild(ejercDiv2);
    var title = document.createElement("h3");
    title.classList.add("w3-text-grey");
    title.innerText = ejercicio[1];
    ejercDiv2.appendChild(title);
    var text = document.createElement("p");
    text.innerHTML = ejercicio[3];
    text.classList.add("w3-hide-small");
    ejercDiv2.appendChild(text);
    var ejercDiv3 = document.createElement("div");
    ejercDiv3.classList.add("w3-rest");
    ejercDiv3.classList.add("w3-rest");
    ejercDiv3.classList.add("w3-container");
    fila.appendChild(ejercDiv3);
    var explic = document.createElement("img");
    explic.setAttribute("alt", ejercicio[1] + " (demo)");
    explic.setAttribute("src", ejercicio[4]);
    explic.classList.add("w3-padding-large");
    explic.classList.add("w3-padding-16");
    explic.style = "width: 100%; min-width: 100px; right: 0;";
    explic.innerText = ejercicio[1];
    ejercDiv3.appendChild(explic);
  }
}

function openModal() {
  var modal = document.getElementById("modal");
  modal.style.display = "block";
  modal = document.getElementById("modalContent");
  modal.innerHTML = "<p>" + this.value + "</p>";
}

function cardioWorkout() {
  var thisWorkout = [];
  //calentamiento
  var someExercises = ejercicios.calentamiento.ejercicios;
  someExercises = shuffle(someExercises);
  thisWorkout.push(someExercises[0]);

  //ejercicio
  someExercises = ejercicios.cardio.ejercicios;
  someExercises = shuffle(someExercises);
  thisWorkout.push(someExercises[0]);
  thisWorkout.push(someExercises[1]);

  //enfriamiento
  someExercises = ejercicios.calentamiento.ejercicios;
  someExercises = shuffle(someExercises);
  thisWorkout.push(someExercises[0]);
  someExercises = ejercicios.estiramientos.ejercicios;
  someExercises = shuffle(someExercises);
  thisWorkout.push(someExercises[0]);

  return thisWorkout;
}

function getWeekDay() {
  var weekday = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

  var d = new Date();
  return weekday[d.getDay()];
}

function getMonth() {
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

function getDayOfYear() {
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
  if (carouselIndex > x.length) { carouselIndex = 1 }
  x[carouselIndex - 1].style.display = "block";
  carouselTimer = setTimeout(carousel, 6000);
}

function myStopFunction(myVar) {
  clearTimeout(myVar);
}

function getExercises() {
  var counter = 0;
  var columnas = 5;
  var ejerciciosArray = [];

  var ejercicio = [];
  for (const celda of ejerciciosJson.feed.entry) {
    ejercicio.push(celda.content.$t)
    counter++;
    if (counter % columnas == 0) {
      ejerciciosArray.push(ejercicio);
      ejercicio = [];
    }
  }

  for (const ejercicio of ejerciciosArray) {
    var tipo = {};
    tipo.nombre = ejercicio[0];
  
    if (ejercicios.hasOwnProperty(ejercicio[0].toLowerCase())) {
      ejercicios[ejercicio[0].toLowerCase()].ejercicios.push(ejercicio);
    }
    else {      
      tipo.ejercicios = [];
      tipo.ejercicios.push(ejercicio)
      ejercicios[ejercicio[0].toLowerCase()] = tipo;
    }
  }
}

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}