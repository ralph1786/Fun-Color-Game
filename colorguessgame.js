let numOfSquares = 6;
let colors = [];
let pickedColor;
let squares = document.querySelectorAll(".square");
let colorDisplay = document.querySelector("#colorDisplay");
let topMessage = document.querySelector("#message");
let h1 = document.querySelector("h1");
let resetButton = document.querySelector("button");
let modeButtons = document.querySelectorAll(".mode");

function changeColors(color){
		//Loop through all squares.
	for(var i = 0; i < squares.length; i++){
		//change each color to match correct color.
		squares[i].style.backgroundColor = color;
	};
};

function differentColor(){
	let random = Math.floor(Math.random() * colors.length);
	return colors[random];
}
//Following function generates random rgb colors.
function randomColors(){
	//Pick a "red" from 0 - 255.
	let r = Math.floor(Math.random() * 256);
	//Pick a "green" from 0 - 255.
	let g = Math.floor(Math.random() * 256);
	//Pick a "blue" from 0 - 255.
	let b = Math.floor(Math.random() * 256);
	return `rgb(${r}, ${g}, ${b})`;
}

function generateRandomColors (num){
	//make an array.
	let arr = [];
	//add num random colors to array.
	for(var i = 0; i < num; i++){
	//get random color and push to arr
	arr.push(randomColors());
	}
	//return that array.
	return arr;
}

function reset(){
	//generate all new colors.
	colors = generateRandomColors(numOfSquares);
	//pick a new random color from array.
	pickedColor = differentColor();
	//change colorDisplay to match picked color.
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors";
	//change colors of squares.
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
		squares[i].style.display = "block";//bring squares when changes from easy to hard mode.	
		squares[i].style.backgroundColor = colors[i];
		} else{
		squares[i].style.display = "none";	
		}
	}
	//resets header color back to original color.
	h1.style.backgroundColor = "#56c4ef";
	topMessage.textContent = "";
}

resetButton.addEventListener("click", function(){
	reset();
});
	
function init(){
	//Mode Button Event Listeners.
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function (){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			modeButtons[2].classList.remove("selected");
			this.classList.add("selected");
			//figure out how many squares to show.
			this.textContent === "Easy" ? numOfSquares = 3 : this.textContent === "Normal" ? numOfSquares = 6 : numOfSquares = 9;
			reset();
		});
	}	
	for(var i = 0; i < squares.length; i++){
		//Add initial colors to squares.
		squares[i].style.backgroundColor = colors[i];
		//Add click event listener to squares.
		squares[i].addEventListener('click', function() {	
		//Grab color of clicked square.
		let clickedColor = this.style.backgroundColor;
		//Compare color to pickedColor.
			if(clickedColor === pickedColor){
			topMessage.textContent = "You Win!!";
			resetButton.textContent = "Play Again?";
			changeColors(clickedColor);//Changes color of all squares to the correct color.
			h1.style.backgroundColor = this.style.backgroundColor;//changes background color of header to correct color.
			}else{
			this.style.backgroundColor = "#232323"; //This makes the square disappear into the background.
			topMessage.textContent = "Oops Try Again";
			}	
		});
	};
	reset();
}
 init();







