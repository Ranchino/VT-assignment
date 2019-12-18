
const inputTo = document.getElementById('inputTo') as HTMLInputElement;
const searchResultTo = document.getElementById("searchResultTo") as HTMLElement


inputTo.addEventListener("input", async function(){ 
    if (inputTo.value.length >= 2) {
        const response = await fetch('/api/location', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify({ searchValue: inputTo.value }),
            headers: {
                'Content-Type': 'application/json'
            } // body data type must match "Content-Type" header
        });
        const json = await response.json();
        printSearchResultsTo(json)
    }

    if (!inputTo.value) {
        searchResultTo.innerHTML = "";
    }
   
});

function printSearchResultsTo(results: any) {
    searchResultTo.innerHTML = "";
    for (var i = 0; i < results.length; i++) {
        const pElement = document.createElement('p')
        pElement.setAttribute("onclick", "chooseLocationFrom(event)")
        pElement.innerHTML = results[i].hallplats
        searchResultTo.appendChild(pElement)
    }
}

function chooseLocationFrom(event: Event) {
    inputTo.value = (<HTMLInputElement>event.target).innerHTML
    searchResultTo.innerHTML = "";
}
