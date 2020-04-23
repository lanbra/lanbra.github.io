let startLayer = L.tileLayer.provider("BasemapAT.grau");

let map = L.map("map", {
    layers: [
        startLayer
    ]
});

let overlay = {
    stations: L.featureGroup(),
    temperature: L.featureGroup()
}

L.control.layers({
    "BasemapAT.grau": startLayer,
    "BasemapAT": L.tileLayer.provider("BasemapAT"),
    "BasemapAT.highdpi": L.tileLayer.provider("BasemapAT.highdpi"),
    "BasemapAT.terrain": L.tileLayer.provider("BasemapAT.terrain"),
    "BasemapAT.surface": L.tileLayer.provider("BasemapAT.surface"),
    "BasemapAT.orthofoto": L.tileLayer.provider("BasemapAT.orthofoto"),
    "BasemapAT.overlay": L.tileLayer.provider("BasemapAT.overlay"),
    "BasemapAT.orthofoto+overlay": L.layerGroup(
        L.tileLayer.provider("BasemapAT.orthofoto"),
        L.tileLayer.provider("BasemapAT.overlay")
    ])
}, {
"Wetterstationen Tirol": overlay.stations,
"Temperatur (°C):": overlay.temperature
}).addTo(map

        let awsUrl = "https://aws.openweb.cc/stations";

        let aws = L.geoJson.ajax(awsUrl, {
            filter: function (feature) {
                console.log("Feature in filter:", feature)
                // if (feature.properties.LT < 5) {
                //     return true;
                // } else {
                //     return false;
                // }
                // return feature.properties.LT < 5;
                // return (feature.geometry.coordinates[2] > 3000)
                return feature.properties.LT != null;


            },
            pointToLayer: function (point, latlng) {
                console.log("point: ", point);
                let marker = L.marker(latlng).bindPopup(`
        <h3>${point.properties.name}</h3>
        <h3>Höhe: ${point.geometry.coordinates[2]} m</h3>
        <ul>
        <li>Position:  ${point.geometry.coordinates[0]} ${point.geometry.coordinates[1]}</li>
        <li>Datum: ${point.properties.date}</li>
        <li>Lufttemperatur: ${point.properties.LT} °C</li>
        <li>Windgeschwindigkeit:  ${point.properties.WG} m/s</li>
        <li> Relative Luftfeuchte:${point.properties.RH} %</li>
        <li> Schneehöhe: ${point.properties.HS} cm</li> 
        <li> Grafik Wetterstation: <a href=https://lawine.tirol.gv.at/data/grafiken/1100/standard/tag/${point.properties.plot}.png> ${point.properties.plot} </a></li>
        </ul>`);
                return marker;
            }
        }).addTo(overlay.stations);

        let drawTemperature = function (jsonData) {
            console.log("aus der Funktion", jsonData);
            L.geoJson(jsonData, {
                pointToLayer: function (feature, latlng) {
                    return L.marker(latlng, {
                        title: `${feature.properties.name} (${feature.geomety.coordinates[2]}m)`,
                        icon: L.divIcon({
                            html: `<div>${feature.properties.LT.toFixed(1)} </div>`,
                            className: "ignore-me"
                        })
                    })
                }
            }).addTo(overlay.temperature);
        };

        aws.on("data:loaded", function () {
            console.log(aws.toGeoJson)
            drawTemperature(aws.toGeoJson)
            map.fitBounds(overlay.stations.getBounds());

            overlay.temperature.addTo(map)
        });