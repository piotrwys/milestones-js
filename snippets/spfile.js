function spFileLoad (serverRelativeUrlOfMyFile) {
	var req = new XMLHttpRequest();
	req.onreadystatechange=handler;
	req.open("GET", serverRelativeUrlOfMyFile, true); // params: (method, url, async)
	req.send();
		
	function handler(){
		if(req.readyState == 4 && req.status == 200){
			var text = req.responseText;
			text=text.replace("\r","");
			if (text.slice(-1) == "\n") {
				text=text.slice(0,-1);
			};
			const data = csvToArray(text);
			new Timelines('timelines', "1/2022", "12/2022", data);
		};
	};
};