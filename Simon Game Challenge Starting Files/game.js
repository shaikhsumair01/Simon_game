const buttonColors = ["green", "red", "yellow", "blue"] // the colors of the button
let gamePattern = [] // Stores the target button of each rounds
let userClickedPattern = [] // Stores the user's patterns


let started = true ;
let level = 0;
$("body").on("keypress", function(){
    if (started === true){
        $("#level-title").html(`level ${level}`)
        nextSequence()
        started = false;
    }
})

$(".btn").click(function(e){
    const userChoice = e.target.id;
    userClickedPattern.push(userChoice)
    playSound(userChoice)
    animatePress(userChoice)
    checkAnswer(userClickedPattern.length-1)
    })

function playSound(color){
const sound = new Audio("sounds/" + color + ".mp3");
sound.play();
}
function animatePress(currentColor){
    $("#"+ currentColor).addClass("pressed");
setTimeout(()=> $("#"+ currentColor).removeClass("pressed"), 100);
} 

function nextSequence(){
    userClickedPattern = [];
    level++;
     $("#level-title").text(`level ${level}`);

    let newNumber = Math.floor(Math.random()*4) // getting a random number from 0-3
    const randomColor = buttonColors[newNumber] // getting a random color from buttonColor
    gamePattern.push(randomColor) // pushing the color name in gamePattern
    $("#" + randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor)
  
}
function checkAnswer(currentlevel){
if (gamePattern[currentlevel] === userClickedPattern[currentlevel]){
   
    console.log("success")
    if(userClickedPattern.length===gamePattern.length){
        setTimeout(()=> nextSequence(), 1000)

    }
}
else{
   
    console.log("wrong")
    const sound = new Audio("sounds/wrong.mp3");
    sound.play();
    $("body").addClass("game-over");
    setTimeout(()=> $("body").removeClass("game-over"), 200)
     $("#level-title").text("Game Over, Press Any Key to Restart");
     startOver();
}
}
function startOver(){
    level = 0;
    gamePattern = [];
    started= true;
}