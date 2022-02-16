function getCSVFile(){
	const [file] = document.querySelector('#CSVfile').files;
	const reader = new FileReader();

	reader.addEventListener("load", () => {
		var text = reader.result;
		text=text.replace("\r","");
		if (text.slice(-1) == "\n") {
			text=text.slice(0,-1);
		};
		const data = csvToArray(text);
		new Timelines('timelines', "1/2022", "12/2022", data);		
	}, false);

	if (file) {
		document.querySelector('#CSVfilename').innerHTML = file.name;
		reader.readAsText(file);
	}
}

function getCSSFile() {
	const [file] = document.querySelector('#CSSfile').files;
	const reader = new FileReader();
	
	reader.addEventListener("load", () => {
		var text = reader.result;
		const style = document.createElement('style');
		console.log(style);
		style.innerHTML = text;
		document.head.appendChild(style);
	}, false);
	
	if (file) {
		document.querySelector('#CSSfilename').innerHTML = file.name;
		reader.readAsText(file);	
	}
	
}