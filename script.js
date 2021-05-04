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
    // load the first question and load possible answers
    countDown();
    chooseQuestion();
    // start timer
   
})
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
     // check how many questions have been asked
    if(usedQs.length < 2){
       chooseQuestion(); 
    }else{
        // run highscore function
        gameOver = true;
    }
     
    } 
})
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
        choicesEl.appendChild(button);
    }
    
}

// starts countdown, displays timer, and clears interval
function countDown() {
    let timerInterval = setInterval(function() {
        secondsLeft -- ;
        timerEl.textContent="Time: " + secondsLeft;
        startBoxEl.style.borderTop = null;
        startBoxEl.textContent="";
    if(secondsLeft === 0 || gameOver) {
        // stops execution of action at set interval
        clearInterval(timerInterval);
        // run our highscore function
    
    }
    },1000);
}





 
  
    
   

// Once all questions have been asked stop timer, take highscore from timer, input initials, display a submit box

// use local storage to rank high scores & prevent default refresh. Go to high score page. 
// buttons go back & clear high scores. Add eventlisteners 
    // clear the local storage of high scores