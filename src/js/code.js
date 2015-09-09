var gametimer = 0;
var GameState;
var team;
var theGame;
var selectedGuy;
var areaSlots = {};

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
var everyslot =[];
function Reset() {
	// Set user interface to Team select
	GameState = "SelectTeam";
	team = [];
	selectedGuy = undefined;
	areaSlots = {};
	 everyslot =[];
	for (var i = 0; i < Areas.length; i++) {
		var loc = Areas[i];
		areaSlots[loc.name] = [];

		var div = $('<div/>', {
			id: loc.safeName + "AreaDiv",
			class: 'area',
		})

		div.append('<div class="areaTitle">' + loc.name + '</div>');
		for (var j = 0; j < loc.slots; j++) {
			areaSlots[loc.name][j] = false;
			var slotdiv = $('<div/>', {
				id: loc.safeName+'AreaSlot'+(j+1)+'Div',
				class: 'areaSlot',
			})
			everyslot.push(slotdiv);
			slotdiv.appendTo(div);
		}
		div.appendTo(mainDiv);
	}
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
	if(theGame !== undefined){
		bugsDiv.html("Bugs<br>"+Math.floor(theGame.bugs));
		codesizeDiv.html("Code Size<br>"+Math.floor(theGame.codeSize));
		coolnessDiv.html("Coolness<br>"+Math.floor(theGame.coolness));
	}else{
		bugsDiv.html("Bugs<br>0");
		codesizeDiv.html("Code Size<br>0");
		coolnessDiv.html("Coolness<br>0");
	}
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
			for (var i = 0; i < everyslot.length; i++) {
				$(everyslot[i]).html("");
			}
			
			
			for (var i = 0; i < 4; i++) {
				ProcessGuy(i);
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

function ProcessGuy(i) {
	var guy = team[i];
	var loc = GetArea(guy.area);
				//update UI slots
	var slotdiv = $("#"+loc.safeName+'AreaSlot'+(guy.slotID+1)+"Div");
	slotdiv.html(guy.name);
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
		guy.stress = Clamp(guy.stress);
		guy.energy = Clamp(guy.energy);
		guy.drunk = Clamp(guy.drunk);
		
		theGame.bugs += loc.bugs;
		theGame.codeSize += loc.codeSize;
		theGame.coolness += loc.coolness;

		//UpdateUi
		$("#teamMember"+(i+1)+"EnergyDiv").width(guy.energy * 100+"%");
		$("#teamMember"+(i+1)+"StressDiv").width(guy.stress * 100+"%");
		$("#teamMember"+(i+1)+"DrunkDiv").width(guy.drunk * 100+"%");
	}
}

function MoveGuy(newPostion,force) {
	if(force === undefined){force == false;}
	if (selectedGuy === undefined) {
		return;
	}
	if (selectedGuy.status == "working" || selectedGuy.status == "" || force) {
		//try to reserve a slot
		var loc = GetArea(newPostion);
		var slotID = 0;
		var found = false;
		for (var i = 0; i < loc.slots; i++) {
			if (!areaSlots[newPostion][i]) {
				found = true;
				slotID = i;
				break;
			}
		}
		if (!found) {
			//No free slots, bail out
			return;
		} else {
			//unreserve current slot
			if(selectedGuy.area != ""){
				areaSlots[selectedGuy.area][selectedGuy.slotID] = false;
				console.log(selectedGuy.name + " Moving from: "+selectedGuy.area +" Slot: "+selectedGuy.slotID);
			}
			console.log(selectedGuy.name + " Moving To: "+newPostion +" Slot: "+slotID);
			//reserve slot
			areaSlots[newPostion][slotID] = true;
			//start moving
			selectedGuy.slotID = slotID;
			selectedGuy.status = "moving";
			selectedGuy.area = newPostion;
			selectedGuy.movetime = 0;
		}

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
	team[0].name = "bob";
	team[1].name = "jim";
	team[2].name = "joe";
	team[3].name = "st";
	selectedGuy = team[0];
	MoveGuy("Sofa",true);
		selectedGuy = team[1];
	MoveGuy("Sofa",true);
		selectedGuy = team[2];
	MoveGuy("Sofa",true);
		selectedGuy = team[3];
	MoveGuy("Sofa",true);
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

function Clamp(a){
	return Math.max(Math.min(a,1.0),0.0);
}


function GetArea(areaname){
	var loc = $.grep(Areas, function (a) {
		return a.name == areaname;
	});
	if (loc.length == 1) {
		return loc[0];
	} else {
		console.error("unkown location: " + areaname);
	}
}