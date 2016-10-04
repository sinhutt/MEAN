function cs142MakeMultiFilter(array) {
	var originalArray = array;
	var currentArray = array;
	function arrayFilterer(filter, callback) {
		// if (filter === undefined) {
		if (!filter) {
			return currentArray;
		}
		currentArray = currentArray.filter(filter);
		// if (callback !== undefined) {
		if (callback) {
			// callback.call(this, parameters...);
			callback.call(originalArray, currentArray);
		}
		return arrayFilterer;
	}
	return arrayFilterer;
}
