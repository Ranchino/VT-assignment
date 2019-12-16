"use strict";
console.log("Script");
function switchInputText() {
    let inputFrom = document.getElementById("inputFrom").value;
    let inputTo = document.getElementById("inputTo").value;
    if (inputFrom == "" || inputTo == "") {
        alert("fyll in alla fält");
    }
    else {
        document.getElementById("inputFrom").value = inputTo;
        document.getElementById("inputTo").value = inputFrom;
    }
}
window.onload = function () {
    document.getElementById('switchInputText').addEventListener('click', switchInputText, true);
};
