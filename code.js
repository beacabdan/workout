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
  for (const exercise of someExercises)
      if (exercise[10] == 0) {
        thisWorkout.push(exercise);
        break;
      }

  //ejercicio
  someExercises = ejercicios.tonificación.ejercicios.concat(ejercicios.fuerza.ejercicios).concat(ejercicios.core.ejercicios);
  someExercises = shuffle(someExercises);
  counter = 5
  while (counter > 0) {
    for (const exercise of someExercises) {
        if (exercise[10] == 0) {
          thisWorkout.push(exercise);
          counter--;
        }
        if (counter <= 0) {
          break;
        }
      }
  }

  //enfriamiento
  someExercises = ejercicios.estiramientogeneral.ejercicios;
  someExercises = shuffle(someExercises);
  for (const exercise of someExercises)
      if (exercise[10] == 0) {
        thisWorkout.push(exercise);
        break;
      }

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
  var cathegory = ["Cardio", "Pilates", "HIIT", "Flexibility", "Weight Training", "Cardio", "Pilates", "Weight Training"]
  var day = getDayOfYear();
  var workout = day % cathegory.length;
  document.getElementById("workoutDia").innerText = "WOD: " + cathegory[workout];
  document.getElementById("workoutDiaSmall").innerText = cathegory[workout];

  if (cathegory[workout] == "Cardio") return cardioWorkout();
  else if (cathegory[workout] == "Pilates") return pilatesWorkout();
  else if (cathegory[workout] == "HIIT") return cardioWorkout();
  else if (cathegory[workout] == "Weight Training") return fuerzaWorkout();
  else return fuerzaWorkout();
}

function writeWorkout(workout) {
  var counter = 0;
  var container = document.getElementById("wod-section");
  for (const ejercicio of workout) {
    counter++;
    var card = document.createElement("div");
    var content = document.createElement("div");
    var image_container = document.createElement("div");
    var image = document.createElement("img");
    var title = document.createElement("h3");
    var text = document.createElement("p");
    var objetivo = document.createElement("p");
    var badges = document.createElement("ul");
    
    title.innerHTML = ejercicio[1];
    text.innerHTML = escribeReps(ejercicio[0], ejercicio[5], ejercicio[6], ejercicio[7]);
    objetivo.innerHTML = ejercicio[3];
    image.src = ejercicio[4];
    
    var badge_list = ejercicio[2].replace(", ", ",").replace(" ,", ",").split(",");
    for (const badge of badge_list) {
      var bg_li = document.createElement("li");
      bg_li.innerHTML = "#" + badge.toLowerCase();
      badges.appendChild(bg_li);
    }
    if (ejercicio[10] == 0) {
      var bg_li = document.createElement("li");
      bg_li.innerHTML = "#notstanding";
      badges.appendChild(bg_li);
    }


    badges.classList.add("badges")
    card.classList.add("card");
    content.classList.add("content");
    image_container.classList.add("image");
    objetivo.classList.add("w3-hide-small");

    content.appendChild(title);
    content.appendChild(text);
    content.appendChild(objetivo);
    content.appendChild(badges);
    card.appendChild(content);
    image_container.appendChild(image);
    card.appendChild(image_container);
    container.appendChild(card);    

    card.setAttribute("data-value", ejercicio[2] + "<br>" + ejercicio[3])
    card.onclick = openModal;
  }
}

function writeWorkoutOld(workout) {
  for (const exercise of workout) console.log(exercise[1], exercise[5], exercise[6], exercise[7], exercise[8]);
  console.log("########")

  var counter = 0;
  var container = document.getElementById("wod-section");
  for (const ejercicio of workout) {
    counter++;
    var ejercDiv = document.createElement("button");
    ejercDiv.classList.add("w3-btn");
    ejercDiv.classList.add("w3-card");
    ejercDiv.classList.add("w3-panel");
    ejercDiv.setAttribute("id", "ej" + counter);
    ejercDiv.value = "Objetivo: " + ejercicio[2] + "<br>" + ejercicio[3];
    ejercDiv.style = "width: 100%; white-space: normal;";
    ejercDiv.onclick = openModal;
    container.appendChild(ejercDiv);
    var fila = document.createElement("div");
    fila.classList.add("w3-row")
    ejercDiv.appendChild(fila);
    var ejercDiv2 = document.createElement("div");
    ejercDiv2.classList.add("w3-col");
    ejercDiv2.style = "width: 65%";
    ejercDiv2.classList.add("w3-container");
    ejercDiv2.classList.add("w3-justify");
    fila.appendChild(ejercDiv2);
    var title = document.createElement("h3");
    title.classList.add("w3-text-grey");
    title.style.textAlign="left"
    title.innerText = ejercicio[1];
    ejercDiv2.appendChild(title);
    var text = document.createElement("p");
    text.innerHTML = escribeReps(ejercicio[0], ejercicio[5], ejercicio[6], ejercicio[7]);
    ejercDiv2.appendChild(text);
    text = document.createElement("p");
    text.innerHTML = ejercicio[3];
    text.classList.add("w3-hide-small");
    ejercDiv2.appendChild(text);
    var ejercDiv3 = document.createElement("div");
    ejercDiv3.classList.add("w3-rest");
    ejercDiv3.classList.add("w3-container");
    fila.appendChild(ejercDiv3);
    var explic = document.createElement("img");
    explic.setAttribute("alt", ejercicio[1] + " (demo)");
    explic.setAttribute("src", ejercicio[4]);
    explic.classList.add("w3-padding-large");
    explic.classList.add("w3-padding-16");
    explic.style = "width: 100%; min-width: 150px; left: 0;";
    explic.innerText = ejercicio[1];
    ejercDiv3.appendChild(explic);
  }
}

function escribeReps(type, sets, reps, units) {
  if (sets < -1) return Math.abs(sets) + " intervalos de " + reps + " " + units
  if (sets < 2) return reps + " " + units
  return sets + "x" + reps + " " + units
}

function openModal() {
  var modal = document.getElementById("modal");
  modal.style.display = "block";
  modal = document.getElementById("modalContent");
  modal.innerHTML = "<p>" + this.getAttribute("data-value") + "</p>";
}

function cardioWorkout() {
  var thisWorkout = [];
  var counter = 0;

  //calentamiento
  var someExercises = ejercicios.calentamiento.ejercicios;
  someExercises = shuffle(someExercises);
  for (const exercise of someExercises)
    if (exercise[8] == "-" || exercise[8] == "Ruido" )
    {
      thisWorkout.push(exercise);
      break;
    }

  //ejercicio
  someExercises = ejercicios.cardio.ejercicios;
  someExercises = shuffle(someExercises);
  if (Math.random() > 0.5) {
    for (const exercise of someExercises)
      if (exercise[1] == "Correr" || exercise[1] == "Trail Running / Walking" && exercise[8] != "Esterilla") {
        if (Math.random() > 0.5) {
          exercise[6] = "30"
          exercise[7] = "minutos"
        }
        thisWorkout.push(exercise);
        break;
      }
  }
  else {
    counter = 3
    for (const exercise of someExercises)
      if (counter > 0 && !(exercise[1] == "Correr" || exercise[1] == "Trail Running / Walking") && exercise[8] != "Esterilla") {
        thisWorkout.push(exercise);
        counter--;
      }
  }

  someExercises = ejercicios.estiramientogeneral.ejercicios;
  someExercises = shuffle(someExercises);
  thisWorkout.push(someExercises[0]);

  return thisWorkout;
}

function hiitWorkout() {
  var thisWorkout = [];
  var counter = 0;

  //calentamiento
  var someExercises = ejercicios.calentamiento.ejercicios;
  someExercises = shuffle(someExercises);
  for (const exercise of someExercises)
    if (exercise[8] == "-" || exercise[8] == "Ruido" )
    {
      thisWorkout.push(exercise);
      break;
    }

  //ejercicio
  someExercises = ejercicios.cardio.ejercicios;
  someExercises = shuffle(someExercises);
  for (const exercise of someExercises)
    if (exercise[1] == "Correr" || exercise[1] == "Trail Running / Walking" && exercise[8] != "Esterilla") {
      if (Math.random() > 0.5) {
        exercise[6] = "30"
        exercise[7] = "minutos"
      }
      thisWorkout.push(exercise);
      break;
    }
  counter = 3
  for (const exercise of someExercises)
    if (counter > 0 && !(exercise[1] == "Correr" || exercise[1] == "Trail Running / Walking") && exercise[8] != "Esterilla") {
      thisWorkout.push(exercise);
      counter--;
    }
  

  someExercises = ejercicios.estiramientogeneral.ejercicios;
  someExercises = shuffle(someExercises);
  thisWorkout.push(someExercises[0]);

  return thisWorkout;
}

function pilatesWorkout() {
  var thisWorkout = [];
  var counter = 0;

  //calentamiento
  var someExercises = ejercicios.calentamiento.ejercicios;
  someExercises = shuffle(someExercises);
  counter = 0;
  for (const exercise of someExercises)
    if (exercise[9] == 1)
    {
      thisWorkout.push(exercise);
      counter++;
      if (counter > 1) break;
    }

  someExercises = ejercicios.core.ejercicios;
  someExercises = shuffle(someExercises);
  counter = 0;
  for (const exercise of someExercises)
    if (exercise[9] == 1)
    {
      thisWorkout.push(exercise);
      counter++;
      if (counter > 2) break;
    }

  someExercises = ejercicios.estiramientos.ejercicios;
  someExercises = shuffle(someExercises);
  counter = 0;
  for (const exercise of someExercises)
    if (exercise[9] == 1)
    {
      thisWorkout.push(exercise);
      counter++;
      if (counter > 2) break;
    }

  return thisWorkout;
}

function fuerzaWorkout() {
  var thisWorkout = [];
  var counter;

  //calentamiento
  var someExercises = ejercicios.calentamiento.ejercicios;
  someExercises = shuffle(someExercises);
  counter = 2;
  for (const exercise of someExercises) {
    if (exercise[9] == 0) continue;
    thisWorkout.push(exercise);
    counter--;
    if (counter == 0) break;
  }

  someExercises = ejercicios.fuerza.ejercicios;
  someExercises = shuffle(someExercises);
  counter = 3;
  for (const exercise of someExercises) {
    if (exercise[2] == "Piernas") continue;
    thisWorkout.push(exercise);
    counter--;
    if (counter == 0) break;
  }

  someExercises = ejercicios.cardio.ejercicios;
  someExercises = shuffle(someExercises);
  for (const exercise of someExercises) 
  {
    if (exercise[9] == 0) continue;
    thisWorkout.push(exercise);
    break;
  }
  
  someExercises = ejercicios.fuerza.ejercicios;
  someExercises = shuffle(someExercises);
  counter = 2;
  for (const exercise of someExercises) {
    if (exercise[9] == 0) continue;
    thisWorkout.push(exercise);
    counter--;
    if (counter == 0) break;
  }

  someExercises = ejercicios.estiramientogeneral.ejercicios;
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
  var columnas = 11;
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