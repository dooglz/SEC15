var gametimer = 0;
var GameState;
var team;
var theGame;
var selectedGuy;

//$ selectors
var bugsDiv = $("#bugsDiv");
var codesizeDiv = $("#codesizeDiv");
var coolnessDiv = $("#coolnessDiv");
var timerDiv = $("#timerDiv");
var teamDiv = $("#teamDiv");
var teamMember1Div = $("#teamMember1Div");
var teamMember2Div = $("#teamMember2Div");
var teamMember3Div = $("#teamMember3Div");
var teamMember4Div = $("#teamMember4Div");
var mainDiv = $("#mainDiv");
var sofaAreaDiv = $("#sofaAreaDiv");
var computerAreaDiv = $("#computerAreaDiv");
var whiteboardAreaDiv = $("#whiteboardAreaDiv");
var conferenceAreaDiv = $("#conferenceAreaDiv");
var testAreaDiv = $("#testAreaDiv");
var smokingAreaDiv = $("#smokingAreaDiv");
var pubAreaDiv = $("#pubAreaDiv");
var shopAreaDiv = $("#shopAreaDiv");

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
	timerDiv.html("Time Remaining<br>"+MillisToTime(gametimer));
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


function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}

function MillisToTime(millis) {
  var hours = zeroPad(Math.floor(millis / 36e5), 2),
      mins = zeroPad(Math.floor((millis % 36e5) / 6e4), 2),
      secs = zeroPad(Math.floor((millis % 6e4) / 1000), 2),
      mil = zeroPad(Math.floor((millis % 1000)), 3);
  return (mins + ':' + secs + ':' + mil);
}
