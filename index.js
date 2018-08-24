

let i;
let currentScore;


function startQuiz(event){
	$('.start-button, .restart').on('click touchend', function(e){
		
		e.preventDefault();
		
		i=0;
		currentScore = 0;
		
		handleRenderQuiz();
		
		$(".current-score").text(i);
		$(".last-page, .next-question").fadeOut(0);
		$(".intro").addClass("hide");
		$(".quizzes").removeClass("hide");
		$(".submit").fadeIn(100);
		
	});
};





function handleQuizGenerator(quizObj){
	
	console.log(i);
	
	const generatedQuiz = `
	<fieldset>
		<legend class="questions">${i + 1}. ${quizObj[i].question}</legend>
			
				<label for="opt-1">
					<input type="radio" name="quiz-options" id="opt-1" value="1" checked><span>${quizObj[i].option1}</span>
				</label>
				
				<label for="opt-2">
					<input type="radio" name="quiz-options" id="opt-2" value="2">
					<span>${quizObj[i].option2}</span>
				</label>
				
				<label for="opt-3">
					<input type="radio" name="quiz-options" id="opt-3" value="3">
					<span>${quizObj[i].option3}</span>
				</label>
				
				<label for="opt-4">
					<input type="radio" name="quiz-options" id="opt-4" value="4">
					<span>${quizObj[i].option4}</span>
				</label>
		</fieldset>
		`
		  
	return generatedQuiz;
	

}



function handleRenderQuiz(){
	
	const generatedQuiz = handleQuizGenerator(quizDATA);
	$(".quiz-content").html(generatedQuiz).fadeIn(200);
	$(".score").removeClass("hide");
	
	
};



function handleSubmitButton(){
	
	$(".submit").on('click touchend', event => handleCheckAnswer());
	
};




function handleCheckAnswer(){
	
	event.preventDefault();
	
	const selectedValue = parseInt($('input[name=quiz-options]:checked').val()); 
	const correctAnswerString = quizDATA[i][`option${quizDATA[i].answer}`];
	
	
	if(selectedValue === quizDATA[i].answer){
		
		currentScore += 1;
		
		$(".correct-answer").removeClass("hide");
		$(".current-score").text(currentScore);
		
	} else {
		
		$(".wrong-answer").removeClass("hide");
		$(".original-answer").text(correctAnswerString);
	};
	
	
	$(".submit").fadeOut(100,0 ,function(){
		$(".next-question").fadeIn(100);
	});
	
	
	
};



function handleNextButton(){
	$(".next-question").on('click touchend', function(e){
		
		e.preventDefault();
		
		i++;
		
		if(i<10){
			
			$(".quiz-content").fadeOut(150,function(){
				handleRenderQuiz();
			});
			$(".next-question").fadeOut(100, function(){
			$(".submit").fadeIn(100);
		});
			
		
		} else {
			
			$(".last-page").fadeIn(200);
			$(".next-question").fadeOut(200);
			$(".quizzes, .next-question").addClass("hide");
			$(".total-score").text(`Total score : ${currentScore}/10`);
			
			if(currentScore < 4){
				$(".outro").text("Total novice!!");
			}else if(currentScore < 8){
				$(".outro").text("A little rusty...");
			}else {
				$(".outro").text("Rock on, rock star!");
			};
			
		};
		
		$(".wrong-answer, .correct-answer").addClass("hide");
		
		
	});
};




function handleQuizApp(){
	startQuiz();
	handleSubmitButton();
	handleNextButton();
};


$(handleQuizApp);