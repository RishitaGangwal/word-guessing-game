const options = {
     aroma: "Pleasing smell",
     pepper: "Salt's partner",
     halt:"put a stop to",
     jump: "Rise suddenly",
     shuffle: "Mix cards up"
        };

const message = document.getElementById("message"); 
const hintRef = document.querySelector(".hint-ref");
const controls = document.querySelector(".controls-container");
const startBtn = document.getElementById("start"); 
const letterContainer = document.getElementById("letter-container");
const userInpSection = document.getElementById("user-input-section"); 
const resultText = document.getElementById("result"); 
const word = document.getElementById("word"); 
const words = Object.keys(options);
let randomWord = "",
    randomHint = "";
let winCount = 0;
    lossCount = 0;

const generateRandomValue = (array) => Math.floor(Math.
    random() * array.length);
  
const blocker = () => {
    let lettersButtons = document.querySelectorAll(".letters");    
    stopGame();
};

startBtn.addEventListener("click", ()=>{
    controls.classList.add("hide");
    init(); 
});

const stopGame = () => {
    controls.classList.remove("hide");
};

const generateWord = () => {
  letterContainer.classList.remove("hide");
  userInpSection.innerText = "";
  randomWord = words[generateRandomValue(words)];
  randomHint = options[randomWord];
  hintRef.innerHTML = `<div id="wordHint">
  <span>Hint: </span>${randomHint}</div>`;
  let displayItem = "";
  randomWord.split("").forEach((value) => {
    displayItem += '<span class="inputSpace">_ </span>';
  });

  userInpSection.innerHTML = displayItem;
  userInpSection.innerHTML += `<div 
  id='chanceCount'>Chances Left: ${lossCount}</div>`;
};

const init = () => {
    winCount = 0;
    lossCount = 5;
    randomWord = "";
    word.innerText = "";
    randomHint = "";
    message.innerHTML = "";
    userInpSection.innerHTML = "";
    letterContainer.classList.add("hide");
    letterContainer.innerHTML = "";
    generateWord();

    for(let i = 65; i<91; i++){
        let button = document.createElement("button");
        button.classList.add("letters");
        
        button.innerText = String.fromCharCode(i);
        
        button.addEventListener("click", () => {
        
        message.innerText = `Correct Letter`;
        message.style.color = "#008000";
            let charArray = randomWord.toUpperCase().split("");
            let inputSpace = document.getElementsByClassName("inputSpace");
            if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          //If character in array is same as clicked button
          if (char === button.innerText) {
            button.classList.add("correct");
            //Replace dash with letter
            inputSpace[index].innerText = char;
            //increment counter
            winCount += 1;
            //If winCount equals word length
            if (winCount == charArray.length) {
              resultText.innerHTML = "You Won";
              startBtn.innerText = "Restart";
              //block all buttons
              blocker();
            }
          }
        });
     } 
     else {
        //lose count
        button.classList.add("incorrect");
        lossCount -= 1;
        document.getElementById(
          "chanceCount"
        ).innerText = `Chances Left: ${lossCount}`;
        message.innerText = `Incorrect Letter`;
        message.style.color = "#ff0000";
        if (lossCount == 0) {
          word.innerHTML = `The word was: <span>${randomWord}</span>`;
          resultText.innerHTML = "Game Over";
          blocker();
        }
    }
      //Disable clicked buttons
       button.disabled = true;
    });

        letterContainer.appendChild(button);
    }
};

window.onload = () => {
     init();
};