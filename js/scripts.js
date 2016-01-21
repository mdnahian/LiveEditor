
$(document).ready(function () {
	$("#editor").keydown(function(e) {
	    if(e.keyCode === 9) { // tab was pressed

	        // get caret position/selection
	        var start = this.selectionStart;
	        var end = this.selectionEnd;

	        var $this = $(this);

	        // set textarea value to: text before caret + tab + text after caret
	        // $this.html($this.html().substring(0, start)
	        //             + ""
	        //             + $this.html().substring(end));

	        // put caret at right position again
	        this.selectionStart = this.selectionEnd = start + 1;

	        // prevent the focus lose
	        return false;
	    }
	});
});


function toggleFolder(triangle, files){
	$(files).slideToggle('fast');
	$(triangle).toggleClass('triangle-right');
	$(triangle).toggleClass('triangle-down');
}

function keyPressed(text){

	var editorHeight = document.getElementById('editor').clientHeight;
	var lines = (editorHeight/18)-1;

	var numbers = "";

	for(var i = 1; i<lines; i++){
		var number = i+"<br>";
		numbers += number;
	}

	document.getElementById("numbers").innerHTML = numbers;

}

function openTab(tab){

	tabTitle = tab;
	tab = tab.replace(/\s/g,'');

	var numOfFiles = document.getElementsByClassName('file').length;
	var numOfOpenTabs = document.getElementsByClassName('open-tab').length;

	if(document.getElementById(tab) == null){
		loadPage(tabTitle);

		document.getElementById("loading").style.display = "block";

		setTimeout(function(){
			if(document.getElementById(tab+"Tab") == null){
				document.getElementById('openTabs').innerHTML += openTabs + "<li id='"+tab+"Tab' class='open-tab tab-active' style='left:"+(numOfOpenTabs*170)+"px;'><div class='close-tab'><a onclick=\"closeTab('"+tab+"', '"+tab+"')\">x</a></div><a onclick=\"openTab('"+tab+"')\"><div class='tab' contenteditable='true'>"+tabTitle+"</div></a></li>";
			}

			for(var i=0; i<numOfOpenTabs; i++){
				document.getElementsByClassName('open-tab')[i].className = "open-tab";
			}

			document.getElementById(tab+"Tab").className = "open-tab tab-active";

			for(var i=0; i<numOfFiles; i++){
				document.getElementsByClassName('file')[i].className = "file";
			}

			document.getElementById(tab+"File").className = "file file-active";

			var numOfTextFiles = document.getElementsByClassName('text-file').length;

			for(var i=0; i<numOfTextFiles; i++){
				document.getElementsByClassName('text-file')[i].className = "text-file hidden";
			}

			console.log(tab);
			document.getElementById(tab).className = 'text-file';
			keyPressed(document.getElementById('editor').innerHTML);

			document.getElementById("loading").style.display = "none";

		},1000);
	
	} else{

		if(document.getElementById(tab+"Tab") == null){
			document.getElementById('openTabs').innerHTML += openTabs + "<li id='"+tab+"Tab' class='open-tab tab-active' style='left:"+(numOfOpenTabs*170)+"px;'><div class='close-tab'><a onclick=\"closeTab('"+tab+"', '"+tab+"')\">x</a></div><a onclick=\"openTab('"+tab+"')\"><div class='tab' contenteditable='true'>"+tabTitle+"</div></a></li>";
		}

		for(var i=0; i<numOfOpenTabs; i++){
			document.getElementsByClassName('open-tab')[i].className = "open-tab";
		}

		document.getElementById(tab+"Tab").className = "open-tab tab-active";

		for(var i=0; i<numOfFiles; i++){
			document.getElementsByClassName('file')[i].className = "file";
		}

		//document.getElementById(tab+"File").className = "file file-active";

		var numOfTextFiles = document.getElementsByClassName('text-file').length;

		for(var i=0; i<numOfTextFiles; i++){
			document.getElementsByClassName('text-file')[i].className = "text-file hidden";
		}

		console.log(tab);
		document.getElementById(tab).className = 'text-file';
		keyPressed(document.getElementById('editor').innerHTML);
	}

}

function closeTab(tab){
	tab = tab.replace(/\s/g,'');

	if(document.getElementById(tab+"Tab") != null){

		var className = document.getElementById(tab+"Tab").className;
		
		document.getElementById(tab+"Tab").parentNode.removeChild(document.getElementById(tab+"Tab"));
		
		var numOfOpenTabs = document.getElementsByClassName('open-tab').length;
		for(var i=0; i<numOfOpenTabs; i++){
			document.getElementsByClassName('open-tab')[i].style.left = (i*170)+"px";
		}

		if(numOfOpenTabs == 0){
			document.getElementById("openTabs").innerHTML = "";

			var numOfTextFiles = document.getElementsByClassName('text-file').length;

			for(var i=0; i<numOfTextFiles; i++){
				document.getElementsByClassName('text-file')[i].className = "hidden text-file";
			}

			var numOfFiles = document.getElementsByClassName('file').length;
			for(var i=0; i<numOfFiles; i++){
				document.getElementsByClassName('file')[i].className = "file";
			}

			document.getElementById("editor").innerHTML = "";
			keyPressed(document.getElementById('editor').innerHTML);

		} else{
			if(className == "open-tab tab-active"){
				openTab(document.getElementsByClassName('open-tab')[numOfOpenTabs-1].id.replace('Tab', ''));
			}
		}

	}
}

function createNewFile(folder, file){
	document.getElementById("editor").innerHTML = "<div id='"+file+"'>Type Here...</div>";
	//document.getElementById(folder).innerHTML += "<li id='"+file+"File' class='file'><a onclick=\"$(this).click(function() { return false; }).dblclick(function() { openTab('"+file+"'); return false; });\"><span class='triangle transparent'>&#9660;</span> "+file+"</a></li>";
	openTab(file);
	closeDropdown();
}

function deleteFile(folder, file){

}

function loadPage(page){
	if (window.XMLHttpRequest) {
    	// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("editor").innerHTML += xmlhttp.responseText;
    	}
    }
    xmlhttp.open("GET","tools/load-text.php?page="+page,true);
    xmlhttp.send();
}

function dropdown(menu, left){
	
	var numOfDropdowns = document.getElementsByClassName('dropdown').length;
	
	for(var i=0; i<numOfDropdowns; i++){
		if(document.getElementById(menu) != document.getElementsByClassName('dropdown')[i]){
			document.getElementsByClassName('dropdown')[i].style.display = "none";
		}
	}
	
	document.getElementById(menu).style.left = left;
	
	$("#"+menu).slideToggle('fast');

}

function closeDropdown(){
	var numOfDropdowns = document.getElementsByClassName('dropdown').length;
	for(var i=0; i<numOfDropdowns; i++){
		document.getElementsByClassName('dropdown')[i].className = "dropdown hidden";
		document.getElementsByClassName('dropdown')[i].style.display = "none";
	}
}

function saveFile(){
	var numOfOpenTabs = document.getElementsByClassName('open-tab').length;
	var fileToSave = "";
	for(var i=0; i<numOfOpenTabs; i++){
		if(document.getElementsByClassName('open-tab')[i].className === "open-tab tab-active"){
			fileToSave = document.getElementsByClassName('open-tab')[i].id.replace("Tab", "");
		}
	}
	
	if(fileToSave !== ""){
		var fileContent = document.getElementById(fileToSave).innerHTML;
	
		if (window.XMLHttpRequest) {
	    	// code for IE7+, Firefox, Chrome, Opera, Safari
	        xmlhttp = new XMLHttpRequest();
	    } else {
	        // code for IE6, IE5
	        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	    }
	    xmlhttp.onreadystatechange = function() {
	        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	            if(xmlhttp.responseText == ""){
	            	console.log("Could not save file.");
	            } else{
	            	console.log(xmlhttp.responseText);
	            }
	    	}
	    }
	    xmlhttp.open("POST","tools/save-file.php?name="+fileToSave+"&content="+fileContent,true);
	    xmlhttp.send();
	}
}

function loadFiles(folder){
	
}

