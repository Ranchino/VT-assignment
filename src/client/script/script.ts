const inputFrom = document.getElementById('inputFrom') as HTMLInputElement;
const searchResultContainer = document.getElementById("searchResultsContainer") as HTMLElement

inputFrom.addEventListener("input", async function(){ 

    if (inputFrom.value.length >= 2) {
        const response = await fetch('/api/location', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify({ searchValue: inputFrom.value }),
            headers: {
                'Content-Type': 'application/json'
            } // body data type must match "Content-Type" header
        });
        const json = await response.json();
        printSearchResults(json)
    }

    if (!inputFrom.value) {
        searchResultContainer.innerHTML = "";
    }
   
});

function printSearchResults(results: any) {
    searchResultContainer.innerHTML = "";
    for (var i = 0; i < results.length; i++) {
        const li = document.createElement('li')
        li.setAttribute("onclick", "chooseLocation(event)")
        li.innerHTML = results[i].hallplats
        searchResultContainer.appendChild(li)
    }
}

function chooseLocation(event: Event) {
    inputFrom.value = (<HTMLInputElement>event.target).innerHTML
    searchResultContainer.innerHTML = "";
}
