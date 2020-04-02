let startLayer = L.tileLayer.provider("OpenTopoMap")
let map = L.map("map", {
    center: [0,0],
    zoom: 2,
    layers: [
        startLayer
    ]
});

let circleGroup = l.featureGroup().addTo(map);


L.control.layers({
    "OpenTopoMap": startLayer,
    "OpenStreetMap.Mapnik": L.tileLayer.provider("OpenStreetMap.Mapnik"),
    "Esri.WorldImagery": L.tileLayer.provider("Esri.WorldImagery"),
    "Esri.OceanBasemap": L.tileLayer.provider("Esri.OceanBasemap"),
    "Stamen.Watercolor": L.tileLayer.provider("Stamen.Watercolor"),
    "Stamen.Toner": L.tileLayer.provider("Stamen.Toner")
    
}, {
    "Thematische Darstellung":circleGroup
}).addTo(map);

// L.marker([0,0]).addTo(map);

// // console.log(CONFIRMED);
// for (let i=1; i < CONFIRMED.length; i++) {
//     let row = CONFIRMED [i];
//     // console.log(row[2],row[3]);
//     let val = row[row.length-1];
//     let mrk = L.marker([row[2], row[3]]).addTo(map);
//     mrk.bindPopup(`$(row[0]} $(row[1]}`);

// }

let drawCircles=function(data) {
   



// console.log(CONFIRMED);

// // for-Schleife über alle Arrays der CONFIRMED Einträge:

for (let i = 1; i < CONFIRMED.length; i++) {
     let row = CONFIRMED[i];
     // console.log(row[2],row[3]);
     let reg =`${row[0]} ${row[1]}`;
     let lat = row [2];
     let lng = row [3];
     let val = row[row.length-1];
    //  let mrk = L.marker([lat,lng]).addTo(map);
    //  mrk.bindPopup(`${reg}: ${val}`);
    let s = 0.5;
    let r = Math.sqrt(val*s/Math.PI);
    let circle = L.circleMarker([lat, lng]),{
    radius: r
}).addTo(map);
circle.bindPopup(`${reg}: ${val}`);

