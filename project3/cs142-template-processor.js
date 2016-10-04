function Cs142TemplateProcessor(template) {
	this.template = template;
}

Cs142TemplateProcessor.prototype.fillIn = function(dictionary) {
	var res = this.template;
	var re = /{{[^{]*}}/g;
	var match = this.template.match(re);
	var pre, key, after;
	for (var i = 0; i < match.length; i++) {
		pre = match[i];
		key = pre.replace("{{", "");
		key = key.replace("}}", "");
		after = dictionary[key] || '';
		// if (after === undefined) {
		// 	after = '';
		// }

		res = res.replace(pre, after);
	}
	return res;
}