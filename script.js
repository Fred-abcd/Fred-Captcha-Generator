/**
 * Copyright 2023 'Fred
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function generateCaptcha() {
	var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var captcha = '';
	for (var i = 0; i < 6; i++) {
		captcha += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return captcha;
}

function createCaptchaImage(captcha) {
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	canvas.width = 200;
	canvas.height = 50;
	ctx.fillStyle = '#222';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.font = 'bold 30px Arial';

	for (var i = 0; i < captcha.length; i++) {
		var character = captcha.charAt(i);
		var x = 40 + i * 25;
		var y = 30;
		var angle = Math.random() * 0.4 - 0.2;
		ctx.save();
		ctx.translate(x, y);
		ctx.rotate(angle);
		ctx.fillStyle = '#fff';
		ctx.fillText(character, -10, 10);
		ctx.restore();
	}

	for (var i = 0; i < 10; i++) {
		var x1 = Math.random() * canvas.width;
		var y1 = Math.random() * canvas.height;
		var x2 = Math.random() * canvas.width;
		var y2 = Math.random() * canvas.height;
		//var color = 'rgb(' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ')';
		var color = 'rgb(255, 255, 255)';
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.strokeStyle = color;
		ctx.stroke();
	}

	return canvas.toDataURL();
}


var captcha = generateCaptcha();
var captchaImage = document.getElementById('captcha-image');
var captchaInput = document.getElementById('captcha-input');
captchaImage.src = createCaptchaImage(captcha);
var answer = captcha.toLowerCase();


function validateCaptcha() {
	if (captchaInput.value.toLowerCase() === answer) {
		document.body.style.backgroundColor = '#0f0';
		setTimeout(function() {
			document.body.style.backgroundColor = '#444';
			captcha = generateCaptcha();
			captchaImage.src = createCaptchaImage(captcha);
			answer = captcha.toLowerCase();
			captchaInput.value = '';
		}, 1000);
	} else {
		captchaInput.value = '';
	}
}
