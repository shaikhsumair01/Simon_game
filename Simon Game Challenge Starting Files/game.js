const buttonColors = ["green", "red", "yellow", "blue"] // the colors of the button
const gamePattern = [] // Stores the target button of each rounds
const userClickedPattern = [] // Stores the user's patterns


let started = true ;
let level = 0;
$("body").on("keypress", function(){
    if (started === true){
        nextSequence()
    }
    started = false;
    $("#level-title").html(`level ${level}`)
})

function handler(e){
    const userChoice = e.target.id;
    userClickedPattern.push(userChoice)
    playSound(userChoice)
    animatePress(userChoice)
    }

function playSound(color){
const sound = new Audio("sounds/" + color + ".mp3");
sound.play();
}
function animatePress(currentColor){
    $("#"+ currentColor).addClass("pressed");
setTimeout(()=> $("#"+ currentColor).removeClass("pressed"), 100);
} 

function nextSequence(){
    let newNumber = Math.floor(Math.random()*4) // getting a random number from 1-4
    const randomColor = buttonColors[newNumber] // getting a random color from buttonColor
    gamePattern.push(randomColor) // pushing the color name in gamePattern
    level= level+1
    $("#" + randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor)
    $(".btn").click(handler)
}