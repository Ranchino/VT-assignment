
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

window.onload=function(){
    
    (<HTMLInputElement>document.getElementById('switchInputText')).addEventListener('click', switchInputText, true);
    getDate();
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
        printMatchingRoutes(json);
    
    });
})

function printMatchingRoutes(route: any) {
    const container = document.getElementById("theJourneyContainer")!;
    container.innerHTML = "";
    for (var i = 0; i < route[0].length; i++) {
        const isTripArray = Array.isArray(route[0][i].Leg);

        if (!isTripArray) {
            let station = route[0][i];
              
                if (station.Leg.type !== "WALK") {
                    const container = document.getElementById("theJourneyContainer")!;
                    const from = document.createElement("p");
                    const to = document.createElement("p");
                    const vehicleNumber = document.createElement("h3");
                    const showRouteBtn = document.createElement("button");
                    const journeyContainer = document.createElement("div");
                    journeyContainer.id = station.Leg.id;
                   
                    showRouteBtn.innerHTML = "Visa alla hållplatser"
                    showRouteBtn.addEventListener("click", (e:Event) => getRoutes(station.Leg.JourneyDetailRef.ref, station.Leg.id));
                    vehicleNumber.innerHTML += station.Leg.name;
                    from.innerHTML += "Från " + station.Leg.Origin.name;
                    to.innerHTML += "Till " + station.Leg.Destination.name; 
                    container.append(vehicleNumber, from, journeyContainer, to, showRouteBtn)


                } else {
                    const container = document.getElementById("theJourneyContainer")!;
                    const from = document.createElement("p");
                    const to = document.createElement("p");
                    const vehicleNumber = document.createElement("h3");
                    const journeyContainer = document.createElement("div");
                    journeyContainer.id = station.journeyNumber;
                   
                    vehicleNumber.innerHTML += station.name;
                    from.innerHTML += "Från " + station.Origin.name;
                    to.innerHTML += "Till " + station.Destination.name; 
                    container.append(vehicleNumber, from, journeyContainer, to)

                }

        } else {
            for (let [station] of route[0][i].Leg.entries()) {

                if (station.type !== "WALK") {
                    const container = document.getElementById("theJourneyContainer")!;
                    const from = document.createElement("p");
                    const to = document.createElement("p");
                    const vehicleNumber = document.createElement("h3");
                    const showRouteBtn = document.createElement("button");
                    const journeyContainer = document.createElement("div");
                    journeyContainer.id = station.id;
                   
                    showRouteBtn.innerHTML = "Visa alla hållplatser"
                    showRouteBtn.addEventListener("click", (e:Event) => getRoutes(station.JourneyDetailRef.ref, station.id));
                    vehicleNumber.innerHTML += station.name;
                    from.innerHTML += "Från " + station.Origin.name;
                    to.innerHTML += "Till " + station.Destination.name; 
                    container.append(vehicleNumber, from, journeyContainer, to, showRouteBtn)


                } else {
                    const container = document.getElementById("theJourneyContainer")!;
                    const from = document.createElement("p");
                    const to = document.createElement("p");
                    const vehicleNumber = document.createElement("h3");
                    const journeyContainer = document.createElement("div");
                    journeyContainer.id = station.journeyNumber;
                   
                    vehicleNumber.innerHTML += station.name;
                    from.innerHTML += "Från " + station.Origin.name;
                    to.innerHTML += "Till " + station.Destination.name; 
                    container.append(vehicleNumber, from, journeyContainer, to)

                }
            }
            
        }
    }
}

async function getRoutes(ref: any, id: any) {
    const response = await fetch('/api/journey', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(
            {  
                ref: ref,
            }
        ),
        headers: {
            'Content-Type': 'application/json'
        } // body data type must match "Content-Type" header
    });
    const json = await response.json();
    printAllJourneys(json, id)
}

async function printAllJourneys(journeys: any, id: any) {
    const getTestContainer = document.getElementById(id)!;
    const container = document.createElement("ul");
    for (var i = 0; i < journeys.length; i++) {
    
        const li = document.createElement("li");
        li.innerHTML = journeys[i].hallplats + " " + journeys[i].time;
        container.append(li)
    }

    getTestContainer.appendChild(container)
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
