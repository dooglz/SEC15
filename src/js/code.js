var gametimer;
var GameState;
var team;
var theGame;
var selectedGuy;

function Reset() {
	// Set user interface to Team select
	GameState = "SelectTeam";
	team = [];
	selectedGuy = undefined;
}

function GameSelection() {
	GameState = "SelectGame";
	theGame = new Game();
}

function GameMode() {
	gametimer = gameTime;
	GameState = "MainGame";
}

function Judge() {
	GameState = "Judging";
}

var ticktimer = setInterval(Tick, 30);
var prevtime;
function Tick() {
	var delta = (new Date() - prevtime);
	prevtime = new Date();
	switch (GameState) {
		case "MainGame":
			gametimer -= delta;
			if (gametimer <= 0) {
				//times ran out, judge time
				Judge();
				break;
			}
			for (var i = 0; i < 4; i++) {
				ProcessGuy(team[i]);
			}
			break;
		case "SelectTeam":
			break;
		case "SelectGame":
			break;
		case "Judging":

			break;
		default:
			break;
	}
}

function ProcessGuy(guy) {
	var loc = $.grep(Areas, function (a) {
		return a.name == guy.area;
	});
	if (loc.length == 1) {
		loc = loc[0];
	} else {
		console.error(guy.name + " in unkown location: " + guy.area);
	}

	if (guy.status == "moving") {
		if (guy.movetime >= loc.travelTime) {
			guy.status = "working";
			guy.movetime = 0;
		}
		selectedGuy.movetime++;
	} else {

		guy.stress += loc.stress;
		guy.energy += loc.energy;
		guy.drunk += loc.drunk;
		if (!b) {
			console.log(theGame.bugs, loc, loc.bugs);
			b = true;
		}
		theGame.bugs += loc.bugs;
		theGame.codeSize += loc.codeSize;
		theGame.coolness += loc.coolness;

	}
}

function MoveGuy(newPostion) {
	if (selectedGuy === undefined) {
		return;
	}
	if (selectedGuy.status == "working") {
		selectedGuy.status = "moving";
		selectedGuy.area = newPostion;
		selectedGuy.movetime = 0;
	}
}

var b = false;

function Test() {
	Reset();
	GameSelection();
	team[0] = new TeamMember();
	team[1] = new TeamMember();
	team[2] = new TeamMember();
	team[3] = new TeamMember();
	GameMode();
}