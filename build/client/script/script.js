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
const inputFrom = document.getElementById('inputFrom');
const inputTo = document.getElementById('inputTo');
const searchResultFrom = document.getElementById("searchResultFrom");
const searchResultTo = document.getElementById("searchResultTo");
inputFrom.addEventListener("input", function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (inputFrom.value.length >= 2) {
            const response = yield fetch('/api/location', {
                method: 'POST',
                body: JSON.stringify({ searchValue: inputFrom.value }),
                headers: {
                    'Content-Type': 'application/json'
                } // body data type must match "Content-Type" header
            });
            const json = yield response.json();
            printSearchResultsFrom(json);
        }
        if (!inputFrom.value) {
            searchResultFrom.innerHTML = "";
        }
    });
});
inputTo.addEventListener("input", function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (inputTo.value.length >= 2) {
            const response = yield fetch('/api/location', {
                method: 'POST',
                body: JSON.stringify({ searchValue: inputTo.value }),
                headers: {
                    'Content-Type': 'application/json'
                } // body data type must match "Content-Type" header
            });
            const json = yield response.json();
            printSearchResultsTo(json);
        }
        if (!inputTo.value) {
            searchResultTo.innerHTML = "";
        }
    });
});
function printSearchResultsFrom(results) {
    searchResultFrom.innerHTML = "";
    for (var i = 0; i < results.length; i++) {
        const pElement = document.createElement('p');
        pElement.setAttribute("onclick", "chooseLocation(event)");
        pElement.innerHTML = results[i].hallplats;
        searchResultFrom.appendChild(pElement);
    }
}
function printSearchResultsTo(results) {
    searchResultTo.innerHTML = "";
    for (var i = 0; i < results.length; i++) {
        const pElement = document.createElement('p');
        pElement.setAttribute("onclick", "chooseLocation(event)");
        pElement.innerHTML = results[i].hallplats;
        searchResultTo.appendChild(pElement);
    }
}
function chooseLocation(event) {
    inputFrom.value = event.target.innerHTML;
    searchResultFrom.innerHTML = "";
}
