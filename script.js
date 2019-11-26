// Variables required: Timer, textBlock for changing text content, startButton id, score, initials, randQueArray, correctAnswer
// a script to change the innerHTML of textBlock for the quizzes
// functions for showing the quizzes - make them numbered so it's a simple loop
// innerHTML or appendChild? innerHTML, because that replaces. appendChild will add to the content.

var pageContent = document.getElementById("#textBlock");
var timeLeftDisplay = document.getElementById("#timeLeft");
var startBtn = document.getElementById("#startButton");
var highScoresBtn = document.getElementById("#highScoresButton");
var correctAnswer = "String";
var randQueArray = ["", "", "", ""];
var questionNumber = 0;

function startPage() {
    // changes the innerHTML of textBlock to start page content. 
}

function printQuestion() {
    // This has a for loop which takes a local array, and fills it with answers from questions.js
        pageContent.innerHTML="";
    for (var i = 0; i < randQueArray.length; i++) {
        x = Math.floor(Math.random() * 4) + 1;
        if (questions[questionNumber].choices[x] !== randQueArray[i - 1] && questions[questionNumber].choices[x] !== randQueArray[i - 2] && questions[questionNumber].choices[x] !== randQueArray[i - 3]){
        // the xth item in the choices array of the ith item (object) of the questions array does not equal randQueArray[i-1] && etc randQueArray[i-2] && etc randQueArray [i-3] 
        randQueArray[i] = questions[questionNumber].choices[x]  
        } 
        else {
            i--;
        }
    }
    // It then publishes the questions and four answers (in buttons) in textBlock
    var question=document.createElement("h1");
    question.setAttribute("text", questions[questionNumber].title);
    pageContent.appendChild(question);
    var answerList=document.createElement("ul");
    pageContent.appendChild(answerList);
    for (var i=0; i<randQueArray.length;i++){
        var list=document.createElement("li");
        list.id = i;
        list.innerHTML = "<button>"+randQueArray[i]+"</button>"
        answerList.appendChild(list);
    }

    correctAnswer=questions[questionNumber].answer;
    // it sets the correctAnswer variable to the correctAnswer

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
    // When the timer runs out, or all questions are answered, this function is called.
    // It changes innerHTML of textBlock to blurb with score, prompts for initials
    // stores initials and scores in local storage
    // calls start page
}


startBtn.addEventListener("click", printQuestion);


