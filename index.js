//Game Screen Elements
let gameScreen = document.getElementById("game");
let rock = document.getElementsByClassName("rock")[0];
let paper = document.getElementsByClassName("paper")[0];
let scissors = document.getElementsByClassName("scissors")[0];

//Rule Screen to set display
let rulesScreen = document.getElementById("rules-screen");

//Results Screen Elements
let resultScreen = document.getElementById("result");
//Left and Right Circles
let leftChoice = document.getElementById("left-choice");
let rightChoice = document.getElementById("right-choice");
//"You Picked" & "The House Picked"
let userPick = document.getElementById("userpick");
let compPick = document.getElementById("comppick");
// Elements in the middle
let playAgain = document.getElementById("play-again");
let resultText = document.getElementById("resultText");


//Three clones made for the right circle
// Since how the right choice is displayed is by moving child elements from the game screen
//There needs to be elements that exist in the case that the user chooses what the computer will eventually choose
let rockDiv = rock.cloneNode(true);
let paperDiv = paper.cloneNode(true);
let scissorsDiv = scissors.cloneNode(true);

//Score Number
let score = document.getElementById("score");
let scoreNum = 0;
//A user variable to pass onto the clean function
let user = "";
//An array of choices for the randomization of the computer's answer
const choices= ["rock","paper","scissors"]

//A function that moves all children to the parent
function moveAll(source, destination) {
  while (source.firstChild) {
    destination.appendChild(source.firstChild);
  }
}
//Simply the functions that open and close the rules
function openRules(){
  rulesScreen.style.display = "flex";
}
function closeRules(){
  rulesScreen.style.display = "none";
}
//

//Main game function on click
function choose(choice) { 
  //Switches the screens on click
  gameScreen.style.display = "none";
  resultScreen.style.display = "flex";
  //Sets user to be used by clean()
  user = choice;

  switch(choice){
    case "rock":
      //Left choice's div is deafulted to rock's color so no background change
      moveAll(rock,leftChoice)
      break;
    case "paper":
      moveAll(paper,leftChoice);
      leftChoice.style.background = "radial-gradient(hsl(230, 89%, 62%) , hsl(230, 89%, 65%))";
      break;
    case "scissors":
      
      moveAll(scissors,leftChoice);
      leftChoice.style.background = "radial-gradient(hsl(39, 89%, 49%),hsl(40, 84%, 53%))"
      break;
  }

  winCheck(choice);

}
//Function that simply takes the choice of the computer
//And based on that choice, will move children elements from the clones into the right circle
function animate(compChoice){
  switch(choices[compChoice]){
    case "rock":
      setTimeout(function(){
        moveAll(rockDiv,rightChoice)
        rightChoice.style.background = "radial-gradient(hsl(349, 71%, 52%), hsl(349, 70%, 56%))"
      },1500)
      break;
    case "paper":
      setTimeout(function(){
        moveAll(paperDiv,rightChoice);
        rightChoice.style.background = "radial-gradient(hsl(230, 89%, 62%) , hsl(230, 89%, 65%))";
      },1500)
      break;
    case "scissors":
      setTimeout(function(){
        moveAll(scissorsDiv,rightChoice);
        rightChoice.style.background = "radial-gradient(hsl(39, 89%, 49%),hsl(40, 84%, 53%))"
      },1500)
      break;
  }
}

//Checks the win
function winCheck(choice){
  let compChoice = Math.floor(Math.random() * 3);
  animate(compChoice);
  //After the animation on the right circle, 
  setTimeout(function(){
    //Move the circles to the right and display the middle button
    playAgain.style.display = "flex";
    resultText.style.display = "flex";
    leftChoice.style.left = "-70px";
    rightChoice.style.right = "-70px";
    userPick.style.left = "-38px";
    compPick.style.right = "-70px";

    //Changes the Text, Score, and whichever circle will be brightened based on game result
    if(choices[compChoice] === choice){
      resultText.innerText = "IT'S A TIE";

      leftChoice.style.boxShadow = "0px 0px 80px rgba(128,128,128,1)";
      rightChoice.style.boxShadow = "0px 0px 80px rgba(128,128,128,1)";
    }
  
    else if(
      choice === 'scissors' && choices[compChoice] === 'paper' ||
      choice === 'paper' && choices[compChoice] === 'rock' ||
      choice === 'rock' && choices[compChoice] === 'scissors'
    ){
      resultText.innerText = "YOU WIN";
      //An additional line for style as resultText is positioned badly with "YOU WIN" 
      resultText.style.left = "215px";
  
      leftChoice.style.boxShadow = "0px 0px 80px rgba(128,128,128,1)";
      scoreNum++;
      score.innerText = scoreNum;
    }
  
    else {
      resultText.innerText = "YOU LOSE";
  
      rightChoice.style.boxShadow = "0px 0px 80px rgba(128,128,128,1)";
      scoreNum--;
      score.innerText = scoreNum;
    }
  },2000)
  
}

//Sets the website back to its original state
function clean(){
  //Move the circles back and remove the middle button
  playAgain.style.display = "none";
  resultText.style.display = "none";
  leftChoice.style.left = "0px";
  rightChoice.style.right = "0px";
  userPick.style.left = "32px";
  compPick.style.right = "0px";

  //Reset the shadows of both circles  
  leftChoice.style.boxShadow = "none";
  rightChoice.style.boxShadow = "none";

  //In case "You Win" was the last result
  resultText.style.left = "208px";

  //switches screens
  resultScreen.style.display="none";
  gameScreen.style.display="flex";

  //Moves all the children elements back to the parents on the game screen
  //Technically should happen before the two lines above, HOWEVER it happens instantaneously so yeah.
  switch(user){
    case "rock":
      moveAll(leftChoice, rock)
      break;
    case "paper":
      moveAll(leftChoice, paper);
      leftChoice.style.background = "radial-gradient(hsl(349, 71%, 52%), hsl(349, 70%, 56%))";
      break;
    case "scissors":
      
      moveAll(leftChoice, scissors);
      leftChoice.style.background = "radial-gradient(hsl(349, 71%, 52%), hsl(349, 70%, 56%))"
      break;
  }
  //Sets right circle back to default
  rightChoice.style.background = "gray";

  //Removes all the children of right circle and
  while (rightChoice.firstChild) {
    rightChoice.removeChild(rightChoice.firstChild);
  }
  //Recopies the clone
  rockDiv = rock.cloneNode(true);
  paperDiv = paper.cloneNode(true);
  scissorsDiv = scissors.cloneNode(true);
}
