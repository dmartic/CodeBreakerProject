let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

// check input when user submits guess
function guess() {
    let input = document.getElementById('user-guess');

    if(answer.value === '' || attempt.value === '') {
    	setHiddenFields();
    }

    if(!validateInput(input.value)) {
    	return;
    }

    attempt.value++;

    if(getResults(input.value)) {
    	setMessage('You Win! :)');
    	showAnswer(true);
    	showReplay();
    } else if(attempt.value >= 10) {
    	setMessage('You Lose! :(');
    	showAnswer(false);
    	showReplay();
    } else {
    	setMessage('Incorrect, try again.');
    }
 
}


// set randomly generated number
function setHiddenFields() {
	attempt.value = 0;
	answer.value = Math.floor(Math.random() * 10000).toString();
	while (answer.value.length < 4) {
		answer.value = '0' + answer.value;
	}
	attempt.value = "0";
};

// message
function setMessage(message) {
	document.getElementById('message').innerHTML = message;
};

// check if input length is correct 
function validateInput(input) {
	if (input.length != 4) {
		setMessage("Guesses must be exactly 4 characters long.");
		return false;
	}
	return true;
};

// compare input with answer
function getResults(input) {
	let html = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
	for(i = 0; i < input.length; i++) {
		if( input.charAt(i) === answer.value.charAt(i) ) {
			html += '<span class="glyphicon glyphicon-ok"></span>';
		} else if (answer.value.indexOf(input.charAt(i)) > -1) {
			html += '<span class="glyphicon glyphicon-transfer"></span>';
		} else {
			html += '<span class="glyphicon glyphicon-remove"></span>';
		}
	}
	html += '</div></div>';
	document.getElementById('results').innerHTML += html;

	if(input == answer.value) {
		return true;
	}

	return false;
}

// show answer on win/lose
function showAnswer(success) {
	let code = document.getElementById('code');
	if(success) {
		code.className += ' success';
	} else {
		code.className += ' failure';
	}
	code.innerHTML = answer.value;
}

// replay button at the end of game
function showReplay() {
	document.getElementById('guessing-div').style.display = "none";
	document.getElementById('replay-div').style.display = "block";
}