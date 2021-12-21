$(document).ready(function () {
	$('#button-sign-up').click(function () {
		if (checkIfEmpty()) {
			$('#output').html(
				'<h5> Registration details:</h5>' +
					'<hr>' +
					'Name: ' +
					$('#name').val() +
					'<br>' +
					'<br>' +
					'Email: ' +
					$('#email').val() +
					'<br>' +
					'<br>' +
					'Password: ' +
					$('#password').val() +
					'<br>' +
					'<br>' +
					'- - -' +
					'<br>' +
					'<br>' +
					'Role: ' +
					$('#inputState').val() +
					'<br>' +
					'<br>' +
					'System: ' +
					$('#radio-options').val() +
					'<br>' +
					'<br>' +
					printCheckBox()
			);
			$('form')[0].reset(); //reset the form
			$('#password-strength').css('background', 'white'); //change the strength bar color to white again.
		}
		$('#radio-options').val('');
		return false; // disable default form submission
	});
	//check every field of the form, if empty than wrtie alert the user, if not continue.
	function checkIfEmpty() {
		let flag = 1;

		if ($('#name').val() == '') {
			$('#name-error').html('Please fill name');
			flag = 0;
		} else $('#name-error').html('');

		if ($('#email').val() == '') {
			$('#email-error').html('Please fill a valid email');
			flag = 0;
		} else $('#email-error').html('');

		if ($('#password').val() == '') {
			$('#password-error').html('Please fill password');
			flag = 0;
		} else {
			$('#password-error').html('');
			flag = checkPasswordStrength();
		}

		if ($('#inputState').val() == '') {
			$('#role-error').html('Please select Role...');
			flag = 0;
		} else $('#role-error').html('');

		if (!$('#flexRadioDefault1').prop('checked') && !$('#flexRadioDefault2').prop('checked')) {
			$('#radio-error').html('Please select System...');
			flag = 0;
		} else {
			// put the value from the correct radio button in the parent element
			$('#radio-error').html('');
			if ($('#flexRadioDefault1').prop('checked')) {
				$('#radio-options').val($("label[for='flexRadioDefault1']").text());
			}
			if ($('#flexRadioDefault2').prop('checked')) {
				$('#radio-options').val($("label[for='flexRadioDefault2']").text());
			}
		}

		return flag;
	}
	//make string from the check boxes that selected.
	function printCheckBox() {
		var checkValues = [];

		$.each($("input[type='checkbox']:checked"), function () {
			checkValues.push($("label[for='" + $(this).attr('id') + "']").text() + '<br>');
		});

		if (checkValues.length != 0) {
			checkValues.unshift('Affiliations:' + '<br>');
		}

		return checkValues.join('');
	}

	function checkPasswordStrength() {
		//if the strength bar has that string valut its mean its red, and the password is weak.
		if (
			$('#password-strength').css('background') ==
			'rgba(0, 0, 0, 0) linear-gradient(to right, rgb(255, 0, 0) 30%, rgb(255, 255, 255) 0%) repeat scroll 0% 0% / auto padding-box border-box'
		) {
			$('#passwordTest').html('Password is weak');
			return 0;
		} else $('#passwordTest').html('');

		return 1;
	}
});

var myApp = angular.module('myapp', []);
myApp.controller('PasswordController', function ($scope) {
	var strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
	var mediumRegex = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');

	$scope.passwordStrength = {
		float: 'left',
		width: '95%',
		height: '10px',
		'margin-left': '5px',
		'margin-top': '5px',
		border: 'black solid 1px',
		background: 'white',
	};

	$scope.analyze = function (value) {
		if (strongRegex.test(value)) {
			$scope.passwordStrength['background'] = 'linear-gradient(to right, green 100%, white 0%)';
		} else if (mediumRegex.test(value)) {
			$scope.passwordStrength['background'] = 'linear-gradient(to right, yellow 67%, white 0%)';
		} else {
			$scope.passwordStrength['background'] = 'linear-gradient(to right, red 30%, white 0%)';
		}
	};
});
