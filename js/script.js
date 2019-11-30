

var pageContent = document.getElementById("textBlock");
var timeLeftDisplay = document.getElementById("timeLeft");
var startBtn = document.getElementById("startButton");
var highScoresBtn = document.getElementById("highScoresButton");
var endPageEl = document.getElementById("endPage");
var scoreNotificationEl = document.getElementById("scoreNotification");
var submitBtnEl = document.getElementById("submitBtn");
var iniForm = document.getElementById("frm1");
var highScoresEl = document.getElementById("highScoresButton");
var highScoresPg = document.getElementById("highScoresPage");
var restartQuiz = document.getElementById("restartQuiz");
var restartQuiz2 = document.getElementById("restartQuiz2");
var listHighScores = document.getElementById("highScoresList");
var correctAnswer = "String";
var currentInitials = "string";
var randQueArray = ["", "", "", ""];
var questionNumber = 0;
var currentScore = 0;
var answerClicked = "";
var timeGiven = 75; // time to complete the quiz
var timeLeftCD = timeGiven; // the time that is left once quiz has started. 



// changes the innerHTML of textBlock to start page content. 
function startPage() {
    questionNumber = 0;
    timeGiven = 75;
    timeLeftCD = timeGiven;
    correctAnswer = "";
    currentInitials = "";
    currentScore = 0;
    answerClicked = "";
    pageContent.innerHTML="";
    var sp1 = document.createElement("p");
    sp1.textContent="This quiz will test your knowledge on coding to an extent to which you have never before been subject! Unless, maybe, you've previously done a quiz on coding.";
    pageContent.appendChild(sp1);
    var sp2 = document.createElement("p");
    sp2.textContent = "The format is simple. A question will appear on the screen, and you will be offered four different options, only one of which is correct. Choose wisely, for while a correct answer will raise your score, an erroenous response will REMOVE 15 SECONDS FROM YOUR AVAILABLE TIME!";
    pageContent.appendChild(sp2);
    var sbutt = document.createElement("button");
    sbutt.setAttribute("id", "startButton2");
    sbutt.textContent = "Dare you?";
    pageContent.appendChild(sbutt);
    pageContent.setAttribute("class", "show");
    endPageEl.setAttribute("class", "hide");
    highScoresPg.setAttribute("class", "hide");
    sbutt.addEventListener("click", printQuestion);
}
// Runs through the questions

function printQuestion() {

    startCountDown();
    pageContent.innerHTML = "";
    for (var i = 0; i < randQueArray.length; i++) {
        x = Math.floor(Math.random() * 4);
        if (questions[questionNumber].choices[x] !== randQueArray[i - 1] && questions[questionNumber].choices[x] !== randQueArray[i - 2] && questions[questionNumber].choices[x] !== randQueArray[i - 3]) {
            // the xth item in the choices array of the ith item (object) of the questions array does not equal randQueArray[i-1] && etc randQueArray[i-2] && etc randQueArray [i-3] 
            randQueArray[i] = questions[questionNumber].choices[x]
            // console.log("i is " + i + " and x is " + x);
        }
        else {
            i--;
        }
    }

    // It then publishes the questions and four answers (in buttons) in textBlock
    var question = document.createElement("h1");
    question.innerHTML = questions[questionNumber].title;
    pageContent.appendChild(question);
    var answerList = document.createElement("ul");
    pageContent.appendChild(answerList);
    for (var i = 0; i < randQueArray.length; i++) {
        var list = document.createElement("li");
        list.id = i;
        list.innerHTML = "<button>" + randQueArray[i] + "</button>"
        answerList.appendChild(list);
    }
    // it sets the correctAnswer variable to the correctAnswer
    correctAnswer = questions[questionNumber].answer;

    // it listens for click

    answerList.addEventListener("click", function (event) {
        event.preventDefault();
        if (event.target.matches("button")) {
            answerClicked = event.target.textContent;
            // console.log("you clicked " + answerClicked);

            // it checks answer

            if (answerClicked == correctAnswer) {
                currentScore++;
                questionNumber++;
                // console.log("score is now " + currentScore);
            }
            else {
                questionNumber++;
                timeLeftCD = timeLeftCD - 15;
                // console.log("wrong answer");
            }
            // checks there are still questions to ask, and if so restarts the question asking process
            if (questionNumber < questions.length) {
                printQuestion();
            }
            else {
                timeLeftCD = 0;
                quizOver();
            }
        }
    });


}

// set the setInterval as a global variable and then call that variable. clearfunction should clear that.
function startCountDown() {
    var countDown = setInterval(function () {
        // display time
        timeLeftDisplay.textContent = "Time Left: " + timeLeftCD;
        timeLeftCD--;
        if (timeLeftCD <= 0) {
            clearInterval(countDown);
            timeLeftDisplay.textContent = "Time Left: 0";
            quizOver();
            return;
        }

    }, 1000);

    clearInterval(startCountDown);
}

// When the timer runs out, or all questions are answered, this function is called.
// It changes innerHTML of textBlock to blurb with score, prompts for initials
// stores initials and scores in local storage
// calls start page

function quizOver() {

    // create element to hold form

    pageContent.setAttribute("class", "hide");
    endPageEl.setAttribute("class", "show");
    highScoresPg.setAttribute("class", "hide");
    scoreNotificationEl.innerHTML = "You answered " + currentScore + " correct.";
    submitBtnEl.addEventListener("click", submitScore);



}

function submitScore() {
    currentInitials = document.getElementById("initialEntered").value;

    // console.log(currentInitials);

    // Check if there is something in storage with player initials
    // check local storage. 
    var highScoresString = localStorage.getItem("highScores");
    console.log("highScoresString is " + highScoresString);
    // console.log(highScoresString);
    // check if string exists, then convert to JSON

    if (JSON.parse(localStorage.getItem("highScores")) == null) {

        var highScoresJSON = [];
        var scores = {
            "name": currentInitials,

            "score": currentScore
        }
        highScoresJSON.push(scores);

        localStorage.setItem('highScores', JSON.stringify(highScoresJSON));

    }
    else {
        var highScoresJSON = JSON.parse(localStorage.getItem("highScores"));

        var scores = {
            "name": currentInitials,

            "score": currentScore
        }
        highScoresJSON.push(scores);
        localStorage.setItem('highScores', JSON.stringify(highScoresJSON));

    }

}



function showHighScores() {
    pageContent.setAttribute("class", "hide");
    endPageEl.setAttribute("class", "hide");
    highScoresPg.setAttribute("class", "show");

    // list highscores here listHighScores

    var highScoresString = localStorage.getItem("highScores");
    var highScoresJSON = JSON.parse(localStorage.getItem("highScores"));
    
    document.querySelector("#highScoresList").textContent = highScoresJSON[0].name + " - " + highScoresJSON[0].scores;
 
    document.getElementById("highScoresList").textContent = highScoresString;


}

startBtn.addEventListener("click", printQuestion);
highScoresEl.addEventListener("click", showHighScores);
restartQuiz.addEventListener("click", startPage)
restartQuiz2.addEventListener("click", startPage)


