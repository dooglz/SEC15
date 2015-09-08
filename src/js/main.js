// Main Variables.

//Total game time in miliseconds
var gameTime = 120000;

//class for game
var Game = function (name) {
  this.name = name;
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
  this.status = "Working"; //Either "Moving" or "Working"
  this.area = "Sofa"; 
  //skill
  this.programmingSkill = 1.0;
  this.planningSkill = 1.0;
  this.testingSkill = 1.0;
  this.charisma = 1.0;
};

var TeamMemberNames = [
  "Alistair", "Andrew", "Ben", "Christopher", "Ciaran", "Gavin", "Godwill", "Haoyang", "Kieran", "Kirsty", "Michael",
  "Nathaniel", "Noe", "Stewart", "Blythe", "Conar", "Meebelo", "Neil", "Sam", "Adam", "Alexander", "Andrew", "Andrew",
  "Calum", "Connor", "Grant", "Jordan", "Karl", "Lyle", "Mateusz", "Nathan", "Nicholas", "Adam", "Alasdair", "Bartholomew",
  "Caelan", "Calum", "Conner", "Jack", "Jeremy", "Kimon", "Kristian", "Louis", "Martin", "Marvin", "Matthew", "Matthew",
  "Nikolaos", "Romans", "Ross", "Ruairi", "Ryan", "Steven", "Tomasz", "Valentina", "Brian", "Liam", "King", "Callan", "Ash", "Neil's Mum"
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
  { name: "Sofa", description: "Chillout", travelTime: 2, stress: -2.0, energy: 2.0, drunk: 0, bugs: 0, codeSize: 0, coolness: 0 },
  { name: "Computer", description: "Code", travelTime: 1, stress: -3.0, energy: -1.5, drunk: 0, bugs: 0.1, codeSize: 1.5, coolness: 0.01 },
  { name: "Whiteboard", description: "Plan", travelTime: 1, stress: 1.0, energy: -0.5, drunk: 0, bugs: 0, codeSize: 0.1, coolness: 0.5 },
  { name: "Conference room", description: "Practise Presentation", travelTime: 2, stress: 2.0, energy: -1.0, drunk: 0, bugs: 0, codeSize: 0, coolness: 0.1 },
  { name: "Test Area", description: "QA", travelTime: 1, stress: 1.0, energy: -1.0, drunk: 0, bugs: -0.1, codeSize: 0, coolness: 0.1 },
  { name: "Smoking Area", description: "420 blazeit", travelTime: 3, stress: -5.0, energy: 0, drunk: 0.5, bugs: 0, codeSize: 0, coolness: 0.25 },
  { name: "Pub", description: "Forget Troubles", travelTime: 10, stress: -2.0, energy: 0, drunk: 3.0, bugs: 0, codeSize: 0, coolness: 0.1 },
  { name: "Shop", description: "Get Food", travelTime: 5, stress: -0.5, energy: 1.0, drunk: 0.1, bugs: 0, codeSize: 0, coolness: 0 },
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