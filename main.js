let startLayer = L.tileLayer.provider("OpenTopoMap")
let map = L.map("map", {
    center: [0,0],
    zoom: 2,
    layers: [
        startLayer
    ]
});

L.control.layers({
    "OpenTopoMap": startLayer,
    "OpenStreetMap.Mapnik": L.tileLayer.provider("OpenStreetMap.Mapnik"),
    "Esri.WorldImagery": L.tileLayer.provider("Esri.WorldImagery"),
    "Esri.OceanBasemap": L.tileLayer.provider("Esri.OceanBasemap"),
    "Stamen.Watercolor": L.tileLayer.provider("Stamen.Watercolor"),
    "Stamen.Toner": L.tileLayer.provider("Stamen.Toner")
    
}).addTo(map);

L.marker([0,0].addTo(map));

