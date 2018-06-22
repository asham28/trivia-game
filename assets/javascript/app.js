

//Question 
var triviaQuestions = [{
    question: "Which of the following is not a Hogwarts House",
    answerList: ["Gryffindor", "Hufflepuff","Slytherine","Thunderbird"],
    answer: 3
},{
    question: "Among the wizarding community, the term 'Muggle' refers to what kind of person?",
    answerList:["A non-magical person from a magical family", "A magical person who is really bad at magic", "A magical person with only one magical parent", "A non-magical person from a non-magical family"],
    answer: 3
},{
    question: "Which Hogwarts student stays 'I don't go looking for trouble. Trouble usually finds me'?",
    answerList: ["Draco Malfoy", "Harry Potter", "Ron Weasley", "Fred Weasley"],
    answer: 1
},{
    question: "What is the incantation for the Summoning Charm",
    answerList: ["Aparecium", "Avis", "Accio", "Anapneo"],
    answer: 2
}, {
    question: "Who does Harry live with after his parents die?",
    answerList: ["The Edmunds", "The Durselys", "The Dundies", "The Weasleys"],
    answer: 1
}, {
    question: "What map do the Weasley Twins give Harry?",
    answerList: ["The Marauder's Map", "The Mage's Map", "The Magician's Map", "The Patronous Map"],
    answer: 0
}, {
    question: "What colour is the Hogwarts Express?",
    answerList: ["Green", "Indigo", "Scarlet", "Emerald"],
    answer: 2
}, {
    question: "How are parcels and letters sent in the Wizarding World?",
    answerList: ["Via broomstick", "Via wizard postmen", "Via The Floo Network", "Via owls"],
    answer: 3
}, {
    question: "Who was the professor of the dark arts in Harry's third year?",
    answerList: ["Professor Lupin", "Professor Snape", "Professor Quirrel", "Professor Umbridge"],
    answer: 0
}, {
    question: "What was the title of 6th Harry Potter book?",
    answerList: ["Harry Potter and the Prisoner of Azakaban", "Harry Potter and the Half-Blood Prince", "Harry Potter and the Order of the Phoenix", "Harry Potter and the Deathly Hallows"],
    answer: 1
}]; 

/*Need One More Question*/

var img = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10' ]; 
var currentQuestion; 
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 
var seconds; 
var time; 
var answered; 
var userSelect; 

// MESSAGES
var messages = {
    correct: "That's right!", 
    incorrect: "Nope!", 
    endTime: "Out of time!", 
    finished: "Alright! Time for the final score!"
}


$('#startOverBtn').hide();

$("#startBtn").on('click', function(){
$(this).hide(); 
$("#instructions").hide();
newGame(); 
}); 

function newGame() {
    $('#finalMessage').empty(); 
    $("#correctAnswers").empty(); 
    $("#incorrectAnswers").empty(); 
    $("#unanswered").empty(); 
    $('#startOverBtn').hide();
    currentQuestion = 0; 
    correctAnswer = 0; 
    incorrectAnswer = 0; 
    unanswered = 0; 
    newQuestion(); 
}

// Reset


$("#startOverBtn").on('click', function(){
    $(this).hide(); 
    newGame(); 
    }); 

function newQuestion(){
    $("#message").empty(); 
    $("#correctedAnswer").empty(); 
    $("#img").empty(); 
    $(".thisChoice").hide(); 
    answered = true; 

// ===================================
// New Question and Answers Populated
// ====================================
$("#currentQuestion").html("Question: " + (currentQuestion+1) + ' of ' + triviaQuestions.length); 
$(".question").html('<h2>' + triviaQuestions[currentQuestion].question + "</h2>")

// ==========================
// Logic Conditions 
// ==========================
for (var i =0; i < 4; i++){
    //create choices divs for options to populate
    var choices = $("<div class='m-3'>"); 
    choices.text(triviaQuestions[currentQuestion].answerList[i]);
    choices.attr({'data-index': i });
    choices.addClass('thisChoice');
    $('.answerList').append(choices);
}

countdown(); 
// clicking an answer will pause the timer and setup answer page
$(".thisChoice").on('click', function(){
    userSelect = $(this).data("index"); 
    clearInterval(time); 
    answerPage(); 

}); 

}

// ================
// COUNT DOWN TIMER 
// ================
function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + ' seconds </h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}


function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + ' seconds </h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

// ==============
// ANSWER PAGE
// ==============
function answerPage() {
    //clear page first 
    $("#currentQuestion").empty(); 
    $(".thisChoice").empty(); 
    $(".answerList").empty(); 
    $(".question").empty(); 


    var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer]; 
    var rightAnswerIndex = triviaQuestions[currentQuestion].answer; 

    $("#img").html("<img src= 'assets/images/" + img[currentQuestion] + ".jpg' width='400px'>"); 



    // LOGIC: CORRECT SCENARIO
    // ===========================
    if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
    }

    if (currentQuestion == (triviaQuestions.length-1)){
        setTimeout(scoreboard, 5000)
    } else {
        currentQuestion++; 
        setTimeout(newQuestion, 5000); 
    }
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#img').empty();

	$('#finalMessage').html("<h2>" + messages.finished + "</h2>");
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Play Again?');
}


