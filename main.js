/* Vienna Sightseeing Beispiel */

// Stephansdom Objekt
let stephansdom = {
    lat: 48.208493,
    lng: 16.373118,
    zoom: 12,
    title: "Domkirche St. Stephan",
};

// Karte initialisieren
let map = L.map("map").setView([stephansdom.lat, stephansdom.lng], stephansdom.zoom);

// overlays definieren
let overlays = {
 sights: L.featureGroup().addTo(map),
  lines: L.featureGroup().addTo(map),
  stops: L.featureGroup().addTo(map),
  zones: L.featureGroup().addTo(map),  
}


//Layercontrol 
L.control.layers({
"BasemapAT grau": L.tileLayer('https://mapsneu.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png', {
    maxZoom: 19,
    attribution: 'Hintergrundkarte: <a href="https://www.basemap.at">basemap.at</a>'
}).addTo(map)
}, {
"Sehenswürdigkeiten": L.featureGroup().addTo(map),
"Vienna sightseeing Linien": L.featureGroup().addTo(map),
"Vienna sightseeing Haltestellen": L.featureGroup().addTo(map),
"Fußgängerzonen": L.featureGroup().addTo(map),
}).addTo(map);



//Maßstab hinzufügen
L.control.scale({
    imperial: false,
}).addTo(map)


//Sehenswürdigkeiten Standorte in Wien
async function loadSights(url) {
   //console.log(url);
    let response = await fetch(url);
    let jsondata = await response.json();
    //console.log(jsondata);
    L.geoJSON(jsondata, {
        attribution: "Datenquelle: <ahref='https://data.wien.gv.at'>Stadt Wien</a>"
    }).addTo(map);
}

// Funktion loadLines
async function loadLines(url) {
    //console.log(url);
     let response = await fetch(url);
     let jsondata = await response.json();
     //console.log(jsondata);
     L.geoJSON(jsondata, {
         attribution: "Datenquelle: <ahref='https://data.wien.gv.at'>Stadt Wien</a>"
     }).addTo(map);
 }
 
 // Funktion loadStops
 async function loadStops(url) {
    //console.log(url);
     let response = await fetch(url);
     let jsondata = await response.json();
     //console.log(jsondata);
     L.geoJSON(jsondata, {
         attribution: "Datenquelle: <ahref='https://data.wien.gv.at'>Stadt Wien</a>"
     }).addTo(map);
 }
 

 // FunktionloadZones
 async function loadZones(url) {
    //console.log(url);
     let response = await fetch(url);
     let jsondata = await response.json();
     //console.log(jsondata);
     L.geoJSON(jsondata, {
         attribution: "Datenquelle: <ahref='https://data.wien.gv.at'>Stadt Wien</a>"
     }).addTo(map);
 }

 loadSights("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:TOURISTIKLINIEVSLOGD&srsName=EPSG:4326&outputFormat=json");
 loadLines("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:TOURISTIKLINIEVSLOGD&srsName=EPSG:4326&outputFormat=json")
 loadStops("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:TOURISTIKHTSVSLOGD&srsName=EPSG:4326&outputFormat=json");
 loadZones("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:FUSSGEHERZONEOGD&srsName=EPSG:4326&outputFormat=json");
