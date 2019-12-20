"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function switchInputText() {
    let inputFrom = document.getElementById("inputFrom").value;
    let inputFromData = document.getElementById("inputFrom").dataset.id;
    let inputTo = document.getElementById("inputTo").value;
    let inputToData = document.getElementById("inputTo").dataset.id;
    if (inputFrom == "" || inputTo == "") {
        alert("fyll in alla fält");
    }
    else {
        document.getElementById("inputFrom").value = inputTo;
        document.getElementById("inputFrom").dataset.id = inputToData;
        document.getElementById("inputTo").value = inputFrom;
        document.getElementById("inputTo").dataset.id = inputFromData;
    }
}
window.onload = function () {
    document.getElementById('switchInputText').addEventListener('click', switchInputText, true);
    getDate();
};
// Test
document.addEventListener('DOMContentLoaded', function () {
    document.body.addEventListener("submit", function (event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            let searchForArrival;
            let date;
            let time;
            const idFrom = document.getElementById("inputFrom");
            const idTo = document.getElementById("inputTo");
            const input = document.getElementById("inlineRadio2");
            const getDate = document.getElementById("dateForTrip");
            const getTime = document.getElementById("timeForTrip");
            date = getDate.value;
            time = getTime.value;
            if (input.checked) {
                searchForArrival = 1;
            }
            const response = yield fetch('/api/getTrips', {
                method: 'POST',
                body: JSON.stringify({
                    searchForArrival: searchForArrival,
                    date: date,
                    time: time,
                    idFrom: idFrom.dataset.id,
                    idTo: idTo.dataset.id,
                }),
                headers: {
                    'Content-Type': 'application/json'
                } // body data type must match "Content-Type" header
            });
            const json = yield response.json();
            printMatchingRoutes(json);
        });
    });
});
function printMatchingRoutes(route) {
    const container = document.getElementById("theJourneyContainer");
    container.innerHTML = "";
    for (var i = 0; i < route[0].length; i++) {
        const isTripArray = Array.isArray(route[0][i].Leg);
        if (!isTripArray) {
            let station = route[0][i];
            if (station.Leg.type !== "WALK") {
                const container = document.getElementById("theJourneyContainer");
                const from = document.createElement("p");
                const to = document.createElement("p");
                const vehicleNumber = document.createElement("h3");
                const showRouteBtn = document.createElement("button");
                const journeyContainer = document.createElement("div");
                journeyContainer.id = station.Leg.id;
                showRouteBtn.innerHTML = "Visa alla hållplatser";
                showRouteBtn.addEventListener("click", (e) => getRoutes(station.Leg.JourneyDetailRef.ref, station.Leg.id));
                vehicleNumber.innerHTML += station.Leg.name;
                from.innerHTML += "Från " + station.Leg.Origin.name;
                to.innerHTML += "Till " + station.Leg.Destination.name;
                container.append(vehicleNumber, from, journeyContainer, to, showRouteBtn);
            }
            else {
                const container = document.getElementById("theJourneyContainer");
                const from = document.createElement("p");
                const to = document.createElement("p");
                const vehicleNumber = document.createElement("h3");
                const journeyContainer = document.createElement("div");
                journeyContainer.id = station.journeyNumber;
                vehicleNumber.innerHTML += station.name;
                from.innerHTML += "Från " + station.Origin.name;
                to.innerHTML += "Till " + station.Destination.name;
                container.append(vehicleNumber, from, journeyContainer, to);
            }
        }
        else {
            for (let [station] of route[0][i].Leg.entries()) {
                if (station.type !== "WALK") {
                    const container = document.getElementById("theJourneyContainer");
                    const from = document.createElement("p");
                    const to = document.createElement("p");
                    const vehicleNumber = document.createElement("h3");
                    const showRouteBtn = document.createElement("button");
                    const journeyContainer = document.createElement("div");
                    journeyContainer.id = station.id;
                    showRouteBtn.innerHTML = "Visa alla hållplatser";
                    showRouteBtn.addEventListener("click", (e) => getRoutes(station.JourneyDetailRef.ref, station.id));
                    vehicleNumber.innerHTML += station.name;
                    from.innerHTML += "Från " + station.Origin.name;
                    to.innerHTML += "Till " + station.Destination.name;
                    container.append(vehicleNumber, from, journeyContainer, to, showRouteBtn);
                }
                else {
                    const container = document.getElementById("theJourneyContainer");
                    const from = document.createElement("p");
                    const to = document.createElement("p");
                    const vehicleNumber = document.createElement("h3");
                    const journeyContainer = document.createElement("div");
                    journeyContainer.id = station.journeyNumber;
                    vehicleNumber.innerHTML += station.name;
                    from.innerHTML += "Från " + station.Origin.name;
                    to.innerHTML += "Till " + station.Destination.name;
                    container.append(vehicleNumber, from, journeyContainer, to);
                }
            }
        }
    }
}
function getRoutes(ref, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('/api/journey', {
            method: 'POST',
            body: JSON.stringify({
                ref: ref,
            }),
            headers: {
                'Content-Type': 'application/json'
            } // body data type must match "Content-Type" header
        });
        const json = yield response.json();
        printAllJourneys(json, id);
    });
}
function printAllJourneys(journeys, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const getTestContainer = document.getElementById(id);
        const container = document.createElement("ul");
        for (var i = 0; i < journeys.length; i++) {
            const li = document.createElement("li");
            li.innerHTML = journeys[i].hallplats + " " + journeys[i].time;
            container.append(li);
        }
        getTestContainer.appendChild(container);
    });
}
function getDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var hour = today.getHours();
    var minute = today.getMinutes();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    if (hour < 10) {
        hour = '0' + hour;
    }
    if (minute < 10) {
        minute = '0' + minute;
    }
    today = yyyy + '-' + mm + '-' + dd;
    console.log(today);
    document.getElementById("dateForTrip").value = today;
    var time = hour + ":" + minute;
    console.log(time);
    document.getElementById("timeForTrip").value = time;
}
