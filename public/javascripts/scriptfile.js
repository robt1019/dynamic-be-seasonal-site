"use strict";

////////////////////////set up global arrays/variables//////////////////////////
////////////////////////////////////////////////////////////////////////////////

// produce array with all produce objects in database, stored in JSON
var produceArray = [];

// month object constructor
var Month = function(name){
    this.name = name;
    this.imageAddress = "images/months/" + name +".png";
    this.visible = false;
    this.produce = [];
}

// Instantiate month objects
var January = new Month("January");
var February = new Month("February");
var March = new Month("March");
var April = new Month("April");
var May = new Month("May");
var June = new Month("June");
var July = new Month("July");
var August = new Month("August");
var September = new Month("September");
var October = new Month("October");
var November = new Month("November");
var December = new Month("December");

//create array of month objects
var months = [January, February, March, April, May,
June, July, August, September, October, November, December];

//populate produce image array in html document
var produceImageArray = null;

//set initial month displayed
var monthAddress = 3;

//set current month element as current month
var currentMonth = document.getElementById("month_image");

//get current month name?
var monthName = document.getElementById("month_name");

var currentProduceImage = null;

var description_image = document.getElementById("description_image");

////////////////////////////// DOM ready ///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
    populateProduceArray();
    populateMonthsProduce();
})

/////////////////////////////////Functions//////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function populate_array_incrementally(string, size){
	var array = new Array(produceArray.length);
	for(var i=0; i<size; i++){
		array[i] = string + (i+1);
	}
	return array;
}

function setCurrentMonth(){
	currentMonth.value = months[monthAddress].name;
	currentMonth.src = months[monthAddress].imageAddress;
	currentMonth.alt = months[monthAddress].name + " image";
	monthName.innerHTML = months[monthAddress].name;
	displayProduce(monthAddress);
}

////////////////////////////////////////////////////////////////////////////////
/////////////////////////3 functions Taken from Google//////////////////////////


function hasClass(element, class_name){
	var classExpression = new RegExp(" " + class_name + " ");
    return classExpression.test(" " + element.className + " ");
}

function addClass(element, class_name){
    if(!hasClass(element, class_name)){
        element.className += " " + class_name;
    }
}

function removeClass(element, className) {
    var newClass = ' ' + element.className.replace( /[\t\r\n]/g, ' ') + ' ';
    if(hasClass(element, className)) {
        while (newClass.indexOf(' ' + className + ' ') >= 0){
            newClass = newClass.replace(' ' + className + ' ', ' ');
        }
        element.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}

/////////////////////////////// Functions //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// Fill produceArray with produce data from sql database
function populateProduceArray(){

    // Get list of produce as a JSON object by calling GET produce_list route
    $.getJSON('/produce_list', function(produce){

        // For each item in the JSON, add it to the produce array
        $.each(produce, function(){
            produceArray.push(this);
        });
    });
};

// Populate each month's produce array field based on months table.
function populateMonthsProduce(){

    var monthName = null;
    var produceId = null;
    var produceObject = null;

    $.getJSON('/months_list', function(row){

        $.each(row, function(){
            monthName = this.name;
            produceId = this.produce_id;

            for(var i=0; i<months.length; i++){
                if(monthName == months[i].name){
                    produceObject = getProduceObject(produceId);
                    months[i].produce.push(produceObject);
                }
            }
        });
        // populate image array
        produceImageArray = populate_array_incrementally("produce_", produceArray.length);
        // Set and display current month
        setCurrentMonth();
    });
}

function getProduceObject(produceId){
    for(var i=0; i<produceArray.length; i++){
        if(produceId == produceArray[i].id){
            return produceArray[i];
        }
    }
}

function makeVisible(element){

	var currentClassValue = element.className;

	if(hasClass(element, "hidden")){
		removeClass(element, "hidden");
	}
}

function makeInvisible(element){
	addClass(element, "hidden");
	currentMonth.visible = false;		
}


function displayProduce(monthAddress){

	currentMonth.visible = true;
    var currentMonthProduce = months[monthAddress].produce;

	for (var i=0; i<currentMonthProduce.length-1; i++) {
		currentProduceImage = document.getElementById(produceImageArray[i]);
		currentProduceImage.src = "images/produce/" + currentMonthProduce[i].image_url;
        currentProduceImage.name = currentMonthProduce[i].name;
		currentProduceImage.value = currentMonthProduce[i].description;
		makeVisible(currentProduceImage);
	}
}

function makeProduceInvisible(monthAddress){
	for (var i=0; i<months[monthAddress].produce.length; i++) {
		currentProduceImage = document.getElementById(produceImageArray[i]);
		makeInvisible(currentProduceImage);
	}
}

function createProduceObjects(){
	for (var i = 0; i < produceArray.length; i++) {
		var current_fruit = produceArray[i];
		window[current_fruit] = new Fruit(current_fruit);
	}
}

function updatePreviousMonth(){
	if(monthAddress > 0){
		if(currentMonth.visible === true){
			makeProduceInvisible(monthAddress);
		}
		monthAddress--;
		fadeOut(currentMonth);
		setCurrentMonth();
		currentMonth.src = months[monthAddress].imageAddress;
		setTimeout(function(){
			fadeIn(currentMonth);}, 300);
	}
}


function updateNextMonth(){
	if(monthAddress < 11){
		if(currentMonth.visible === true){
			makeProduceInvisible(monthAddress);
		}
		monthAddress++;
		fadeOut(currentMonth);
		setCurrentMonth();
		currentMonth.src = months[monthAddress].imageAddress;
		setTimeout(function(){
			fadeIn(currentMonth);}, 300);
	}
}

function displayproduceDescription(index){

	if(index.target !== index.currentTarget){
		var description = index.target.value;
		var modalContent = document.getElementById("description");
        var modalHeader = document.getElementById("modal_name")
		var image = document.getElementById("fruit_image");

        modalContent.innerHTML = description;
        modalHeader.innerHTML = index.target.name;
        image.src = index.target.src;
        $('#produce_modal').modal('show');
	}
}

function fadeOut(element) {
        var opacity = 0.01;
        element.style.opacity = opacity;
    }

function fadeIn(element) {
        var opacity = 1;
        element.style.opacity = opacity;
    }

///////////////////////////event listeners//////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

//Previous button click
document.getElementById("previous_btn").addEventListener("click", updatePreviousMonth, false);

//Next button click
document.getElementById("next_btn").addEventListener("click", updateNextMonth, false);

//Produce images click
document.getElementById("produce_display_1").addEventListener("click", displayproduceDescription, false);
document.getElementById("produce_display_2").addEventListener("click", displayproduceDescription, false);
document.getElementById("produce_display_3").addEventListener("click", displayproduceDescription, false);


