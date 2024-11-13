import { generateMap } from "./map.js";
import { fetchComponent } from "./fetch.js";
import { createTable } from "./table.js";

let aggiungiIncidente = document.querySelector("#aggiungiIncidente");
const apiTokenLocation = "pk.215a9e370a8ded2ada287a67d2b90aaf";
const btnInvia=document.querySelector("#prenotaButton")//bottone per inviare l'indirizzo
const indirizzo=document.querySelector("#idIndirizzo");//campo i testo dove inserire l'indirizzo
const data1=document.getElementById("idData");//campo i testo dove inserire l'indirizzo
const ora=document.getElementById("idOra");
const morti=document.getElementById("idMorti");//campo i testo dove inserire l'indirizzo
const feriti=document.getElementById("idFeriti");//campo i testo dove inserire l'indirizzo
let map = generateMap();
let fetchC = fetchComponent();
fetchC.build("cb6e2971-c0e8-4b36-99a3-4792429bab2f");
map.build();
/*fetchC.getData("places").then(res =>{
    map.addAllPlaces(res)
    map.render();
})*/
map.render();

btnInvia.onclick=()=>{
    let url ="https://us1.locationiq.com/v1/search?key="+apiTokenLocation+"&q=%LOCATION, Milano&format=json&";
    let street = indirizzo.value;
    let dataIncidente=data1.value;
    let oraIncidente=ora.value;
    let mortiIncidenti=morti.value;
    let feritiIncidenti=feriti.value;
    url = url.replace("%LOCATION",street)
    console.log(url);
    fetch(url)
    .then(data => data.json())
    .then(result => {
        //console.log(result);
        let name = result[0].display_name
        let lat = result[0].lat
        let lon = result[0].lon
       

        let data = {
            name : name,
            coords : [lat,lon],
            dataInc : dataIncidente,
            oraInc : oraIncidente,
            mortiInc : mortiIncidenti,
            feritiInc : feritiIncidenti
        }

        console.log(data);
        indirizzo.value="";
        map.addPlace(data)
        map.render();
        //fetchC.setData("places",map.getPlaces());
        
    });
}
