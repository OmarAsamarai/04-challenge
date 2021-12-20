
 // The questions about (the office)
 var questions = [
  {
      question: "What is Pam's favorite yogurt flavor?",
      choices: ["a. plain", "b. fat free", "c. strawberry", "d. mixed berry"],
      answer: "d. mixed berry"
  },
  {
      question: " Which of Angela's cat's does Dwight freeze?",
      choices: ["a. Simon", "b. Sprinkles", "c. Princess", "b. Bandit "],
      answer: "b. Sprinkles"
  },
  {
      question: "Who can raise and lower their cholesterol at will?",
      choices: ["a. Creed", "b. Dwight", "c. Gabe", "d. Jim"],
      answer: "b. Dwight"
  },
  {
      question: " What was the name of Jim and Pam's son?",
      choices: ["a. Phillip", "b. Peter", "c. Carson", "d. David"],
      answer: "a. Phillip"
  },
  {
      question: "What cause does Michael use for Fun Run?",
      choices: ["a. Cancer", "b. Freedom", "c. Rabies", "d. Love"],
      answer: "c. Rabies"
  }
];

// Definition of Variables
var startNew = document.getElementById("start");
var startBtn = document.getElementById("startquiz");

var questionSec = document.getElementById("q-space");
var questionTitle = document.getElementById("questionTitle");
var choiceA = document.getElementById("btn0");
var choiceB = document.getElementById("btn1");
var choiceC = document.getElementById("btn2");
var choiceD = document.getElementById("btn3");
var answerCheck = document.getElementById("answerCheck");

var timer = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");
var timesUp = document.getElementById("timesup");

var scoreSection = document.getElementById("scorespace");
var finalScore = document.getElementById("finalScore");

var summary = document.getElementById("summary");
var initialBtn = document.getElementById("initialBtn");
var initialInput = document.getElementById("initialInput");

var backBtn = document.getElementById("backBtn");
var dltHistoryBtn = document.getElementById("dltHistoryBtn"); 
var scoresHisBtn = document.getElementById("highScore");
var listOfScores = document.getElementById("scoreslist");

var correctAns = 0;
var questionNum = 0;
var scoreResult;
var questionIndex = 0;
var penalty = 15;


// WHEN I click the start button, timer starts
startBtn.addEventListener("click", function() {
  questionIndex = 0;
  totalTime = 76;

  startNew.style.display = "none";
  questionSec.style.display = "block";
  timer.style.display = "block";
  timesUp.style.display = "none";

  var startTimer = setInterval(function() {
      totalTime--;
      timeLeft.textContent = totalTime;
      if(totalTime <= 0) {
          clearInterval(startTimer);
          if (questionIndex < questions.length - 1) {
              gameOver();
          }
      }
  },1000);

  renderQuiz();
});

// Showing questions and choices
function renderQuiz() {
  nextQuestion();
}
function nextQuestion() {
  questionTitle.textContent = questions[questionIndex].question;
  choiceA.textContent = questions[questionIndex].choices[0];
  choiceB.textContent = questions[questionIndex].choices[1];
  choiceC.textContent = questions[questionIndex].choices[2];
  choiceD.textContent = questions[questionIndex].choices[3];
}

// Showing the answer, correct or wrong
function checkAnswer(answer) {
  answerCheck.style.display = "blok";

  if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
      answerCheck.textContent = "Correct!";
  } else {
      // If the answer if wrong, 15 second penalty will be deducted from the timeTotal time will be deducted by amout of penalty ()
      totalTime -=penalty;
      timeLeft.textContent = totalTime;
      answerCheck.textContent = "Wrong! The correct answer is: " + questions[questionIndex].answer;
  }
  questionIndex++;

  // If there are more questions, show them
  if (questionIndex < questions.length) {
      nextQuestion();
  } else {
      // If no more questions, game over
      gameOver();
  }
}

function chooseA() { checkAnswer(0); }
function chooseB() { checkAnswer(1); }
function chooseC() { checkAnswer(2); }
function chooseD() { checkAnswer(3); }

// If the timer went dowon to zero, game over
function gameOver() {
  summary.style.display = "block";
  questionSec.style.display = "none";
  startNew.style.display = "none";
  timer.style.display = "none";
  timesUp.style.display = "block";

  // Show final score
  if (totalTime < 0) {
    finalScore.textContent = 0;
  } else {
      finalScore.textContent = totalTime;
  }  
}

// Ask for initial
function storeScores(event) {
  event.preventDefault();

  if (initialInput.value === "") {
      return;
  } 

  startNew.style.display = "none";
  timer.style.display = "none";
  timesUp.style.display = "none";
  summary.style.display = "none";
  scoreSection.style.display = "block";   

  // store scores into local storage
  var savedScores = localStorage.getItem("high scores");
  var scoresArray;

  if (savedScores === null) {
      scoresArray = [];
  } else {
      scoresArray = JSON.parse(savedScores)
  }

  var userScore = {
      initials: initialInput.value,
      score: finalScore.textContent
  };

  console.log(userScore);
  scoresArray.push(userScore);

  var scoresArrayString = JSON.stringify(scoresArray);
  window.localStorage.setItem("high scores", scoresArrayString);
  
  // show current highscores
  renderScores();
}

// function to show high scores
var i = 0;
function renderScores() {

  startNew.style.display = "none";
  timer.style.display = "none";
  questionSec.style.display = "none";
  timesUp.style.display = "none";
  summary.style.display = "none";
  scoreSection.style.display = "block";

  // Save scores in local storage  
  var savedScores = localStorage.getItem("high scores");

  // check if there is any in local storage
  if (savedScores === null) {
      return;
  }
  console.log(savedScores);

  var storedScores = JSON.parse(savedScores);

  for (; i < storedScores.length; i++) {
      var eachNewScore = document.createElement("p");
      eachNewScore.innerHTML = storedScores[i].initials + ": " + storedScores[i].score;
      listOfScores.appendChild(eachNewScore);
  }
}

choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

initialBtn.addEventListener("click", function(event){ 
  storeScores(event);
});

scoresHisBtn.addEventListener("click", function(event) { 
  renderScores(event);
});

backBtn.addEventListener("click", function() {
  startNew.style.display = "block";
  scoreSection.style.display = "none";
});

dltHistoryBtn.addEventListener("click", function(){
  window.localStorage.removeItem("high scores");
  listOfScores.innerHTML = "History of scores deleted!";
  listOfScores.setAttribute("style", "font-family: 'Archivo', sans-serif; font-style: italic;")
});
