let startLayer = L.tileLayer.provider("BasemapAT.terrain");

let map = L.map("map", {
    center: [47.25, 11.5],
    zoom: 9,
    layers: [
        startLayer
    ]
});

let overlay = {
    adlerblicke: L.featureGroup(),
    etappen: L.featureGroup(),
    einkehr: L.featureGroup()
};

L.control.layers({
    "BasemapAT.grau": L.tileLayer.provider("BasemapAT.grau"),
    "BasemapAT": L.tileLayer.provider("BasemapAT"),
    "BasemapAT.highdpi": L.tileLayer.provider("BasemapAT.highdpi"),
    "BasemapAT.terrain": startLayer,
    "BasemapAT.surface": L.tileLayer.provider("BasemapAT.surface"),
    "BasemapAT.orthofoto": L.tileLayer.provider("BasemapAT.orthofoto"),
    "BasemapAT.overlay": L.tileLayer.provider("BasemapAT.overlay"),
    "BasemapAT.orthofoto+overlay": L.layerGroup([
        L.tileLayer.provider("BasemapAT.orthofoto"),
        L.tileLayer.provider("BasemapAT.overlay")
    ])
}, {
    "Adlerblicke": overlay.adlerblicke,
    "Etappen": overlay.etappen,
    "Einkehrmöglichkeiten": overlay.einkehr
}).addTo(map);

// console.log(ETAPPEN);
// console.log(ADLERBLICKE);

for (const blick of ADLERBLICKE) {
    console.log(blick);
    let mrk = L.marker([blick.lat, blick.lng], {
        icon: L.icon({
            iconSize: [32, 37],
            iconAnchor: [16, 37],
            popupAnchor: [0, -37],
            iconUrl: "icons/panoramicview.png"
        })
    }).addTo(overlay.adlerblicke);
    L.marker([blick.lat, blick.lng]).addTo(map);
    mrk.bindPopup(`Standort ${blick.standort} (${blick.seehoehe}m)`);
}
overlay.adlerblicke.addTo(map);

for (const huette of EINKEHR) {
    console.log(huette);
    let marker = L.marker([huette.lat, huette.lng], {
        icon: L.icon({
            iconSize: [32, 37],
            // iconAnchor: [16, 37],
            popupAnchor: [0, -37],
            iconUrl: "icons/restaurant.png"
        })
    }).addTo(overlay.einkehr);
    L.marker([huette.lat, huette.lng]).addTo(map);
    marker.bindPopup(`${huette.name}`);
}
overlay.einkehr.addTo(map);

let drawEtappe = function (nr) {
    overlay.etappen.clearLayers();

    //console.log(ETAPPEN[nr].track);
    let track = ETAPPEN[nr].track.replace("A", "");

    let gpx = new L.GPX(`gpx/AdlerwegEtappe${track}.gpx`, {
        async: true,
        marker_options: {
            startIconUrl: `icons/number_${nr}.png`,
            endIconUrl: "icons/finish.png",
            shadowUrl: null,
            iconSize: [32, 37],
            iconAnchor: [16, 37],
            popupAnchor: [0, -37]
        },
        polyline_options: {
            color: "black",
            dashArray: [2, 5]
        }
    });

    gpx.on("loaded", function (evt) {
        map.fitBounds(evt.target.getBounds());
    }).addTo(overlay.etappen);
    overlay.etappen.addTo(map);

    for (const key in ETAPPEN[nr]) {
        console.log("schau mal", key);
        let val = ETAPPEN[nr][key];
        console.log("schau mal 2:", key, val)
        if (key == "einkehr") {
            val = ETAPPEN[nr][key].replace(/#/g, ", ");
        }
        console.log(`et-${key}`);
        let elem = document.querySelector(`#et-${key}`);
        console.log("elem:", elem)
        if (elem) {
            if (key == "track") {
                let gpx = `<a id="et-track" href="/adlerweg_template/gpx/AdlerwegEtappe${track}.gpx" download="">Download Etappe (GPX-Datei)</a>`
                elem.outerHTML = gpx;
            }
            elem.innerHTML = val
        }
    }
};
drawEtappe(1);


let pulldown = document.querySelector("#pulldown");
//console.log(pulldown);

for (let i = 1; i < ETAPPEN.length; i++) {
    const etappe = ETAPPEN[i];
    //console.log(etappe);
    pulldown.innerHTML += `<option value="${i}">${etappe.titel}</option>`;
}
pulldown.onchange = function (evt) {
    let nr = evt.target.options[evt.target.options.selectedIndex].value;
    //console.log(nr);
    drawEtappe(nr);
}