export const generateMap = () => {
    let places = [
       {
          name: "Piazza del Duomo",
          coords: [45.4639102, 9.1906426],
          dataInc : "27-02-2024",
          oraInc : "8:20",
          mortiInc : 4,
          feritiInc : 4
       }
    ];
 
    
    const zoom = 12;
    const maxZoom = 19;
    let map; 
 
    return {
     
       build: () => {
          map = L.map("map").setView(places[places.length-1].coords, zoom);
       },
 
       //render
       render: () => {
          
          L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
             maxZoom: maxZoom,
             attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          }).addTo(map);
 
          places.forEach((place) => {
             const marker = L.marker(place.coords).addTo(map);
             marker.bindPopup(`<b>${place.name}<br>data: ${place.dataInc}<br>ora: ${place.oraInc}<br>feriti: ${place.feritiInc}<br>morti: ${place.mortiInc}</b>`);
          });
       },
 
 
       addPlace: (place) => {
          places.push(place);
          console.log(places)
       },
       getPlaces: ()=>{
          return places;
       },
       addAllPlaces: (p)=>{
          places = p;
       }
    };
 };
 