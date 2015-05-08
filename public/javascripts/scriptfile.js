"use strict";

////////////////////////set up global arrays/variables//////////////////////////
////////////////////////////////////////////////////////////////////////////////

// produce array with all produce objects in database, stored in JSON
var produceArray = [];

// month object constructor
var Month = function(name){
    this.name = name;
    this.image_address = "images/months/" + name +".png";
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
var produce_image_array = populate_array_incrementally("produce_", 20);

//set initial month displayed
var month_address = 3;

//set current month element as current month
var current_month = document.getElementById("month_image");

//get current month name?
var month_name = document.getElementById("month_name");

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

function set_current_month(){
	current_month.value = months[month_address].name;
	current_month.src = months[month_address].image_address;
	current_month.alt = months[month_address].name + " image";
	month_name.innerHTML = months[month_address].name;
	display_produce(month_address);
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
        // Set and display current month
        set_current_month();    
    });
}

function getProduceObject(produceId){
    for(var i=0; i<produceArray.length; i++){
        if(produceId == produceArray[i].id){
            return produceArray[i];
        }
    }
}

function make_visible(element){

	var current_class_value = element.className;

	if(hasClass(element, "hidden")){
		removeClass(element, "hidden");
	}
}

function make_invisible(element){
	addClass(element, "hidden");
	current_month.visible = false;		
}


function display_produce(month_address){

	current_month.visible = true;
    var currentMonthProduce = months[month_address].produce;

	for (var i=0; i<currentMonthProduce.length; i++) {
        console.log(currentProduceImage);
		currentProduceImage = document.getElementById(produce_image_array[i]);
		currentProduceImage.src ="images/produce/" + currentMonthProduce[i].image_url;
		currentProduceImage.value = currentMonthProduce[i].description;
		make_visible(currentProduceImage);
	}
}

function make_produce_invisible(month_address){
	for (var i=0; i<months[month_address].produce.length; i++) {
		currentProduceImage = document.getElementById(produce_image_array[i]);
		currentProduceImage.src = months[month_address].produce[i].image_address;
		make_invisible(currentProduceImage);
	}
}

function create_produce_objects(){
	for (var i = 0; i < produceArray.length; i++) {
		var current_fruit = produceArray[i];
		window[current_fruit] = new Fruit(current_fruit);
	}
}

function update_previous_month(){
	if(month_address > 0){
		if(current_month.visible === true){
			make_produce_invisible(month_address);
		}
		month_address--;
		display_produce(month_address);
		fadeOut(current_month);
		set_current_month();
		current_month.src = months[month_address].image_address;
		setTimeout(function(){
			fadeIn(current_month);}, 300);
	}
}


function update_next_month(){
	if(month_address < 11){
		if(current_month.visible === true){
			make_produce_invisible(month_address);
		}
		month_address++;
		display_produce(month_address);
		fadeOut(current_month);
		set_current_month();
		current_month.src = months[month_address].image_address;
		setTimeout(function(){
			fadeIn(current_month);}, 300);
	}
}

function display_produce_description(index){

	if(index.target !== index.currentTarget){
		var description = index.target.value;
		var modal_content = document.getElementById("description");
		var image = document.getElementById("fruit_image");

        modal_content.innerHTML = description;
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
document.getElementById("previous_btn").addEventListener("click", update_previous_month, false);

//Next button click
document.getElementById("next_btn").addEventListener("click", update_next_month, false);

//Produce images click
document.getElementById("produce_display_1").addEventListener("click", display_produce_description, false);
document.getElementById("produce_display_2").addEventListener("click", display_produce_description, false);
document.getElementById("produce_display_3").addEventListener("click", display_produce_description, false);


