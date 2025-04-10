/* Vienna Sightseeing Beispiel */

// Stephansdom Objekt
let stephansdom = {
    lat: 48.208493,
    lng: 16.373118,
    zoom: 14,
    title: "Domkirche St. Stephan",
};

// Karte initialisieren
let map = L.map("map", {
    maxZoom: 19
}
    
).setView([stephansdom.lat, stephansdom.lng], stephansdom.zoom);

// overlays definieren
let overlays = {
    sights: L.featureGroup().addTo(map),
    lines: L.featureGroup().addTo(map),
    stops: L.featureGroup().addTo(map),
    zones: L.featureGroup().addTo(map),
    hotels: L.markerClusterGroup({
        disableClusteringAtZoom: 17
    }).addTo(map),
}


//Layercontrol 
L.control.layers({
    "BasemapAT": L.tileLayer.provider('BasemapAT.basemap').addTo(map),
    "BasemapAT grau": L.tileLayer.provider('BasemapAT.grau').addTo(map),
    "BasemapAT terrain": L.tileLayer.provider('BasemapAT.overlay').addTo(map),
    "BasemapAT Overlay": L.tileLayer.provider('BasemapAT.overlay').addTo(map),
    "BasemapA surface": L.tileLayer.provider('BasemapAT.surface').addTo(map),
    "BasemapAT highdpi": L.tileLayer.provider('BasemapAT.highdpi').addTo(map),
    "BasemapAT orthofoto": L.tileLayer.provider('BasemapAT.orthofoto').addTo(map),

}, {
    "Sehenswürdigkeiten": overlays.sights,
    "Vienna sightseeing Linien": overlays.lines,
    "Vienna sightseeing Haltestellen": overlays.stops,
    "Fußgängerzonen": overlays.zones,
    "Hotels und Unterkünfte": overlays.hotels,
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
        attribution: "Datenquelle: <ahref='https://data.wien.gv.at'>Stadt Wien</a>",
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: L.icon({
                    iconUrl: "icons/photo.png",
                    iconAnchor: [16, 37],
                    popupAnchor: [0, -37]
                })
            });
        },
        onEachFeature: function (feature, layer) {
            //console.log(feature.properties);
            layer.bindPopup(`
         <img src="${feature.properties.THUMBNAIL}" alt="*">
         <h4>${feature.properties.NAME}</h4>
         <address>${feature.properties.ADRESSE}</address>
         <a href="${feature.properties.WEITERE_INF}" target="wien">Website</a>
                `);
        }
    }).addTo(overlays.sights);
}

// Funktion loadLines
async function loadLines(url) {
    //console.log(url);
    let response = await fetch(url);
    let jsondata = await response.json();
    //console.log(jsondata);
    L.geoJSON(jsondata, {
        attribution: "Datenquelle: <ahref='https://data.wien.gv.at'>Stadt Wien</a>",
        style: function (feature) {
            //console.log(feature.properties.LINE_NAME);
            let lineColor;

            if (feature.properties.LINE_NAME == "Yellow Line") {
                lineColor = "#FFDC00";
            } else if (feature.properties.LINE_NAME == "Blue Line") {
                lineColor = "#0074D9";
            } else if (feature.properties.LINE_NAME == "Red Line") {
                lineColor = "#FF4136";
            } else if (feature.properties.LINE_NAME == "Green Line") {
                lineColor = "#2ECC40";
            } else if (feature.properties.LINE_NAME == "Orange Line") {
                lineColor = "#FF851B";
            } else if (feature.properties.LINE_NAME == "Grey Line") {
                lineColor = "#AAAAAA";
            } else {
                lineColor = "#111111";
            }
            return {
                color: lineColor
            }
        }
    }).addTo(overlays.lines);
}

// Funktion loadStops
async function loadStops(url) {
    //console.log(url);
    let response = await fetch(url);
    let jsondata = await response.json();
    //console.log(jsondata);
    L.geoJSON(jsondata, {
        attribution: "Datenquelle: <ahref='https://data.wien.gv.at'>Stadt Wien</a>",
        pointToLayer: function (feature, latlng) {
            console.log(feature.properties);
            return L.marker(latlng, {
                icon: L.icon({
                    iconUrl: `icons/bus_${feature.properties.LINE_ID}.png`,
                    iconAnchor: [16, 37],
                    popupAnchor: [0, -37]
                })
            });
        }
    }).addTo(overlays.stops);
}


// FunktionloadZones
async function loadZones(url) {
    //console.log(url);
    let response = await fetch(url);
    let jsondata = await response.json();
    //console.log(jsondata);
    L.geoJSON(jsondata, {
        attribution: "Datenquelle: <ahref='https://data.wien.gv.at'>Stadt Wien</a>",
        style: function (feature) {
            //console.log(feature);
            return {
                color: "#F012BE",
                weight: 1,
                opacity: 0.4,
                fillOpacity: 0.1,

            }
        }
    }).addTo(overlays.zones);
}

// Fuktion load Hotels
async function loadHotels(url) {
    //console.log(url);
    let response = await fetch(url);
    let jsondata = await response.json();
    //console.log(jsondata);
    L.geoJSON(jsondata, {
        attribution: "Datenquelle: <ahref='https://data.wien.gv.at'>Stadt Wien</a>",
        pointToLayer: function (feature, latlng) {
            //console.log(feature.properties.KATEGORIE_TXT);
            let iconName;
            if (feature.properties.KATEGORIE_TXT == "1*") {
                iconName = "hotel_1stars.png";
            } else if (feature.properties.KATEGORIE_TXT == "2*") {
                iconName = "hotel_2stars.png";
            } else if (feature.properties.KATEGORIE_TXT == "3*") {
                iconName = "hotel_3stars.png";
            } else if (feature.properties.KATEGORIE_TXT == "4*") {
                iconName = "hotel_4stars.png";
            } else if (feature.properties.KATEGORIE_TXT == "5*") {
                iconName = "hotel_5stars.png";
            } else {
                iconName = "hotel_0stars.png";
            }
            // console.log(iconName);

            return L.marker(latlng, {
                icon: L.icon({
                    iconUrl: `icons/${iconName}`,
                    iconAnchor: [16, 37],
                    popupAnchor: [0, -37]
                })
            });

        }
    }).addTo(overlays.hotels);
}

loadSights("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SEHENSWUERDIGOGD&srsName=EPSG:4326&outputFormat=json");
loadLines("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:TOURISTIKLINIEVSLOGD&srsName=EPSG:4326&outputFormat=json")
loadStops("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:TOURISTIKHTSVSLOGD&srsName=EPSG:4326&outputFormat=json");
loadZones("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:FUSSGEHERZONEOGD&srsName=EPSG:4326&outputFormat=json");
loadHotels("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:UNTERKUNFTOGD&srsName=EPSG:4326&outputFormat=json")