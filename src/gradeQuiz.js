// Model
(function() {

	// Public

	window.Quiz = {};

	Quiz.scores_by_name = [];

	Quiz.questions = [
		{	
			id: 0,
			content: "What is your favorite color?",
			answer_options: [
				"Blue",
				"Green",
				"Red"
			],
			answer: "Blue",
			average_score: 0
		},
		{	
			id: 1,
			content: "What class is your boat?",
			answer_options: [
				"C-Class fishing vessel",
				"D-Class freighter"
			],
			answer: "C-Class fishing vessel",
			average_score: 0
		},
		{	
			id: 2,
			content: "What is a Taargus?",
			answer_options: [
				"The first globe-shaped storage unit",
				"An elephantine pencil sharpener",
				"A form of asteroid"
			],
			answer: "The first globe-shaped storage unit",
			average_score: 0
		},
		{	
			id: 3,
			content: "How old is Hawaii?",
			answer_options: [
				"34 years",
				"10 days",
				"510,000,000 years",
				"potato"
			],
			answer: "10 days",
			average_score: 0
		}
	]

	Quiz.responses = {
		0: [],
		1: [],
		2: [],
		3: []
	}

	$(".quiz").on("submit", function(e) {

		var answers = [];
		e.preventDefault();
		for (i = 0; i < Quiz.questions.length; i++) {
			// grab the user's responses and put them into an array
			answers.push($('[name=' + i + ']:checked').val()) 
			// push the answer to each question into its respective array in Quiz.responses
			Quiz.responses[Quiz.questions[i].id].push($('[name=' + i + ']:checked').val()) 
		}
		var name = $('[name="name"]').val()
		gradeQuiz(Quiz.questions, answers, name);

	})

	function gradeQuiz(questions, answers, name) {
		console.log("grading quiz")
		var score = 0;
		for (i = 0; i < answers.length; i++) {
			if (answers[i] === questions[i].answer) {
				score += 1
			}
		}
		window.score = score
		Quiz.scores_by_name.push([name, score])
		recalculateAverageScores()
		Quiz.presentScore()
		Quiz.presentQuestions(Quiz.questions)
		Quiz.presentHighScores()
	}

	function recalculateAverageScores () {
		for (var question in Quiz.questions) {

			// count number of correct answers
			var correct = Quiz.responses[Quiz.questions[question].id].filter(function(element) {
				return element == Quiz.questions[question].answer
			})

			// divide by number of responses and update average_score
			Quiz.questions[question].average_score = correct.length / Quiz.responses[Quiz.questions[question].id].length

		}
	}

})();

	// Presenter

(function(){
	
	Quiz.presentScore = function () {
		$(".score-div").find('h5').remove();
		$(".score-div").append("<h5>Your score: " + score + "/ " + Quiz.questions.length + "</h5>")
	}

	Quiz.presentQuestions = function(questions) {
		$(".questionstuff").remove();
		questions.forEach(function(question) {
			$(".questions-div-bottom").before(
				$('<label class="questionstuff">').text(question.content + " Percent Correct: " + question.average_score * 100),
				$('<br class="questionstuff">'),
				question.answer_options.map(function(option){
					console.log('Option:',option)
					// return "<input name='" + question.content + "' type=radio value='" + option + "'>" + option + "<br>"
					return $('<div class="questionstuff">').addClass('option').append(
						$('<input class="questionstuff">').attr({ name: question.id, type: 'radio', value: option }),
						option,
						$('<br class="questionstuff">')
					)
				})
			)
		})
	}

	Quiz.presentQuestions(Quiz.questions);

	Quiz.presentHighScores = function () {
		$(".high-scores-div").find('h5').remove();
		sorted = Quiz.scores_by_name.sort(function(a,b){
			return b[1] - a[1]
		})
		for (i = 0; i < 3; i ++) {
			$(".high-scores-div").append('<h5>' + Quiz.scores_by_name[i][0] + ': ' + Quiz.scores_by_name[i][1] + '</h5>')
		}
	}

	Quiz.presentHighScores()
	
})()