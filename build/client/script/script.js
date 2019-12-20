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
console.log("Script");
/* import axios from 'axios'

axios.get("/reger") */
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
            console.log(json);
        });
    });
});
function printMatchingRoutes(route) {
    for (var i = 0; i < route.Trip.length; i++) {
        if (i === 3) {
            break;
        }
        console.log(route.Trip[i]);
        const container = document.getElementById("theJourneyContainer");
        const h3 = document.createElement("h3");
        const p = document.createElement("p");
        h3.innerHTML = route.Trip[i].Leg.name;
        p.innerHTML = "Från " + route.Trip[i].Leg.Origin.name + " <strong>" + route.Trip[i].Leg.Origin.time + "</strong>";
        container.append(h3, p);
    }
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
