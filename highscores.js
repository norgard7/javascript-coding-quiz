let clearEl = document.querySelector("#clear");
let rankedScoresEL = document.querySelector("#rankedScores");
let allHighScores = [];

function init() {
    let storedScores = JSON.parse(localStorage.getItem("allHighScores"));
    if(storedScores !== null) {
        allHighScores = storedScores;
    }
    renderHighScores();
}

function renderHighScores(){
    // clearing the list of rankings
    rankedScoresEL.innerHTML = "";
    // creates and displays an ordered list of highscores
    for(let i = 0; i < allHighScores.length; i++){
        let score = allHighScores[i].score;
        let name = allHighScores[i].initials;

        let li = document.createElement("li");
        li.textContent = name + " - " + score;
        rankedScoresEL.appendChild(li);


    }
}

// listens for clear button and clears all highscores listed on highscore page.
clearEl.addEventListener("click", function(){
    allHighScores= [];
    rankedScoresEL.innerHTML = "";
    localStorage.setItem("allHighScores", JSON.stringify(allHighScores));
});  
   
init();
