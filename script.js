let lista=[];
let docu;
let askedCount=0;//conteo de las preguntas
let quizz;
let objeto; //guarda la posicion del objeto 
let puntuacion;
let diccionario={};
const _result = document.getElementById('result');
const _options = document.querySelector('.quiz-options');
const _mostrarPuntuacion= document.querySelector('#correct-score');
const _checkBtn = document.getElementById('check-answer');
const _playAgainBtn = document.getElementById('play-again');
const timerDisplay = document.querySelector('.segundos');
const preguntas=[
    {
      "id": "1",
      "category": "javascript",
      "level": "normal",
      "question": "¿Qué método de array devuelve un nuevo objeto iterable iterador?",
      "answers": {
        "answer_a": "sort()",
        "answer_b": "values()",
        "answer_c": "entries()",
        "answer_d": "concat()"
      },
      "correct_answer": "answer_b",
      "feedback": "El método values() devuelve un nuevo objeto Array Iterator que contiene los valores para cada índice del array."
    },
    {
      "id": "2",
      "category": "javascript",
      "level": "normal",
      "question": "¿Qué controlador de eventos se utiliza para procesar el evento de clic?",
      "answers": {
        "answer_a": "onmouseclick",
        "answer_b": "onclick",
        "answer_c": "onkeydown"
      },
      "correct_answer": "answer_b",
      "feedback": "El evento onclick en JavaScript te permite ejecutar una función cuando se hace clic en un elemento."
    },
    {
      "id": "3",
      "category": "javascript",
      "level": "normal",
      "question": "¿Cuál es el valor de una variable declarada sin valor?",
      "answers": {
        "answer_a": "null",
        "answer_b": "undefined",
        "answer_c": "NaN"
      },
      "correct_answer": "answer_b",
      "feedback": "Una variable declarada sin asignarle un valor inicial tiene el valor 'undefined'."
    },
    {
      "id": "4",
      "category": "javascript",
      "level": "normal",
      "question": "Los scripts se pueden colocar en la sección <body>, o en la <head> de una página HTML, o en ambas.",
      "answers": {
        "answer_a": "Verdadero",
        "answer_b": "Falso"
      },
      "correct_answer": "answer_a",
      "feedback": "Aunque lo recomendable es ponerlo al final del body para que JavaScript sea lo último que cargue, haciendo más eficiente la web."
    },
    {
      "id": "5",
      "category": "javascript",
      "level": "normal",
      "question": "¿Cuál es el método para agregar elementos al comienzo de un array?",
      "answers": {
        "answer_a": "push()",
        "answer_b": "unshift()",
        "answer_c": "pop()"
      },
      "correct_answer": "answer_b",
      "feedback": "El método unshift() agrega uno o más elementos al inicio del array, y devuelve la nueva longitud del array."
    },
    {
      "id": "6",
      "category": "javascript",
      "level": "normal",
      "question": "console.log(3 > 2 > 1 === false) ... ¿Cuál es la salida de la consola?",
      "answers": {
        "answer_a": "true",
        "answer_b": "false"
      },
      "correct_answer": "answer_a",
      "feedback": "Arroja true porque 3 > 2 es igual a true, entonces true > 1 es igual a false porque true no es mayor que 1. Por consiguiente false es igual a false, esta condición es true."
    },
    {
      "id": "7",
      "category": "javascript",
      "level": "normal",
      "question": "Cuál es el resultado de ejecutar: console.log(typeof 42);",
      "answers": {
        "answer_a": "float",
        "answer_b": "object",
        "answer_c": "number",
        "answer_d": "integer"
      },
      "correct_answer": "answer_c"
    },
    {
      "id": "8",
      "category": "javascript",
      "level": "normal",
      "question": "console.log(10 + \"5\") ... ¿Cuál es la salida de la consola?",
      "answers": {
        "answer_a": "105",
        "answer_b": "'15'",
        "answer_c": "SyntaxError"
      },
      "correct_answer": "answer_a",
      "feedback": "Al ser de tipo String uno de los operandos se produce una concatenación."
    },
    {
      "id": "9",
      "category": "javascript",
      "level": "normal",
      "question": "¿Cuál de las siguientes opciones no es un tipo de bucle?",
      "answers": {
        "answer_a": "do/while",
        "answer_b": "for/in",
        "answer_c": "if/then"
      },
      "correct_answer": "answer_c",
      "feedback": "La expresión if/then solo se lee una vez, sin embargo do/while se ejecutará mientras la condición del while se cumpla. Por su parte for/in se ejecuta por tantas propiedades tenga el objeto o por tantos elementos tenga el array, dependiendo de lo que le pasemos."
    },
    {
      "id": "10",
      "category": "javascript",
      "level": "normal",
      "question": "¿Cuál es la sintaxis correcta para 'no es igual'?",
      "answers": {
        "answer_a": "!==",
        "answer_b": "==!"
      },
      "correct_answer": "answer_a",
      "feedback": "Una exclamación seguida por dos iguales es la forma correcta de expresar 'no es igual'."
    }
  ]

/* Generar numero aleatorio */
function random(){

    let pregunta=Math.floor(Math.random()*10);
    if (lista.includes(pregunta)){
        random();
    }else{
        lista.push(pregunta);
        /* console.log(lista) */
        /* console.log("Lo que esta retornando es: "+pregunta) */
        return pregunta;
    }
}

/* Agregar opciones al DOM */
function recorrerObjeto(index){
    /* console.log("El index antes de buscar: "+index); */
    let contenido= preguntas[index].answers;
    quizz.innerHTML="";
    docu.innerHTML = "";
    quizz.textContent=preguntas[index].question;
    for (var opcion in contenido) {
        if (contenido.hasOwnProperty(opcion)) {
            var li = document.createElement("li");
            li.textContent = contenido[opcion];
            diccionario[opcion]=contenido[opcion];
            docu.appendChild(li);
        }
    }
    selectOption();
}

function imprimirPregunta(){
    let ran= random();
    objeto=ran;
    docu=document.querySelector('.quiz-options');
    quizz= document.querySelector('.quiz-question')
    /* console.log("Impresion antes de mandar a reccorer: "+ ran) */
    if(ran != undefined ){
        recorrerObjeto(ran);
    }
    else{
        lista.pop();
        imprimirPregunta();
    }
    
} 

// options selection
function selectOption(){
    _options.querySelectorAll('li').forEach(function(option){
        option.addEventListener('click', function(){
            if(_options.querySelector('.selected')){
                const activeOption = _options.querySelector('.selected');
                activeOption.classList.remove('selected');
            }
            option.classList.add('selected');
        });
    });
    startTimer();
}

_checkBtn.addEventListener('click',verificarRespuesta);

function verificarRespuesta(){
    /* _checkBtn.disabled = true; */
    if(_options.querySelector('.selected')){
        
        let selectedAnswer = _options.querySelector('.selected').textContent;
        let verificacion= preguntas[objeto].correct_answer;
        if(selectedAnswer == diccionario[verificacion]){
            puntuacion++;
            _mostrarPuntuacion.innerHTML=puntuacion;
            _result.innerHTML = `<p><i class = "fas fa-check"></i>Respuesta Correcta!</p>`;
        } else {
            _result.innerHTML = `<p><i class = "fas fa-times"></i>Respuesta incorrecta!</p> <small><b>Respuesta Correcta: </b>${diccionario[verificacion]}</small>`;
        }
        checkCount();
    } else {
        _result.innerHTML = `<p><i class = "fas fa-question"></i>Seleccione una opción!</p>`;
        _checkBtn.disabled = false;
        diccionario={};
    }
}

function checkCount(){
    askedCount++;
    /* console.log("cuantas pregutnas lleva: " + askedCount); */
    if(askedCount >= 10){
        stopTimer()
        /* _checkBtn.disabled = true; */
        setTimeout(function(){
            console.log("");
        }, 2000);
        _result.innerHTML += `<p>El total es: ${puntuacion}.</p>`;
        _playAgainBtn.style.display = "block";
        _checkBtn.style.display = "none";
    } else {
        setTimeout(function(){
            imprimirPregunta();
        }, 1000);
    }
}

_playAgainBtn.addEventListener('click',iniciarJuego);

function iniciarJuego(){
    lista=[];
    puntuacion=0;
    askedCount=0;
    startTimer();
    _result.innerHTML = ""
    _mostrarPuntuacion.innerHTML=puntuacion;
    _playAgainBtn.style.display = "none";
    _checkBtn.style.display = "block";
    imprimirPregunta();
    
}



function startTimer() {
    if (window.currentTimer) {
        clearInterval(window.currentTimer);
    }

    let timeLeft = 15; 
    timerDisplay.textContent = `Tiempo: ${timeLeft} s`;
    timerDisplay.style.color = 'black'; 

    window.currentTimer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Tiempo: ${timeLeft} s`;

        if (timeLeft <= 0) {
            askedCount++;
            if (askedCount>=10){
                checkCount(); 
            }else{
                imprimirPregunta();
            }
            
        } else if (timeLeft <= 6) {
            timerDisplay.style.color = timerDisplay.style.color ='red' ;
        }
    }, 1000);
}

function stopTimer() {
    // Verificar si hay un temporizador en curso y detenerlo
    if (window.currentTimer) {
        clearInterval(window.currentTimer);
    }
}
