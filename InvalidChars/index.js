var listen = true;
sublime.E.on('modified', function(view){
	if(listen){
		view.run_command('js_invalid_chars');
	}
});

defineCommand('JsInvalidChars', function(view, edit){
	listen = false;
	var ws = "\u000B\u000C\u000D\u200B\u200C\u200D\u2060\uFEFF";

	ws = ws.split('').join('|');

	var regions = JSArray(view.find_all(ws));

	if(regions && regions.length){
		//console.log(regions);
		for(var i =  regions.length - 1; i >=0; i--){
			var region = regions[i];
			view.replace(edit, region, '?');
		}
		view.add_regions('HighlightInvalidChars',
			regions,
			'invalid',
			'',
			sublime.HIDE_ON_MINIMAP);
	}
	setTimeout(function(){
		listen = true;
	}, 500);
});
