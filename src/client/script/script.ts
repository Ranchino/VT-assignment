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
    getDate();
}

// Test

document.addEventListener('DOMContentLoaded', function () {

    document.body.addEventListener("submit", async function(event) {

        event.preventDefault();


        const response = await fetch('/api/getTrips', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify({  }),
            headers: {
                'Content-Type': 'application/json'
            } // body data type must match "Content-Type" header
        });
        const json = await response.json();
      
    });
})

function getDate(){
    var today: any = new Date();
    var dd: any = today.getDate();
    var mm: any = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var hour = today.getHours();
    var minute = today.getMinutes();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    }
    
    if(hour<10){
        hour = '0'+hour
    }

    if(minute<10){
        minute = '0'+minute
    }

    today = yyyy + '-' + mm + '-' + dd;
    console.log(today);
    (<HTMLInputElement>document.getElementById("dateForTrip")).value = today;

    var time = hour + ":" + minute;
    console.log(time);
    (<HTMLInputElement>document.getElementById("timeForTrip")).value = time;
}
