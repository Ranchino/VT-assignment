console.log("Script");

/* import axios from 'axios'

axios.get("/reger") */
async function initSite(){
    (<HTMLInputElement>document.getElementById('switchInputText')).addEventListener('click', switchInputText, true);
    const response = await fetch('http://localhost:3000/api/json', { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    getDate()
}

function switchInputText(){
    let inputFrom = (<HTMLInputElement>document.getElementById("inputFrom")).value;
    let inputFromData = (<HTMLInputElement>document.getElementById("inputFrom")).dataset.id;

    let inputTo = (<HTMLInputElement>document.getElementById("inputTo")).value;
    let inputToData = (<HTMLInputElement>document.getElementById("inputTo")).dataset.id;


    if(inputFrom == "" || inputTo == ""){
        alert("fyll in alla fält");
    }else{
        (<HTMLInputElement>document.getElementById("inputFrom")).value = inputTo;
        (<HTMLInputElement>document.getElementById("inputFrom")).dataset.id = inputToData;


        (<HTMLInputElement>document.getElementById("inputTo")).value = inputFrom;
        (<HTMLInputElement>document.getElementById("inputTo")).dataset.id = inputFromData;

    }
    
}

// Test

document.addEventListener('DOMContentLoaded', function () {

    document.body.addEventListener("submit", async function(event) {

        event.preventDefault();

        let searchForArrival;
        let date;
        let time;

        const idFrom = document.getElementById("inputFrom") as HTMLInputElement;
        const idTo = document.getElementById("inputTo") as HTMLInputElement;
        
        const input = document.getElementById("inlineRadio2") as HTMLInputElement;

        const getDate = document.getElementById("dateForTrip") as HTMLInputElement;
        const getTime = document.getElementById("timeForTrip") as HTMLInputElement;
        date = getDate.value
        time = getTime.value
        
        if (input.checked) {
            searchForArrival = 1
        }

        const response = await fetch('/api/getTrips', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify(
                {  
                    searchForArrival: searchForArrival,
                    date: date,
                    time: time,
                    idFrom: idFrom.dataset.id,
                    idTo: idTo.dataset.id,
                }
            ),
            headers: {
                'Content-Type': 'application/json'
            } // body data type must match "Content-Type" header
        });
        const json = await response.json();
        console.log(json)
    
    });
})

function printMatchingRoutes(route: any) {
    for (var i = 0; i < route.Trip.length; i++) {
        if (i === 3) {
            break
        }
        console.log(route.Trip[i])
        const container = document.getElementById("theJourneyContainer")!;
        const h3 = document.createElement("h3");
        const p = document.createElement("p");
        h3.innerHTML = route.Trip[i].Leg.name
        p.innerHTML = "Från " + route.Trip[i].Leg.Origin.name + " <strong>" + route.Trip[i].Leg.Origin.time + "</strong>";
        container.append(h3, p)

    }
}

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
