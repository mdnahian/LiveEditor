
var temp = "";


function keyPressed(file){

	var text = file.innerHTML;

	var editorHeight = document.getElementById('editor').clientHeight;
	var lines = (editorHeight/19)-1;

	var numbers = "";

	for(var i = 1; i<lines; i++){
		var number = "<div>"+i+"</div>";
		numbers += number;
	}

	document.getElementById("numbers").innerHTML = numbers;


	$(file).keydown(function(e) {
	    if (e.keyCode === 9) { // tab key
	        e.preventDefault();  // this will prevent us from tabbing out of the editor

	       // // get caret position/selection
 	       //  var start = file.selectionStart;
 	       //  var end = file.selectionEnd;
 
 	       //  // set textarea value to: text before caret + tab + text after caret
 	       //  console.log(file.innerHTML.substring(0, start));
 	       //  console.log(file.innerHTML.substring(end));
 	       //  var tabed = file.innerHTML.substring(0, start) + "\t" + file.innerHTML.substring(end);

 	       //  file.innerHTML = tabed;
 
 	       //  // put caret at right position again
 	       //  file.selectionStart = file.selectionEnd = start + 1;
 
 	       //  // prevent the focus lose
 	       //  return false;

	    }
	});

}


function openTab(tab){

	tabTitle = tab;
	tab = tab.replace(/\s/g,'');

	var numOfFiles = document.getElementsByClassName('file').length;
	var numOfOpenTabs = document.getElementsByClassName('open-tab').length;

	if(typeof($('*[data-tab="'+tab+'"]').html()) === "undefined"){
		
		document.getElementById("loading").style.display = "block";

		setTimeout(function(){
			if(typeof($('*[data-tab="'+tab+'"]').html()) === "undefined"){
				document.getElementById('openTabs').innerHTML += openTabs + "<li data-tab='"+tab+"' class='open-tab tab-active' style='left:"+(numOfOpenTabs*170)+"px;'><div class='close-tab'><a data-tab-close='"+tab+"' onclick=\"closeTab('"+tab+"', '"+tab+"')\">x</a></div><a data-tab-open='"+tab+"' onclick=\"openTab('"+tab+"')\"><div class='tab' onfocus='tempName(this.innerHTML)' onfocusout='renameFile(this)' contenteditable='true'>"+tabTitle+"</div></a></li>";
			}

			for(var i=0; i<numOfOpenTabs; i++){
				document.getElementsByClassName('open-tab')[i].className = "open-tab";
			}

			$('*[data-tab="'+tab+'"]').attr("class", "open-tab tab-active");

			for(var i=0; i<numOfFiles; i++){
				document.getElementsByClassName('file')[i].className = "file";
			}

			//document.getElementById(tab+"File").className = "file file-active";

			var numOfTextFiles = document.getElementsByClassName('text-file').length;

			for(var i=0; i<numOfTextFiles; i++){
				document.getElementsByClassName('text-file')[i].className = "text-file hidden";
			}

			$('*[data-file="'+tab+'"]').attr("class", "text-file");
			keyPressed(document.getElementById('editor').innerHTML);

			document.getElementById("loading").style.display = "none";

		}, 1);
	
	} else{

		if(typeof($('*[data-tab="'+tab+'"]').html()) === "undefined"){
			document.getElementById('openTabs').innerHTML += openTabs + "<li data-tab='"+tab+"Tab' class='open-tab tab-active' style='left:"+(numOfOpenTabs*170)+"px;'><div class='close-tab'><a data-tab-close='"+tab+"' onclick=\"closeTab('"+tab+"', '"+tab+"')\">x</a></div><a data-tab-open='"+tab+"' onclick=\"openTab('"+tab+"')\"><div class='tab' onfocus='tempName(this.innerHTML)' onfocusout='renameFile(this)' contenteditable='true'>"+tabTitle+"</div></a></li>";
		}

		for(var i=0; i<numOfOpenTabs; i++){
			document.getElementsByClassName('open-tab')[i].className = "open-tab";
		}

		$('*[data-tab="'+tab+'"]').attr("class", "open-tab tab-active");

		for(var i=0; i<numOfFiles; i++){
			document.getElementsByClassName('file')[i].className = "file";
		}

		//document.getElementById(tab+"File").className = "file file-active";

		var numOfTextFiles = document.getElementsByClassName('text-file').length;

		for(var i=0; i<numOfTextFiles; i++){
			document.getElementsByClassName('text-file')[i].className = "text-file hidden";
		}

		$('*[data-file="'+tab+'"]').attr("class", "text-file");
		keyPressed(document.getElementById('editor').innerHTML);
	}
 


}

function closeTab(tab){
	tab = tab.replace(/\s/g,'');

	if(typeof($('*[data-tab="'+tab+'"]').html()) !== "undefined"){

		var className = $('*[data-tab="'+tab+'"]').attr("class");
		
		$('[data-tab="'+tab+'"]').remove();

		$('*[data-file="'+tab+'"]').remove();
		
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

	if(typeof($('*[data-file="'+file+'"]').html()) === "undefined"){
		document.getElementById("editor").innerHTML += "<div data-file='"+file+"' contenteditable='true' onkeyup=\"keyPressed(this)\" spellcheck='false'>Type Here...</div>";
		openTab(file);
	} else{
		console.log('File Already Exists');
	}

	closeDropdown();
}


function dropdown(menu, left){
	
	var numOfDropdowns = document.getElementsByClassName('dropdown').length;
	
	for(var i=0; i<numOfDropdowns; i++){
		if(document.getElementById(menu) != document.getElementsByClassName('dropdown')[i]){
			document.getElementsByClassName('dropdown')[i].style.display = "none";
		}
	}
	
	document.getElementById(menu).style.left = left;
	
	$("#"+menu).slideToggle(1);

}


function closeDropdown(){
	var numOfDropdowns = document.getElementsByClassName('dropdown').length;
	for(var i=0; i<numOfDropdowns; i++){
		document.getElementsByClassName('dropdown')[i].className = "dropdown hidden";
		document.getElementsByClassName('dropdown')[i].style.display = "none";
	}
}


function tempName(name){
	temp = name;
}

function renameFile(file){
	var oldTab = temp+"Editable";

	$('*[data-tab-close="'+temp+'"]').attr("onclick", "closeTab('"+file.innerHTML+"', '"+file.innerHTML+"')");
	$('*[data-tab-close="'+temp+'"]').attr("data-tab-close", file.innerHTML);

	$('*[data-tab-open="'+temp+'"]').attr("onclick", "openTab('"+file.innerHTML+"')");
	$('*[data-tab-open="'+temp+'"]').attr("data-tab-open", file.innerHTML);

	$('*[data-tab="'+temp+'"]').attr("data-tab", file.innerHTML);

	$('*[data-file="'+temp+'"]').attr("data-file", file.innerHTML)

	temp = "";
}

function run(){
	
}