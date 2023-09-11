

//Global Variables
var highScore = 1;
var isGameInProgress = false;
var gamePattern = [];
var level = 1;
const buttonColors = ["red", "blue", "green", "yellow"];
var nextPatternIdx = 0;

function restartGame() {
    resetGameParameters();
    isGameInProgress = true;
    showSequence();
}

function bindKeyPressToNewGame() {
    $(document).keypress(function (event) {
        if(!isGameInProgress){
            restartGame();
        }
        
    });
    $(document).on("tap",function (event) {
        if (!isGameInProgress) {
           restartGame();
        }
    });
}

function bindClickToButtons() {
    $(".btn").click(function () {
        if (isGameInProgress) {
            var userChosenColor = $(this).attr("id");
            if (userChosenColor === gamePattern[nextPatternIdx]) {
                animateAndPlaySound(userChosenColor);
                handleSequenceGeneration();
            } else {
                animateAndPlaySoundForWrongAnswer();
                isGameInProgress = false;
                $("#level-title").text("Game Over, Press Any Key to Restart");
            }
        }
    });
    $(".btn").on("tap",function () {
        this.click();
    });
}

function handleSequenceGeneration() {
    nextPatternIdx++;
    if (nextPatternIdx === gamePattern.length) {
        setTimeout(function () {
            extendSequence();
            showSequence();
            nextPatternIdx = 0;
            level++;
            $("#level-title").text("Level " + level);
        }, 700);
    }
}

function resetGameParameters() {
    if (level > highScore) {
        highScore = level;
        $("#high-score").text("High Score: " + highScore);
    }
    gamePattern = [];
    level = 1;
    nextPatternIdx = 0;
    $("#level-title").text("Level " + level);
    $("body").removeClass("game-over");
    extendSequence();
}

function extendSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
}

function animateButton(buttonColor) {
    $("#" + buttonColor).fadeOut(100).fadeIn(100);
}

function playSound(buttonColor) {
    var audio = new Audio("sounds/" + buttonColor + ".mp3");
    audio.play();
}

function animateAndPlaySound(buttonColor) {
    animateButton(buttonColor);
    playSound(buttonColor);
}

function animateAndPlaySoundForWrongAnswer() {
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
}

function showSequence() {
    for (let i = 0; i < gamePattern.length; i++) {
        setTimeout(function () {
                if (isGameInProgress) {
                animateAndPlaySound(gamePattern[i]);
            }
        }, i * 500);
    }
}


//Main Function
function main() {
    bindKeyPressToNewGame();
    bindClickToButtons();

}

main();
