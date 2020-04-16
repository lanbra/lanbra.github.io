/* var mymap = L.map('map').setView([43.803056, 172.967778], 13);

L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>tributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https:/ntopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(mymap); */

// let Karte = document.querySelector("#map");

// let mymap = L.map(Karte).setView([-43.803056, 172.967778], 14);
// L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
//     maxZoom: 17,
//     attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>tributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https:/ntopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
// }).addTo(mymap);

// let marker = L.marker([-43.803056, 172.967778]).addTo(mymap);

<<<<<<< HEAD
// let popup = L.popup()
//     .setLatLng([-43.801056, 172.967778])
//     .setContent("Akaroa Harbour")
//     .openOn(mymap);
=======
let popup = L.popup()
    .setLatLng([-43.801056, 172.967778])
    // .setContent("Akaroa Harbour")
    // .openOn(mymap);

marker.bindPopup("Akaroa").openPopup();
>>>>>>> 496aba4281c128c85fe778b3c5a19b41241762c5

// let circle = L.circle([-43.803056, 172.967778], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.3,
//     radius: 200
// }).addTo(mymap); 

let mapdiv = document.querySelector("#map");
let map = L.map("map", {
    center: [
        mapdiv.dataset.lat,
        mapdiv.dataset.lng
    ],
    zoom: 13,
    zoom: 17,
    layers: [
        L.tileLayer.provider("Stadia.AlidadeSmooth")
        })
    ]
});
let mrk = L.marker([
    mapdiv.dataset.lat,
    mapdiv.dataset.lng
]).addTo(map);
mrk.bindPopup(mapdiv.dataset.title).openPopup();