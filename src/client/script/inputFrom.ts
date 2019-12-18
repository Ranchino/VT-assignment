const inputFrom = document.getElementById('inputFrom') as HTMLInputElement;
const searchResultFrom = document.getElementById("searchResultFrom") as HTMLElement

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
        printSearchResultsFrom(json)
    }

    if (!inputFrom.value) {
        searchResultFrom.innerHTML = "";
    }
   
});

function printSearchResultsFrom(results: any) {
    searchResultFrom.innerHTML = "";
    for (var i = 0; i < results.length; i++) {
        const pElement = document.createElement('p')
        pElement.setAttribute("onclick", "chooseLocationFrom(event)")
        pElement.dataset.id = results[i].id;
        pElement.innerHTML = results[i].hallplats;
        searchResultFrom.appendChild(pElement);
    }
}

function chooseLocationFrom(event: Event) {
    inputFrom.dataset.id = (<HTMLInputElement>event.target).dataset.id
    inputFrom.value = (<HTMLInputElement>event.target).innerHTML
    searchResultFrom.innerHTML = "";
}
