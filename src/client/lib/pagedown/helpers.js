Handlebars.registerHelper('pagedown', function(options) {
	var converter = new Markdown.Converter ();
	var contents = options.fn(this);
	return new Handlebars.SafeString(converter.makeHtml(contents || ''));
});
