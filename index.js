import { generateMap } from "./map.js";
import { fetchComponent } from "./fetch.js";
import { createTable } from "./table.js";
import { createLogin } from "./login.js";
import { createRegister } from "./register.js";
let aggiungiIncidente = document.querySelector("#aggiungiIncidente");
const apiTokenLocation = "pk.215a9e370a8ded2ada287a67d2b90aaf";
const btnInvia=document.querySelector("#prenotaButton")//bottone per inviare l'indirizzo
const indirizzo=document.querySelector("#idIndirizzo");//campo i testo dove inserire l'indirizzo
const data1=document.getElementById("idData");//campo i testo dove inserire l'indirizzo
const ora=document.getElementById("idOra");
const morti=document.getElementById("idMorti");//campo i testo dove inserire l'indirizzo
const feriti=document.getElementById("idFeriti");//campo i testo dove inserire l'indirizzo
const table = createTable(document.querySelector("#tabella"));
let cerca = document.querySelector("#cerca")
let filtra = document.querySelector("#filtra")
const login = createLogin();
const register = createRegister();
let map = generateMap();
let array = [];
let fetchC = fetchComponent();
document.querySelector("#aggiungiIncidente").classList.add("hidden")
console.log(login.isLogged())

fetchC.build("01aeec9c-9533-46c4-85e1-dfc449335c90f");
function isValidDate(inputDate) {

    const [year, month, day] = inputDate.split('-').map(Number);
    
    const inputDateObj = new Date(year, month - 1, day); 
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); 


    if (inputDateObj < today) {
        return true
    } else if (inputDateObj > today) {
        return false
    } else {
       return true
    }
}

fetchC.getData("incidenti").then(res =>{
    res =res.filter(item => isValidDate(item.dataInc));
    map.addAllPlaces(res)
    map.build();
    map.render();
    array=map.getPlaces();
    let tmp =[];
    array.forEach(e =>{
        tmp.push([e.name,e.dataInc,e.oraInc,e.mortiInc,e.feritiInc])
    })
    table.build(tmp);
    table.render()
})



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
        if(isValidDate(dataIncidente)===true){
        array.push(data);
        let tmp =[];
        array.forEach(e =>{
            tmp.push([e.name,e.dataInc,e.oraInc,e.mortiInc,e.feritiInc])
        })
        table.build(tmp);
        table.render()
        
        console.log(data);
        indirizzo.value="";
        ora.value=""
        morti.value="";
        feriti.value=""
        data1.value=""

        map.addPlace(data)
        map.render();
       // array =  array.filter((item, index) => array.indexOf(item) === index);
       
        fetchC.setData("incidenti",array);
    }else{
        indirizzo.value="";
        ora.value=""
        morti.value="";
        feriti.value=""
        data1.value=""
    }
        
    });
}
function filterTable(query) {
    const filteredData = map.getPlaces().filter(place => 
        place.name.toLowerCase().includes(query)
    );
    let tmp =[];
    filteredData.forEach(e =>{
        tmp.push([e.name,e.dataInc,e.oraInc,e.mortiInc,e.feritiInc])
    })
    console.log(filteredData)
    console.log(map.getPlaces())
    table.setData(tmp)
    table.render(); // Aggiorna la tabella con i dati filtrati
}
filtra.onclick=()=>{
    let inp = cerca.value.toLowerCase();
    console.log(inp)
    filterTable(inp);
}
