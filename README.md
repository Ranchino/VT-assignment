# Vasttrafik( Västtrafik ) Trip Planner

## Technologies used: TypeScript, NodeJS/Express and Axios

### This application uses Västtrafik´s APIs to make requests using Axios. By entering a stop, address or location in both search fields you can get a trip starting from that time. You can also change so that you can determine the time and date but also if you want to arrive at a specific time. In addition, you can swap the values of both input fields with a button, all stops are saved in a JSON file and updated once a day. Also the accesstoken is updated because it is valid for one hour, after that a new one is generated.

#### Instructions to start the project
1. `npm install`
2. `nodemon index.js`
3. `To see the magic, just type localhost:3000 in to your browser`

#### Link to this project: [Vasttrafik-app]()
 

### Krav för godkänt:
1. Ni skall använda er av Västtrafiks auth 2 autentisering.  <br>
2. Uppdatering av access_token skall göras automatiskt då giltighetstiden för en token gått ut (tips, använd er av en egen-skapad middleware).<br>
3. Autentiseringen skall gå genom ett eget api i Node (för G-nivå räcker det att ha ett API/NodeJS server som levererar en access_token).<br> 
4. Samtliga hållplatser skall hämtas och sparas i en JSON-fil. Denna hämtning skall alltså inte ske varje gång man skall söka fram en resa.<br>
5. Användaren skall med hjälp av två input-fält kunna ange ”från och till” för en resa (hållplatser).<br> 
6. Användaren skall kunna mata in datum och tid samt kunna välja om tiden är för avgående tid eller ankommande tid (när man vill anlända till destinationen eller när ex. Bussen lämnar hållplatsen).<br>
7. Samtliga hållplatser den hittade rutten kommer stanna på skall visas upp vid hittad resa.

### Krav för väl godkänt:
1. Alla punkter för godkänt är uppfyllda <br>
2. Alla anrop som görs till Västtrafiks API skall gå igenom en egen-skapad NodeJS server.<br>
3. Vid sökning av en resa skall de tre nästkommande resorna (som passar in på sökningen) visas. Samtliga av de visade resorna skall visa alla dess stop med tid för varje stop (när ex bussen anländer till varje hållplats i rutten).<br>
4. Eventuella förseningar skall visas upp för alla resor.<br>
5. Användaren skall kunna filtrera sin sökning på resetyp (buss, spårvagn, tåg, båt osv.)<br>
6. Det skall finnas en automatisering så att alla hållplatser hämtas på nytt vid specifika tidpunkter (servern hämtar alla      hållplatser och sparar dem i JSON-filen en gång om dagen).<br>


## Developers

[Sebastian Johansson](https://www.linkedin.com/in/sebastian-johansson-3a692617b/) <br>
[Anel Poturovic](https://www.linkedin.com/in/anel-poturovic-5700a2184/) <br>
[Ranj Bahadin](https://www.linkedin.com/in/ranj-bahadin-764a69131/) <br>
[David Yan](https://www.linkedin.com/in/david-yan97/)
