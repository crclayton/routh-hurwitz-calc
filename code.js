
var editor = CodeMirror.fromTextArea(document.getElementById("input"), {
	lineNumbers: true
});
// execute the placeholder input 
$(document).ready(function () {
	execute_python();
});

//perpetually update the output
editor.on("change", function () {
	execute_python();
});

// executes python using skulpt
function execute_python() {
	   var prog = window.editor.getValue();
	   prog += "\n" + document.getElementById("python_code").value;

	   var output = document.getElementById("output");
	   output.innerHTML = "";
	   Sk.pre = "output";
	   Sk.configure({ output: outf, read: builtinRead });
	   try {
		eval(Sk.importMainWithBody("<stdin>", false, prog));
	   }
	   catch (e) {
		output = document.getElementById("output");
		output.innerHTML = output.innerHTML + e.toString();
	}
}

function outf(text) {
	var output = document.getElementById("output");
	output.innerHTML = output.innerHTML + text;
}

function builtinRead(x) {
	if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
		throw "File not found: '" + x + "'";
	return Sk.builtinFiles["files"][x];
}