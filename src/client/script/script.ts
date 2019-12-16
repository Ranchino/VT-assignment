console.log("Script");


function switchInputText(){
    let inputFrom = (<HTMLInputElement>document.getElementById("inputFrom")).value;
    let inputTo = (<HTMLInputElement>document.getElementById("inputTo")).value;

    if(inputFrom == "" || inputTo == ""){
        alert("fyll in alla fält");
    }else{
        (<HTMLInputElement>document.getElementById("inputFrom")).value = inputTo;
        (<HTMLInputElement>document.getElementById("inputTo")).value = inputFrom;
    }
    
}

window.onload=function(){
    
    (<HTMLInputElement>document.getElementById('switchInputText')).addEventListener('click', switchInputText, true);
}