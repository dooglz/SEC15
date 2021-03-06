// Main Variables.

//Total game time in miliseconds
var gameTime = 120000;

//class for game
var Game = function () {
  this.name = "";
  this.teamName = "";
  this.catagory = "";
  this.language = "";
  //
  this.bugs = 0;
  this.codeSize = 0; //in kb
  this.coolness = 0;
  //attributes
};

//class for a team member
var TeamMember = function (name) {
  this.name = name;
  //attributes
  this.stress = 0.0;
  this.energy = 1.0;
  this.drunk = 0.0;
  this.status = ""; //Either "moving" or "working"
  this.area = ""; 
  //skill
  this.programmingSkill = 1.0;
  this.planningSkill = 1.0;
  this.testingSkill = 1.0;
  this.charisma = 1.0;
  this.colour = "";
  //
  this.movetime = 0; //if moving, how long have they been moving
  this.slotID = 0; //which slot in the current area the guy is in.
};

var TeamMemberNames = [
  "Alistair", "Andrew", "Ben", "Christopher", "Ciaran", "Gavin", "Godwill", "Haoyang", "Kieran", "Kirsty", "Michael",
  "Nathaniel", "Noe", "Stewart", "Blythe", "Conar", "Meebelo", "Neil", "Sam", "Adam", "Alexander", "Andrew", "Andrew",
  "Calum", "Connor", "Grant", "Jordan", "Karl", "Lyle", "Mateusz", "Nathan", "Nicholas", "Adam", "Alasdair", "Bartholomew",
  "Caelan", "Calum", "Conner", "Jack", "Jeremy", "Kimon", "Kristian", "Louis", "Martin", "Marvin", "Matthew", "Matthew",
  "Nikolaos", "Romans", "Ross", "Ruairi", "Ryan", "Steven", "Tomasz", "Valentina", "Brian", "Liam", "King", "Callan", "Ash",
];

var GameCatagories = [
  { name: "Yet Another Timetable App", codeSize: 0.1, coolness: 0.0 },
  { name: "Boat Simulator", codeSize: 0.8, coolness: 0.8 },
  { name: "Boat Simulator Simulator", codeSize: 0.9, coolness: 0.9 },
  { name: "Amazing GTA Clone", codeSize: 1.0, coolness: 1.0 },
  { name: "WhatSnapp", codeSize: 0.2, coolness: 0.2 },
  { name: "Dino Ghost", codeSize: 0.3, coolness: 0.5 },
  { name: "Text Adventure", codeSize: 0.2, coolness: 0.2 },
];

var ProgrammingLanguages = [
  { name: "C", codeSize: 1.0, coolness: 1.0 },
  { name: "C++", codeSize: 0.8, coolness: 1.0 },
  { name: "C#", codeSize: 0.3, coolness: 0.8 },
  { name: "Java", codeSize: 0.3, coolness: 0.4 },
  { name: "JavaScript", codeSize: 0.2, coolness: 0.7 },
  { name: "F#", codeSize: 0.1, coolness: 0 },
  { name: "Go", codeSize: 0.1, coolness: 0.6 },
  { name: "PHP", codeSize: 0.5, coolness: 0 },
];

var Areas = [
  { name: "Sofa", safeName: "sofa", description: "Chillout", slots: 4, travelTime: 2, stress: -.05, energy: 0.1, drunk: -0.7, bugs: 0, codeSize: 0, coolness: 0 },
  { name: "Computer", safeName: "computer", description: "Code", slots: 3, travelTime: 1, stress: 0.03, energy: -0.015, drunk: 0, bugs: 0.1, codeSize: 1.5, coolness: 0.01 },
  { name: "Whiteboard", safeName: "whiteboard", description: "Plan", slots: 3, travelTime: 1, stress: 0.01, energy: -0.05, drunk: 0, bugs: 0, codeSize: 0.1, coolness: 0.5 },
  { name: "Conference room", safeName: "conference", description: "Practise Presentation", slots: 2, travelTime: 2, stress: 0.002, energy: -0.01, drunk: 0, bugs: 0, codeSize: 0, coolness: 0.1 },
  { name: "Test Area", safeName: "test", description: "QA", slots: 2, travelTime: 1, stress: 0.1, energy: -0.01, drunk: 0, bugs: -0.1, codeSize: 0, coolness: 0.1 },
  { name: "Smoking Area", safeName: "smoking", description: "420 blazeit", slots: 2, travelTime: 3, stress: -0.5, energy: 0, drunk: 0.1, bugs: 0, codeSize: 0, coolness: 0.0 },
  { name: "Pub", safeName: "pub", description: "Forget Troubles", slots: 2, travelTime: 10, stress: -0.2, energy: 0, drunk: 0.3, bugs: 0, codeSize: 0, coolness: 0.1 },
  { name: "Shop", safeName: "shop", description: "Get Food", slots: 1, travelTime: 5, stress: -0.5, energy: 0.15, drunk: 0.0, bugs: 0, codeSize: 0, coolness: 0 },
];

//modifiers, applied whenever a is calulated
var modifiers = [
  /* // Work in progress
  // {a: "", b:"", mod:1.0 } // a + (mod * drunk)
  { a: "stress", b: "drunk", mod: -0.1 }, // stress + (-0.1 * drunk) // aka whenever stress is added, the amount is reduced by 10% of the drunk level
  { a: "charisma", b: ["drunk", "energy"], func: function (a, b) {
          var drunk = d[0];
          var energy = d[1];
          var stress = d[2];
          return a;
     } 
   },
     { a: "bugs", b: ["drunk", "energy","stress"], func: function (a, b) {
          var drunk = d[0];
          var energy = d[1];
          var stress = d[2];
          return a;
     } 
   },*/
]