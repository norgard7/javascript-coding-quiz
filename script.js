let questionEl = document.querySelector("#question");
let choicesEl = document.querySelector("#choices");
let startEl = document.querySelector("#start");
let startBoxEl = document.querySelector("#start-box");
let timerEl = document.querySelector("#countdown");
let secondsLeft = 76;
let gameOver = false;
let correctResponse = "";
let usedQs = [];
const myQuestion = [
    {
      question: "Who invented JavaScript?",
      answers: {
        a: "1. Douglas Crockford",
        b: "2. Brendan Eich",
        c: "3. Sheryl Sandberg",
        d: "4. steve Jobs"
      },
      correctAnswer: "b"
    },
    {
        question: "Which of the following is a valid type of function javascript suppports",
        answers: {
            a: "1. named function",
            b: "2. anonymous function",
            c: "3. both of the above",
            d: "4. none of the above"
        },
        correctAnswer: "c"
    },
    {
        question: "which of the following is not JavaScript Data Types",
        answers: {
            a: "1. undefined",
            b: "2. Number",
            c: "3. Boolean",
            d: "4. Float"
        },
        correctAnswer: "d"
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: {
            a: "1. <script>",
            b: "2. <head>",
            c: "3. <meta>",
            d: "4. <style>"
        },
        correctAnswer: "a"
    },
    {
        question: "Which of the following is not Javascript frameworks or libraries?",
        answers: {
            a: "1. Polymer",
            b: "2. Meteor",
            c: "3. Cassandra",
            d: "4. JQuery"
        },
        correctAnswer: "c"
    }
];

function init() {
    let storedScores = JSON.parse(localStorage.getItem("allHighScores"));
    if(storedScores !== null) {
        allHighScores = storedScores;
    }
}
// add eventlistener to start button to start quiz
startEl.addEventListener("click", function(){
    startBoxEl.textContent = "";

    // load the first question and load possible answers
    countDown();
    chooseQuestion();
    // start timer 
});

choicesEl.addEventListener("click", function(event){
    let element = event.target;
    // once answer is selected check if answer is right or wrong
    if (element.matches("button") === true) {
    startBoxEl.style.borderTop= "1px solid #000000";
    let userAnswer = element.getAttribute("answer-options");
    if(userAnswer === correctResponse) {
          // if right moves onto next question && tells you if you are correct/wrong
        startBoxEl.textContent = "Correct!"

    }else {
        // if you are wrong it will state you are wrong, deduct time from the timer, and move onto the next question
        startBoxEl.textContent = "Wrong!"
        secondsLeft -= 15;
    }
    setTimeout(function(){
        startBoxEl.textContent = "";
        startBoxEl.style.borderTop = "none";
    },1500)
     // check how many questions have been asked
    if(usedQs.length < 5){
       chooseQuestion(); 
    }else{
        // run highscore function
        // Once all questions have been asked stop timer/game over,
        gameOver = true;
    }
     
}
});
function chooseQuestion() {
    let shuffleQs = Math.floor(Math.random()*myQuestion.length);
    if(usedQs.includes(shuffleQs)){
        chooseQuestion();
    }else{
        usedQs.push(shuffleQs);
        loadQuestion(shuffleQs);
    }
}
function loadQuestion(q) {
    choicesEl.innerHTML = "";
    startEl.innerHTML = "";
    questionEl.textContent = myQuestion[q].question;
    correctResponse = myQuestion[q].correctAnswer;

    for(let i = 0; i < 4; i++) {
        let index = ["a", "b", "c", "d"]
        let button = document.createElement("button");
        button.textContent = myQuestion[q].answers[index[i]];
        button.setAttribute("answer-options", index[i]);
        button.classList.add("buttons");
        choicesEl.appendChild(button);
    }
    
}

// starts countdown, displays timer, and clears interval
function countDown() {
    let timerInterval = setInterval(function() {
        secondsLeft -- ;
        timerEl.textContent="Time: " + secondsLeft;
    if(secondsLeft <=0 ) {
        secondsLeft =0;
        timerEl.textContent="Time: " + secondsLeft;
        // stops execution of action at set interval
        clearInterval(timerInterval);
        highScore();
        // run our highscore function
    }else if(gameOver) {
        clearInterval(timerInterval);
        highScore();
    }
    },1000);
}
// creating the Elements for entering the highscore
let highScoreLabelEL = document.createElement("label");
let highScoreEl = document.createElement("input");
let highScoreBtnEL = document.createElement("a");
let highScoreContainer = document.createElement("div");
let allHighScores = [];

// create text content for the new elements created above
highScoreLabelEL.textContent = "Enter Initials";
highScoreBtnEL.textContent = "Submit";
highScoreBtnEL.href = "highscores.html";
highScoreBtnEL.classList.add("buttons");
highScoreBtnEL.classList.add("submit");
// append high score elements to a div
highScoreContainer.appendChild(highScoreLabelEL);
highScoreContainer.appendChild(highScoreEl);
highScoreContainer.appendChild(highScoreBtnEL);

// when all questiosn ahve been aswered it says how much time is left as the final score
function highScore() {
    questionEl.textContent = "All Done!";
    choicesEl.textContent = "Your final score is " + secondsLeft;
    choicesEl.appendChild(highScoreContainer);
}


// listens for user to submit highscore and pushes score to highscore array
highScoreContainer.addEventListener('click', function(event) {
    event.stopPropagation();
    let element = event.target;
    if (element.matches("a") === true){ 
    let submitHighScore = {
        initials: highScoreEl.value,
        score: secondsLeft
    };
    allHighScores.push(submitHighScore);
    storeHighScore();
    }

}); 

// sorts high scores from highest to lowest
function compare(a,b) {
    let comparison = 0;
    if( a.score > b.score) {
        comparison = -1;
    }else if(a.score < b.score) {
        comparison = 1;
    }
    return comparison;
}
// collects values in an array and stores them locally
function storeHighScore() {
    allHighScores.sort(compare);
    localStorage.setItem("allHighScores", JSON.stringify(allHighScores));   
} 


init();
//  take highscore from timer, input initials, display a submit box



    // seperate high scores page
            // buttons go back & clear high scores. Add eventlisteners 
    // clear the local storage of high scores
    // prettify with CSS
