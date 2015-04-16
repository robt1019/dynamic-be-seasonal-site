"use strict";

///////////////////////////Produce Objects//////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

//fruit class/constructor
var Fruit = function(name){
	this.name = name;
	this.image_address = "images/produce/" + name + ".png";
	this.visible = false;
	this.description = name + ": Produce Description...";
}

//all produce objects to be featured in website. Can be added to/edited easily
var produce_array = ["apple", "apricot", "banana", "blackberry", "blackcurrants", 
"bramleyApple", "cherry", "clementine", "cranberry", "damson", "date",
"fig", "gooseberry", "grapefruit", "lemon", "nectarine", "orange", "peach",
"pear", "plum", "pomegranate", "quince", "raspberry", "redcurrant", "rhubarb",	
"strawberry", "tomato", "watermelon", "asparagus", "aubergine", "basil",
"beetroot", "broccoli", "brusselsSprouts", "cabbage", "carrot", "cauliflower",
"cavoloNero", "celeriac", "celery", "chicory", "courgette", "courgetteFlower",
"fennelBulb", "garlic", "globeArtichoke", "jerusalemArtichoke", "kale", "kohlrabi",
"lambsLettuce", "leek", "lettuce", "marrow", "newPotatoes", "pakChoi", "parsnip",
"peas", "pepper", "potato", "pumpkin", "purpleSproutingBroccoli", "radicchio",
"radish", "runnerBean", "salsify", "samphire", "spinach", "springGreens", "swede",
"sweetPotato", "sweetCorn", "swissChard", "turnip", "watercress"];

//create produce objects based on produce array
create_produce_objects(produce_array);

apple.description = "Apple: Available all year round";
apricot.description = "Apricot: The British apricot season is from May to September";
banana.description = "Banana: Available all year round";
blackberry.description = "Blackberry: Available end of July through to mid October";
blackcurrants.description = "Blackcurrants: At their peak in June and July. You can buy frozen blackcurrants year-round.";

//remaining produce descriptions have not been included due to time constraints

////////////////////////////////Month objects///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

//month class/constructor
var Month = function(name){
	this.name = name;
	this.image_address = "images/months/" + name +".png";
	this.visible = false;
}

//months

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

//set up individual monthly seasonal produce arrays

January.produce = [apple, banana, bramleyApple, watermelon, clementine, date,
grapefruit, lemon, orange, pear, pomegranate, rhubarb, beetroot,
brusselsSprouts, cabbage, cauliflower, celeriac, celery, chicory,
jerusalemArtichoke, kale, leek, pakChoi, parsnip, radicchio, salsify,
swede, sweetPotato, turnip];

February.produce = [apple, banana, bramleyApple, clementine, grapefruit,
lemon, orange, pomegranate, rhubarb, brusselsSprouts, cabbage, cauliflower,
celeriac, celery, chicory, jerusalemArtichoke, kale, leek, pakChoi, parsnip,
purpleSproutingBroccoli, radicchio, swede, sweetPotato, turnip];

March.produce = [banana, bramleyApple, grapefruit, lemon, orange,pomegranate, 
rhubarb, brusselsSprouts, cabbage, cauliflower, celeriac, chicory, 
jerusalemArtichoke, leek, pakChoi, parsnip, pepper, purpleSproutingBroccoli,
radicchio, sweetPotato];

April.produce = [banana, grapefruit, pomegranate, rhubarb, cabbage, cauliflower,
celeriac, newPotatoes, pakChoi, pepper, potato, purpleSproutingBroccoli, radicchio,
spinach, springGreens, watercress];

May.produce = [apricot, banana, grapefruit, nectarine, pomegranate, rhubarb,
cabbage, lambsLettuce, lettuce, newPotatoes, pakChoi, peas, pepper, potato,
radicchio, radish, spinach, springGreens, watercress];

June.produce = [apricot, banana, blackcurrants, gooseberry,
nectarine, pomegranate, rhubarb, strawberry, tomato, asparagus, aubergine,
cabbage, carrot, courgette, courgetteFlower, fennelBulb, globeArtichoke, 
lambsLettuce, lettuce, newPotatoes, pakChoi, peas, pepper, potato, radicchio,
radish, runnerBean, spinach, springGreens, watercress];

July.produce = [apricot, banana, blackcurrants, cherry, gooseberry,
nectarine, pomegranate, raspberry, redcurrant, strawberry, tomato, 
watermelon, asparagus, aubergine, basil, beetroot, cabbage, carrot,
cavoloNero, courgette, courgetteFlower, fennelBulb, garlic, globeArtichoke,
lambsLettuce, lettuce, newPotatoes, pakChoi, peas, pepper, potato,radicchio,
radish, runnerBean, samphire, spinach, swissChard, watercress];

August.produce = [apricot, banana, blackberry, fig, gooseberry,
nectarine, peach, pomegranate, raspberry, redcurrant, strawberry,
tomato, watermelon, aubergine, basil, beetroot, broccoli, cabbage, carrot,
cavoloNero, celery, courgette, courgetteFlower, fennelBulb, garlic, globeArtichoke,
kohlrabi, lambsLettuce, lettuce, marrow, pakChoi, peas, pepper, radicchio,
radish, runnerBean, samphire, spinach, swissChard, watercress];

September.produce = [apple, apricot, banana, blackberry, damson,
fig, gooseberry, nectarine, peach, pear, plum, pomegranate, raspberry,
redcurrant, strawberry, tomato, aubergine, beetroot, broccoli, cabbage, carrot,
cavoloNero, celeriac, celery, courgette, fennelBulb, garlic, globeArtichoke,
kohlrabi, lambsLettuce, leek, lettuce, marrow, pakChoi, parsnip, peas, pepper,
radicchio, radish, runnerBean, spinach, sweetCorn, swissChard, watercress];

October.produce = [apple, banana, blackberry, cranberry, fig, pear,
plum, pomegranate, quince, tomato, aubergine, beetroot, broccoli, brusselsSprouts,
cabbage, cavoloNero, celeriac, celery, garlic, globeArtichoke, kale, kohlrabi,
lambsLettuce, leek, lettuce, pakChoi, parsnip, peas, pepper, pumpkin, radicchio,
radish, runnerBean, salsify, sweetPotato, swissChard, turnip];

November.produce = [apple, banana, clementine, cranberry, date, pear,
pomegranate, quince, beetroot, brusselsSprouts, cabbage, celeriac, celery,
globeArtichoke, jerusalemArtichoke, kale, kohlrabi, lambsLettuce, leek, lettuce,
pakChoi, parsnip, peas, pumpkin, radicchio, runnerBean, salsify, swede, sweetPotato,
swissChard, turnip];

December.produce = [apple, banana, bramleyApple, clementine, cranberry,
date, grapefruit, pear, pomegranate, quince, beetroot, brusselsSprouts, cabbage,
celeriac, celery, jerusalemArtichoke, kale, leek, lettuce, pakChoi, parsnip, pumpkin,
radicchio, salsify, swede, sweetPotato, turnip];

/////////////////////////////////functions//////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function populate_array_incrementally(string, size){
	var array = new Array(produce_array.length);
	for(var i=0; i<size; i++){
		array[i] = string + (i+1);
	}
	return array;
}

function set_current_month(){
	current_month.innerHTML = month[month_address].name;
	current_month.src = month[month_address].image_address;
	current_month.alt = month[month_address].name + " image";
	month_name.innerHTML = month[month_address].name;
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

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

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

	for (var i=0; i<month[month_address].produce.length; i++) {
		current_produce_image = document.getElementById(produce_image_array[i]);
		current_produce_image.src = month[month_address].produce[i].image_address;
		current_produce_image.innerHTML = month[month_address].produce[i].description;
		make_visible(current_produce_image);
	}
}

function make_produce_invisible(month_address){
	for (var i=0; i<month[month_address].produce.length; i++) {
		current_produce_image = document.getElementById(produce_image_array[i]);
		current_produce_image.src = month[month_address].produce[i].image_address;
		make_invisible(current_produce_image);
	}
}

function create_produce_objects(){
	for (var i = 0; i < produce_array.length; i++) {
		var current_fruit = produce_array[i];
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
		current_month.src = month[month_address].image_address;
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
		current_month.src = month[month_address].image_address;
		setTimeout(function(){
			fadeIn(current_month);}, 300);
	}
}

function display_produce_description(index){

	if(index.target !== index.currentTarget){
		var description = index.target.innerHTML;
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


///////////////////////////////set up arrays/variables//////////////////////////
////////////////////////////////////////////////////////////////////////////////


//create array of month objects
var month = [January, February, March, April, May,
June, July, August, September, October, November, December];

//populate produce image array in html document
var produce_image_array = populate_array_incrementally("produce_", produce_array.length);

//set initial month displayed
var month_address = 3;

//set current month element as current month
var current_month = document.getElementById("month_image");

var month_name = document.getElementById("month_name");

var current_produce_image = null;

var description_image = document.getElementById("description_image");

//Sets initial month up to display on website on load
set_current_month();


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


