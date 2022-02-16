function previewFile(){
	const [file] = document.querySelector('input[type=file]').files;
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
		reader.readAsText(file);
		loadjscssfile(file.name.split('.')[0] + ".css", "css");
	}
}