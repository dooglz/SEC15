var gametimer = 0;
var GameState;
var team;
var theGame;
var selectedGuy;
var areaSlots = {};
var slotcolour = "33FFFF";

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
var everyslot = [];

$("#teamMember1Div").click(function () {
	selectedGuy = team[0];
	$("#teamMember1Div").addClass("selected");
	$("#teamMember2Div").removeClass("selected");
	$("#teamMember3Div").removeClass("selected");
	$("#teamMember4Div").removeClass("selected");
});
$("#teamMember2Div").click(function () {
	selectedGuy = team[1];
	$("#teamMember2Div").addClass("selected");
	$("#teamMember1Div").removeClass("selected");
	$("#teamMember3Div").removeClass("selected");
	$("#teamMember4Div").removeClass("selected");
});
$("#teamMember3Div").click(function () {
	selectedGuy = team[2];
	$("#teamMember3Div").addClass("selected");
	$("#teamMember2Div").removeClass("selected");
	$("#teamMember1Div").removeClass("selected");
	$("#teamMember4Div").removeClass("selected");
});
$("#teamMember4Div").click(function () {
	selectedGuy = team[3];
	$("#teamMember4Div").addClass("selected");
	$("#teamMember2Div").removeClass("selected");
	$("#teamMember3Div").removeClass("selected");
	$("#teamMember1Div").removeClass("selected");
});

var teampickcount =0;
function Reset() {
	// Set user interface to Team select
	GameState = "SelectTeam";
	team = [];
	selectedGuy = undefined;
	areaSlots = {};
	everyslot = [];
	//
	$("#TeamChoiceDiv").html('<div class="teamChoiceHeadder">Select Team Members</div>');
	for (var i = 0; i < TeamMemberNames.length; i++) {
		var name = TeamMemberNames[i];
		var div = $('<div class="teamchoiceperson">'+name+'</div>');
		div.click(
			function (_item) {
				return function (ev) {
					console.log("Person Clicked: \n", _item);
					AddToTeam(_item);
				};
			} (name)
			);
		$("#TeamChoiceDiv").append(div);
	}
	teampickcount =0;	
}

function AddToTeam(name){
	team[teampickcount] = new TeamMember();
	team[teampickcount].name = name;
	$("#teamMember"+(teampickcount+1)+"NameDiv").html(name);
	teampickcount++;
	if(teampickcount == 4){
		team[0].colour = "00E1FF";
		team[1].colour = "FF1E00";
		team[2].colour = "62FF00";
		team[3].colour = "F700FD";
		//picked full team.
		GameCatagoriesSelection();
	}
}

function ProgrammingLanguagesSelection(){
  $("#TeamChoiceDiv").html("");
	$("#TeamChoiceDiv").html('<div class="teamChoiceHeadder">Select game Language</div>');
  GameState = "SelectLanguage";
  for (var i = 0; i < ProgrammingLanguages.length; i++) {	
		var pname = ProgrammingLanguages[i].name;
		div = $('<div class="languagechoice">' + pname + '</div>');
		div.click(
			function (_item,d) {
				return function (ev) {
					console.log("Language Clicked: \n", _item,d);
					theGame.language = _item;
          GameMode();
				};
			} (pname,div)
			);
			$("#TeamChoiceDiv").append(div);
	}	
}

function GameCatagoriesSelection() {
	$("#TeamChoiceDiv").html("");
	$("#TeamChoiceDiv").html('<div class="teamChoiceHeadder">Select game Catagory</div>');
	GameState = "SelectGame";
	theGame = new Game();
	for (var i = 0; i < GameCatagories.length; i++) {
		var name = GameCatagories[i].name;
		var div = $('<div class="catagorychoice">' + name + '</div>');
		div.click(
			function (_item,d) {
				return function (ev) {
					console.log("Catagory Clicked: \n", _item,d);
					theGame.catagory = _item;
          ProgrammingLanguagesSelection();
				};
			} (name,div)
			);
		$("#TeamChoiceDiv").append(div);
	}
}

function GameMode() {
	$("#TeamChoiceDiv").html("");
	teamMember1Div.css("background-color", "#"+team[0].colour);
	teamMember2Div.css("background-color", "#"+team[1].colour);
	teamMember3Div.css("background-color", "#"+team[2].colour);
	teamMember4Div.css("background-color", "#"+team[3].colour);
	gametimer = gameTime;
	GameState = "MainGame";
	
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
				id: loc.safeName + 'AreaSlot' + (j + 1) + 'Div',
				class: 'areaSlot',
			})
			slotdiv.html("-");
			everyslot.push(slotdiv);
			slotdiv.appendTo(div);
		}
		//fukin closures, sheild your eyes from this evil
		div.click(
			function (_item) {
				return function (ev) {
					console.log("Area Clicked: \n", _item);
					MoveGuy(_item.name);
				};
			} (loc)
			);
		div.appendTo(mainDiv);
	}
		selectedGuy = team[0];
	MoveGuy("Sofa", true);
	selectedGuy = team[1];
	MoveGuy("Sofa", true);
	selectedGuy = team[2];
	MoveGuy("Sofa", true);
	selectedGuy = team[3];
	MoveGuy("Sofa", true);
	
}

function Judge() {
	GameState = "Judging";
}
var TimerMultiple = 1.0;

var ticktimer = setInterval(Tick, 1);
var prevtime;

function Tick() {
	timerDiv.html("Time Remaining<br>" + MillisToTime(gametimer));
	if (theGame !== undefined) {
		bugsDiv.html("Bugs<br>" + Math.floor(theGame.bugs));
		codesizeDiv.html("Code Size<br>" + Math.floor(theGame.codeSize));
		coolnessDiv.html("Coolness<br>" + Math.floor(theGame.coolness));
	} else {
		bugsDiv.html("Bugs<br>0");
		codesizeDiv.html("Code Size<br>0");
		coolnessDiv.html("Coolness<br>0");
	}
	var delta = (new Date() - prevtime);
	prevtime = new Date();
	TimerMultiple = (0.001 * delta);
	switch (GameState) {
		case "MainGame":
			gametimer -= delta;
			if (gametimer <= 0) {
				//times ran out, judge time
				Judge();
				break;
			}
			for (var i = 0; i < everyslot.length; i++) {
				$(everyslot[i]).html("-");
				$(everyslot[i]).css("background-color", "#E0E0E0");
			}
			for (var i = 0; i < 4; i++) {
				ProcessGuy(i);
			}
			break;
		case "SelectTeam":
			break;
		case "SelectGame":
			break;
     case  "SelectLanguage":
     break;
		case "Judging":
			$("#myModal").modal("show");
			break;
		default:
			break;
	}
}

function ProcessGuy(i) {
	var guy = team[i];
	var loc = GetArea(guy.area);
				//update UI slots
	var slotdiv = $("#" + loc.safeName + 'AreaSlot' + (guy.slotID + 1) + "Div");
	slotdiv.html(guy.name);
	if (guy.status == "moving") {
		if (guy.movetime >= loc.travelTime) {
			guy.status = "working";
			guy.movetime = 0;
		}
		guy.movetime += 1.0* TimerMultiple;
		//update ui
		slotdiv.css("background-color", "#"+ColourSaturator(guy.movetime / loc.travelTime, guy.colour));
	} else {
		slotdiv.css("background-color", "#"+guy.colour);
		guy.stress += TimerMultiple * loc.stress;
		guy.energy += TimerMultiple * loc.energy;

		guy.drunk += TimerMultiple * loc.drunk;
		guy.stress = Clamp(guy.stress);
		guy.energy = Clamp(guy.energy);
		guy.drunk = Clamp(guy.drunk);
		theGame.bugs += TimerMultiple * loc.bugs;
		theGame.bugs = Math.max(theGame.bugs, 0);
		theGame.codeSize += TimerMultiple * loc.codeSize;
		theGame.coolness += TimerMultiple * loc.coolness;
		
		//UpdateUi
		//todo: yer maw
		//loop to make ui bars grow properly
        //smoke weed everyday
		$("#teamMember" + (i + 1) + "EnergyDiv").width(Math.floor(guy.energy * 100.0) + "%");
		$("#teamMember" + (i + 1) + "StressDiv").width(Math.floor(guy.stress * 100) + "%");
		$("#teamMember" + (i + 1) + "DrunkDiv").width(Math.floor(guy.drunk * 100) + "%");
		$("#teamMember" + (i + 1) + "MotivationDiv").width(Math.floor(guy.productivity * 100) + "%");

		if (guy.drunk === 0.1) {	// if person is not drunk use stress and energy to calculate productivity
			guy.productivity = guy.energy - guy.stress;
		}
		else if (guy.drunk > 0.1) {	//otherwise include how drunk in the calculation
			guy.productivity = guy.drunk * guy.energy / guy.stress;
		}
		
		// deal with productivity once it reaches a certain level 
		if (guy.productivity <= 0.25) {

		}
		else if (guy.productivity <= 0.5) {

		}
		else if (guy.productivity <= 0.75) {

		}

	}
}

function MoveGuy(newPostion, force) {
	if (force === undefined) { force == false; }
	if (selectedGuy === undefined) {
		return;
	}
	if(newPostion == selectedGuy.area){
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
			if (selectedGuy.area != "") {
				areaSlots[selectedGuy.area][selectedGuy.slotID] = false;
				console.log(selectedGuy.name + " Moving from: " + selectedGuy.area + " Slot: " + selectedGuy.slotID);
			}
			console.log(selectedGuy.name + " Moving To: " + newPostion + " Slot: " + slotID);
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

function Clamp(a) {
	return Math.max(Math.min(a, 1.0), 0.0);
}


function GetArea(areaname) {
	var loc = $.grep(Areas, function (a) {
		return a.name == areaname;
	});
	if (loc.length == 1) {
		return loc[0];
	} else {
		console.error("unkown location: " + areaname);
	}
}

function ColourSaturator(a,c) {
	var r = (Math.floor(a * parseInt(c.slice(0, 2), 16))).toString(16);
	if(r.length < 2){
		r = "0"+r;
	}
	var g = (Math.floor(a * parseInt(c.slice(2, 4), 16))).toString(16);
		if(g.length < 2){
		g = "0"+g;
	}
	var b = (Math.floor(a * parseInt(c.slice(4, 6), 16))).toString(16);
		if(b.length < 2){
		b = "0"+b;
	}
	return r+g+b;
}

Reset();
//          