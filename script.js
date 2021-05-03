let questionEl = document.querySelector("#question");
let choicesEl = document.querySelector("#choices");
let startEl = document.querySelector("#start");
let timerEl = document.querySelector("#countdown");
let secondsLeft = 10;
let remainingQuestions;
let correctResponse = "";
const myQuestion = [
    {
      question: "Who invented JavaScript?",
      answers: {
        a: "Douglas Crockford",
        b: "Brendan Eich",
        c: "Sheryl Sandberg",
        d: "steve Jobs"
      },
      correctAnswer: "b"
    },
    {
        question: "Which of the following is a valid type of function javascript suppports",
        answers: {
            a: "named function",
            b: "anonymous function",
            c: "both of the above",
            d: "none of the above",
        },
        correctAnswer: "c"
    }
];

// add eventlistener to start button to start quiz
startEl.addEventListener("click", function(){
    remainingQuestions = 5;
    // load the first question and load possible answers
    countDown();
    loadQuestion();
    // start timer
   
})
choicesEl.addEventListener("click", function(event){
    let element = event.target;
    if (element.matches("button") === true) {
    let userAnswer = element.getAttribute("answer-options");
    if(userAnswer === correctResponse) {
        questionEl.textContent = "Correct!"
    }else {
        questionEl.textContent = "Wrong!"
    }
    
    } 
})

function loadQuestion() {
    choicesEl.innerHTML = "";
    questionEl.textContent = myQuestion[0].question;
    correctResponse = myQuestion[0].correctAnswer;

    for(let i = 0; i < 4; i++) {
        let index = ["a", "b", "c", "d"]
        let button = document.createElement("button");
        button.textContent = myQuestion[0].answers[index[i]];
        button.setAttribute("answer-options", index[i]);
        choicesEl.appendChild(button);
    }
    
}

// starts countdown, displays timer, and clears interval
function countDown() {
    let timerInterval = setInterval(function() {
        secondsLeft -- ;
        timerEl.textContent="Time: " + secondsLeft;
    if(secondsLeft === 0) {
        // stops execution of action at set interval
        clearInterval(timerInterval);
        // run our highscore function
    
    }
    },1000);
}





// once answer is selected check if answer is right or wrong
    // if right moves onto next question && tells you if you are correct/wrong
    // if you are wrong it will state you are wrong, deduct time from the timer, and move onto the next question
    // check how many questions have been asked

// Once all questions have been asked stop timer, take highscore from timer, input initials, display a submit box

// use local storage to rank high scores & prevent default refresh. Go to high score page. 
// buttons go back & clear high scores. Add eventlisteners 
    // clear the local storage of high scores