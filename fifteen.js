/*Extra Feature(Grade)---->Multiple backgrounds:
When a user presses a radio button then the picture of the puzzle is changed to 1 of 4 background images.*/

$(document).ready(function(){
	//select three divs and add to css class puzzlepiece
	$("div div div").addClass("puzzlepiece");

	//Control divs Positions
	var positionX = parseInt($("#puzzlearea").css("top"));
	var positionY = parseInt($("#puzzlearea").css("left"));

	//Declare variables for image postions
	var imgX = 0;
	var imgY = 0;

	//Declare variables for blank space postions
	var emptyX = 300;
	var emptyY = 300;

	//Get pieces of puzzle
	var pieces = document.getElementsByClassName("puzzlepiece");

	for(var i=0; i < pieces.length; i++){
		//Set the background image postion on each div(piece)
		$(pieces[i]).css("background-position", imgX+"px "+imgY+"px");

		//Manage the offet negations
		imgX -= 100;
		if(imgX%400 == 0){
			imgY -= 100;
		}

		//Positioning each div
		$(pieces[i]).css("top", positionY);
		$(pieces[i]).css("left", positionX);

		positionX += 100;

		if(i !=0 && (i+1)%4 == 0){
			positionY += 100;
			positionX = parseInt($("#puzzlearea").css("top"));
		}

		//Change colour of piece when the mouse cursor hovers over it
		$(pieces[i]).mouseover(function(){
			if(isEmpty(this)){
				$(this).addClass("movablepiece");
			}
		});

		//When the mouse is no longer hovering the piece remove its colour change
		$(pieces[i]).mouseleave( function(){
			$(this).removeClass("movablepiece");
		});

		//Switch piece with empty slot if it is clicked
		$(pieces[i]).click( function(){
			if(isEmpty(this)){
				switchPiece(this);
			}
		});
	}

	//Check if pieces are next to empty slots
	var isEmpty = function(piece){
 //Convert string to integers to perform checks
		if(((parseInt($(piece).css("top")) - emptyY == 100 || parseInt($(piece).css("top")) - emptyY == -100) && parseInt($(piece).css("left")) - emptyX == 0)
		||((parseInt($(piece).css("left")) - emptyX == 100 || parseInt($(piece).css("left")) - emptyX == -100) && parseInt($(piece).css("top")) - emptyY == 0)){
			return true;
		}

		else{
			return false;
		}
	};

	//Switch pieces
	var switchPiece = function(move){
		//Declare temporary slots
		var temporaryX = emptyX;
		var temporaryY = emptyY;

		emptyY = parseInt($(move).css("top"));
		emptyX = parseInt($(move).css("left"));

		$(move).css("top", temporaryY);
		$(move).css("left", temporaryX);
	};

	//Check if piece is next to empty slot then move
	var movePiece = function(){

		//Create an array to store pieces
		var piecesArray = [];

		for(var i=0; i < pieces.length; i++){
			if (isEmpty(pieces[i]) == true){
				piecesArray.push(pieces[i]);
			}
		}

		//generate a random piece that is next to empty piece
		var move = piecesArray[Math.floor(Math.random() * piecesArray.length)];

		//switch the empty slot with the random piece
		switchPiece(move);

	};
	//Manage shuffle button
	$("#shufflebutton").click( function(){
		//Allowed movemets after shuffle
		movement = Math.floor(Math.random() * 100) + 100;

		for(var i=0; i < movement; i++){
			movePiece();
		}
	});

	//Extra Feature
	//Used to select a backround image
	function selectBackground() {
		//Create the  radio buttons to change the background image and add it to the page
		var bgImagesForm = "<form align='Center'>\
		<p align='Center'><strong>Choose a background theme from the 4 options below:</strong><p>\
		<input type = 'radio' name = 'backgroundImg' value = ''/> High School Crest\
		<input type = 'radio' name = 'backgroundImg' value = '1'/>Chevrolet\
		<input type = 'radio' name = 'backgroundImg' value = '2'/>Eggs\
		<input type = 'radio' name = 'backgroundImg' value = '3'/>Naruto\
		</form>";

		$("#overall").before(bgImagesForm);

	}

	//Get the value of a radio button and  select the background image associated with that radio button
	function changeBackground(value) {

		for (var i = 0; i < pieces.length; i++){
			pieces[i].style.backgroundImage = `url('background${value}.jpg')`;
		}
	}
  //randomly select an image background
	function shuffleImage(){
		var value = Math.floor(Math.random()*4)
		if(value === 0){
			value = "";
		}
		changeBackground(value);
	}

	selectBackground();
	var formElements = $("form")[0].elements;

	for (var i = 0; i < formElements.length; i++) {
		formElements[i].addEventListener("click", function(){
			changeBackground(this.value)
		});
	}

	shuffleImage()

});
