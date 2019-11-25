// Variables required: Timer, textBlock for changing text content, startButton id, score, initials, randQueArray, correctAnswer
// a script to change the innerHTML of textBlock for the quizzes
// functions for showing the quizzes - make them numbered so it's a simple loop
// innerHTML or appendChild? innerHTML, because that replaces. appendChild will add to the content.

var pageContent = document.getElementById("#textBlock");
var timeLeftDisplay = document.getElementById("#timeLeft");
var startBtn = document.getElementById("#startButton");
var highScoresBtn = document.getElementById("#highScoresButton");
var correctAnswer = "String"; 
var randQueArray = ["","","",""];

function startPage(){
    // changes the innerHTML of textBlock to start page content. 
}

function printQuestion(){
    // This has a for loop which takes a local array, and fills it with answers from questions.js

    for (i=0; i<randQueArray.length; i++){
        x=Math.floor(Math.random()*4)+1;
        if (
            // the xth item in the choices array of the ith item of the questions object does not equal randQueArray[i-1] && etc randQueArray[i-2] && etc randQueArray [i-3] 
        randQueArray[i]=// the xth item in the choices array of the ith item of the questions object  
        ) 
        else {
            i--;
        }
    }

    }

    // It then publishes the questions and four answers (in buttons) in textBlock
    // it sets the correctAnswer variable to the correctAnswer
}

function scoreQuestion(){
    // This is called by an event listener for the answer. It checks whether the answer is correct.
    // Bonus: appropriate sound for right or wrong. 
    // if-else increase score or lower timer
    // calls printQuestion()
}

function quizOver(){
    // When the timer runs out, or all questions are answered, this function is called.
    // It changes innerHTML of textBlock to blurb with score, prompts for initials
    // stores initials and scores in local storage
    // calls start page
}