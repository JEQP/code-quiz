// Variables required: Timer, textBlock for changing text content, startButton id, score, initials, randQueArray, correctAnswer
// a script to change the innerHTML of textBlock for the quizzes
// functions for showing the quizzes - make them numbered so it's a simple loop
// innerHTML or appendChild? innerHTML, because that replaces. appendChild will add to the content.

var pageContent = document.getElementById("textBlock");
var timeLeftDisplay = document.getElementById("timeLeft");
var startBtn = document.getElementById("startButton");
var highScoresBtn = document.getElementById("highScoresButton");
var correctAnswer = "String";
var randQueArray = ["", "", "", ""];
var questionNumber = 0;
var currentScore = 0;
var answerClicked = "";
var timeGiven = 75; // time to complete the quiz
var timeLeftCD = timeGiven; // the time that is left once quiz has started. 



function startPage() {
    // changes the innerHTML of textBlock to start page content. 
}

function printQuestion() {
    // while (questionNumber < questions.length) {
    // This has a for loop which takes a global array, and fills it with answers from questions.js
    startCountDown();
    pageContent.innerHTML = "";
    for (var i = 0; i < randQueArray.length; i++) {
        x = Math.floor(Math.random() * 4);
        if (questions[questionNumber].choices[x] !== randQueArray[i - 1] && questions[questionNumber].choices[x] !== randQueArray[i - 2] && questions[questionNumber].choices[x] !== randQueArray[i - 3]) {
            // the xth item in the choices array of the ith item (object) of the questions array does not equal randQueArray[i-1] && etc randQueArray[i-2] && etc randQueArray [i-3] 
            randQueArray[i] = questions[questionNumber].choices[x]
            console.log("i is " + i + " and x is " + x);
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
            console.log("you clicked " + answerClicked);

            // it checks answer

            if (answerClicked == correctAnswer) {
                currentScore++;
                questionNumber++;
                console.log("score is now " + currentScore);
            }
            else {
                questionNumber++;
                timeLeftCD = timeLeftCD - 15;
                console.log("wrong answer");
            }
            // checks there are still questions to ask, and if so restarts the question asking process
            if (questionNumber < questions.length) {
                printQuestion();
            }
            else {
                timeLeftCD=0;
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
            timeLeftDisplay.textContent = "0";
            quizOver();
            return;
        }

    }, 1000);
   
    clearInterval(startCountDown);
}

function scoreQuestion() {
    // This is called by an event listener for the answer. It checks whether the answer is correct.
    // Bonus: appropriate sound for right or wrong. 
    // if-else increase score or lower timer
    // calls printQuestion()
    // function handleClick() {
    //     // Use event delegation to handle when the user clicks "edit"
    //     if (event.target.matches("button")) {
    //       event.preventDefault();
    //       modalEl.style.display = "block"; // changes the modal element, which is void, to block
    //       currentId = parseInt(event.target.parentElement.id); // this changes the currentID to the parent element of the button, which is where the name is read in html
    //       var name = people[currentId].name; // this changes the name variable to that found in the item of the people array at the currentid
    //       var description = people[currentId].description; // the same but for description. 
    //       modalNameEl.textContent = name; // this prints the name into the html at the modal-name id.
    //       if (description) {
    //         descriptionEl.value = description; // if there is a description, this prints it at the description id
    //       }
    //       else {
    //         descriptionEl.value = "";
    //       }
    //     }
    //   }
}

function quizOver() {

    pageContent.innerHTML = "You answered " + currentScore + " correct."
    var initials = createElement("form");//this is not defined.
    pageContent.appendChild(initials);
    var enterIntials = createElement("div");
    enterIntials.setattribute("type", "text");
    enterIntials.setattribute("id", "pIni");
    enterIntials.setattribute("placeholder", "Your Initials");
    initials.appendChild(enterIntials);
    var submitInitials = createElement("button");
    submitInitials.setattribute("id","submit");
    initials.appendChild(submitInitials);

    


//     <form id="form">
//     <div>
//       <input type="text" id="total" placeholder="total price of meal" />
//     </div>
//     <input type="text" id="tip-percentage" placeholder="tip percentage" />
//     <button id="submit">Calculate Tip</button>
//   </form>
    // When the timer runs out, or all questions are answered, this function is called.
    // It changes innerHTML of textBlock to blurb with score, prompts for initials
    // stores initials and scores in local storage
    // calls start page
}


startBtn.addEventListener("click", printQuestion);


