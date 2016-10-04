function TableTemplate() {

}

TableTemplate.fillIn = function(id, dict, columnName) {
	var tableElem = document.getElementById(id);
	var headerElem = tableElem.rows.item(0);


	var match = false;
	var colNum;
	var numCols = headerElem.cells.length;
	for (var j = 0; j < numCols; j++) {
		var currColName = headerElem.cells.item(j).innerHTML;
		var template = new Cs142TemplateProcessor(currColName);
		var filledCurrColName = template.fillIn(dict);
		if (filledCurrColName === columnName) {
			match = true;
			colNum = j;
		}
		headerElem.cells.item(j).innerHTML = filledCurrColName;
	}

	var numRows = tableElem.rows.length;

	if (!columnName) {
		for (var i = 1; i < numRows; i++) {
			for (var j = 0; j < numCols; j++) {
				var currCell = tableElem.rows.item(i).cells.item(j);
				var template = new Cs142TemplateProcessor(currCell.innerHTML);
				var filledCurrCell = template.fillIn(dict);
				currCell.innerHTML = filledCurrCell;
			}
		}
		return;
	}

	if (match === false) {
		return;
	}

	if (columnName) {
		for (var i = 1; i < numRows; i++) {
			var currCell = tableElem.rows.item(i).cells.item(colNum);
			var template = new Cs142TemplateProcessor(currCell.innerHTML);
			var filledCurrCell = template.fillIn(dict);
			currCell.innerHTML = filledCurrCell;
		}
		return;
	}

}