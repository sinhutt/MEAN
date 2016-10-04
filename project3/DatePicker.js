function DatePicker(id, callback) {
	this.id = id;
	this.callback = callback;
	this.months = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"];
	var date;
	if (date) {
		callback.call(this.id, this.date);
	}
}

DatePicker.prototype.render = function(newDate) {
	if (this.date !== newDate) {
		this.date = newDate;
		var elem = document.getElementById(this.id);
		if (!elem) {
			console.log("elem is null");
		}
		createDateMonth(this.months, this.date, elem, this.callback, this.id);
	}
}

function createDateMonth(months, date, elem, callback, id) {
	var tbl1 = document.createElement("table");
	tbl1.setAttribute("class", "tbl1");
	var tblBody1 = document.createElement("tbody");
	var row1 = document.createElement("tr");
	var textVals1 = ["", date.getFullYear(), ""];
	for (var i = 0; i < 3; i++) {
		var cell1 = document.createElement("td");
		var val1 = document.createTextNode(textVals1[i]);
		cell1.appendChild(val1);
		setClassAttribute(cell1, i);
		row1.appendChild(cell1);
	}
	row1.setAttribute("class", "row1");
	tblBody1.appendChild(row1);		

	var row2 = document.createElement("tr");
	var textVals2 = ["<", months[date.getMonth()], ">"];
	for (var j = 0; j < 3; j++) {
		var cell2 = document.createElement("td");
		var val2 = document.createTextNode(textVals2[j]);
		cell2.appendChild(val2);
		setClassAttribute(cell2, j);
		if (j == 0) {
			cell2.onclick = function() {prevMonth(this, elem, date, months, callback, id)};
		}
		if (j == 2) {
			cell2.onclick = function() {nextMonth(this, elem, date, months, callback, id)};
		}
		row2.appendChild(cell2);
	}
	tblBody1.appendChild(row2);
	tbl1.appendChild(tblBody1);
	elem.appendChild(tbl1);

	var tbl2 = document.createElement("table");
	tbl2.setAttribute("class", "tbl2");
	var tblBody2 = document.createElement("tbody");
	addWeekDays(tblBody2);
	tbl2.appendChild(tblBody2);
	elem.appendChild(tbl2);

	var tbl3 = document.createElement("table");
	tbl3.setAttribute("class", "tbl3");
	var tblBody3 = document.createElement("tbody");
	addAllDates(tblBody3, date, callback, id);
	tbl3.appendChild(tblBody3);
	elem.appendChild(tbl3);
}

function setClassAttribute(cell, i) {
	if (i === 0) {
		cell.setAttribute("class", "left");
	} else if (i == 1) {
		cell.setAttribute("class", "center");
	} else {
		cell.setAttribute("class", "right");
	}
}

function prevMonth(event, elem, date, months, callback, id) {
	if (!elem) {
		console.log("elem is null");
	}
	elem.innerHTML = "";
	if (date.getMonth() >= 1) {
		date.setMonth(date.getMonth() - 1);
	} else {
		date.setYear(date.getFullYear() - 1);
		date.setMonth(11);
	}
	createDateMonth(months, date, elem, callback, id);
}

function nextMonth(event, elem, date, months, callback, id) {
	if (!elem) {
		console.log("elem is null");
	}
	elem.innerHTML = "";
	if (date.getMonth() <= 10) {
		date.setMonth(date.getMonth() + 1);
	} else {
		date.setYear(date.getFullYear() + 1);
		date.setMonth(0);
	}
	createDateMonth(months, date, elem, callback, id);
}

function addWeekDays(tblBody2) {
	var row3 = document.createElement("tr");
	var textVals3 = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
	for (var i = 0; i < 7; i++) {
		var cell3 = document.createElement("td");
		var val3 = document.createTextNode(textVals3[i]);
		cell3.appendChild(val3);
		cell3.setAttribute("class", "center");
		row3.appendChild(cell3);
	}
	row3.setAttribute("class", "row3");
	tblBody2.appendChild(row3);		
}

function addAllDates(tblBody3, date, callback, id) {
	var numDaysOfMonth = getNumDays(date.getMonth() + 1, date);
	var startDayOfMonth = date.getDay();
	var row4 = document.createElement("tr");
	if (startDayOfMonth !== 0) {
		var numDaysOfPrevMonth = getNumDays(date.getMonth(), date);
		var startDateOfPrevMonth = numDaysOfPrevMonth - startDayOfMonth + 1;
		for (var i = 0; i < startDayOfMonth; i++) {
			var cell4 = document.createElement("td");
			var val4 = document.createTextNode(startDateOfPrevMonth + i);
			cell4.appendChild(val4);
			cell4.setAttribute("class", "gray");
			row4.appendChild(cell4);
		}
	}
	for (var i = startDayOfMonth; i < 7; i++) {
		var cell4 = createCell(id, date, 1 + i - startDayOfMonth, callback);
		row4.appendChild(cell4);
	}
	tblBody3.appendChild(row4);

	var curr = 7 - startDayOfMonth + 1;
	var day = 0;
	var row;
	while (curr <= numDaysOfMonth) {
		if (day === 0) {
			row = document.createElement("tr");
		}
		var cell = createCell(id, date, curr, callback);
		row.appendChild(cell);
		day++;
		curr++;
		if (day === 7) {
			tblBody3.appendChild(row);
			day = 0;
		}
	}

	if (day !== 0) {
		for (var i = day; i < 7; i++) {
			var cell = document.createElement("td");
			var val = document.createTextNode(i - day + 1);
			cell.appendChild(val);
			cell.setAttribute("class", "gray");
			row.appendChild(cell);
		}
		tblBody3.appendChild(row);
	}
	
}

function getNumDays(month, date) {
	if (month < 1) {
		month = 12;
	}
	if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8
		|| month === 10 || month === 12) {
		return 31;
	} else if (month === 4 || month === 6 || month === 9 || month === 11) {
		return 30;
	} else {
		var year = date.getFullYear();
		if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) {
			return 29;
		} 
		return 28;
	}
}

function createCell(id, date, val, callback) {
	var cell = document.createElement("td");
	cell.addEventListener("click", function() {
		clickDate(id, date, cell, callback);
	});
	var val = document.createTextNode(val);
	cell.appendChild(val);
	cell.setAttribute("class", "black");
	return cell;
}

function clickDate(id, date, cell, callback) {
	date.day = cell.firstChild.textContent;
	date.year = date.getFullYear();
	date.month = date.getMonth() + 1;
	callback.call(this, id, date);
}
