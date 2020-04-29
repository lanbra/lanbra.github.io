let startLayer = L.tileLayer.provider("BasemapAT.grau");

let map = L.map("map", {
    center: [47.3, 11.5],
    zoom: 8,
    layers: [
        startLayer
    ]
});

let overlay = {
    stations: L.featureGroup(),
    temperature: L.featureGroup(),
    wind: L.featureGroup(),
    snow: L.featureGroup()
}

L.control.layers({
    "BasemapAT.grau": startLayer,
    "BasemapAT": L.tileLayer.provider("BasemapAT"),
    "BasemapAT.highdpi": L.tileLayer.provider("BasemapAT.highdpi"),
    "BasemapAT.terrain": L.tileLayer.provider("BasemapAT.terrain"),
    "BasemapAT.surface": L.tileLayer.provider("BasemapAT.surface"),
    "BasemapAT.orthofoto": L.tileLayer.provider("BasemapAT.orthofoto"),
    "BasemapAT.overlay": L.tileLayer.provider("BasemapAT.overlay"),
    "BasemapAT.orthofoto+overlay": L.layerGroup([
        L.tileLayer.provider("BasemapAT.orthofoto"),
        L.tileLayer.provider("BasemapAT.overlay")
    ])
}, {
    "Wetterstationen Tirol": overlay.stations,
    "Temperatur °C": overlay.temperature,
    "Wind in km/h ":overlay.wind,
    "Neuschnee in cm":overlay.snow
}).addTo(map);

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

let getColor = function(val, ramp) {
    console.log (val,ramp);
    let col = "red";

    for (let i = 0; i < ramp.length; i++) {
        const pair = ramp[i];
        if (val >=pair [0]){
            return col;
        }else {
            col=pair[1];
        }
        // console.log(val,pair);
        }
    return col;
};
let color = getColor(34,COLORS.temperature);
console.log(color);

let drawTemperature = function (jsonData) {
    console.log("aus der Funktion", jsonData);
    L.geoJson(jsonData, {
        filter: function (feature) {
            return feature.properties.LT;
        },
        pointToLayer: function (feature, latlng) {
            let color = getColor(feature.properties.LT, COLORS.temperature);
            console.log(color)
            return L.marker(latlng, {
                title: `${feature.properties.name} (${feature.geometry.coordinates[2]}m)`,
                icon: L.divIcon({
                    html: `<div class="label-temperature" style="background-color:${color}">${feature.properties.LT.toFixed(1)}</div>`,
                    className: "ignore-me" // dirty hack
                })
            })
        }
    }).addTo(overlay.temperature);
};

let drawWind = function(jsonData) {
    //console.log("aus der Funktion", jsonData);
    L.geoJson(jsonData, {
        filter: function(feature) {
            return feature.properties.WG;
        },
        pointToLayer: function(feature, latlng) {
            let kmh = Math.round(feature.properties.WG / 1000 * 3600);
            let color = getColor(kmh,COLORS.wind);
            let rotation = feature.properties.WR;
            return L.marker(latlng, {
                title: `${feature.properties.name} (${feature.geometry.coordinates[2]}m) - ${kmh} km/h`,
                icon: L.divIcon({
                    html: `<div class="label-wind"><i class="fas fa-arrow-circle-up" style="color:${color};transform: rotate(${rotation}deg)"></i></div>`,
                    className: "ignore-me" // dirty hack
                })
            })
        }
    }).addTo(overlay.wind);
};

let drawSnow = function (jsonData) {
    console.log("aus der Funktion", jsonData);
    L.geoJson(jsonData, {
        filter: function (feature) {
            return feature.properties.HS;
        },
        pointToLayer: function (feature, latlng) {
            let color = getColor(feature.properties.HS, COLORS.snow);
            console.log(color)
            return L.marker(latlng, {
                title: `${feature.properties.name} (${feature.geometry.coordinates[2]}m)`,
                icon: L.divIcon({
                    html: `<div class="label-temperature" style="background-color:${color}">${feature.properties.LT.toFixed(1)}</div>`,
                    className: "ignore-me" // dirty hack
                })
            })
        }
    }).addTo(overlay.temperature);
};

aws.on("data:loaded", function() {
    //console.log(aws.toGeoJSON());
    drawTemperature(aws.toGeoJSON());
    drawWind(aws.toGeoJSON());
    map.fitBounds(overlay.stations.getBounds());

    overlay.wind.addTo(map);

    //console.log(COLORS);
});