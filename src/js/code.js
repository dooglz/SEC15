var gametimer;
var GameState;
var team;
var theGame;

function Reset() {
	// Set user interface to Team select
	GameState = "SelectTeam";
	team = [];
}

function GameSelection() {
	GameState = "SelectGame";
	theGame = new Game("");
}

function GameMode() {
	gametimer = gameTime;
	GameState = "MainGame";
}

function Judge() {
	GameState = "Judging";
}

var timer = setInterval(Tick, 30);
var prevtime;
function Tick(){
	var delta = (new Date() - prevtime);
	prevtime = new Date();
	switch (GameState) {
		case "MainGame":
			gametimer -= delta;
			if(gametimer <=0){
				//times ran out, judge time
				Judge();
				break;
			}
			for (var i = 0; i < 4; i++) {
				ProcessGuy(team[i]);
			}
			break;
		default:
			break;
	}
	
}

function ProcessGuy(guy){
	if(guy.status == "Moving"){
		
	}else{
		
	}
}