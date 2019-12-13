console.log("Script");


/* (function () {
    function switchInputText(){
        console.log("Inne i funktionen");
        let inputFrom = (<HTMLInputElement>document.getElementById("inputFrom"));
        let inputTo = (<HTMLInputElement>document.getElementById("inputTo"));

        if(inputFrom.value == "" || inputTo.value == ""){
            alert("fyll in alla fält");
        }else{
            inputFrom.innerHTML = inputTo.value;
            inputTo.innerHTML = inputFrom.value;
        }
        
    }

    (<HTMLInputElement>document.getElementById('switchInputText')).addEventListener('click', switchInputText, true);
})(); */

class inputChange {
    constructor() {

        (<HTMLInputElement>document.getElementById("switchInputText")).addEventListener("click", (e:Event) => this.switchInputText());
    }
    switchInputText(){
        let inputFrom = (<HTMLInputElement>document.getElementById("inputFrom"));
        let inputTo = (<HTMLInputElement>document.getElementById("inputTo"));

        if(inputFrom.value == "" || inputTo.value == ""){
            alert("fyll in alla fält");
        }else{
            inputFrom.innerHTML = inputTo.value;
            inputTo.innerHTML = inputFrom.value;
        }
    }
}

new inputChange