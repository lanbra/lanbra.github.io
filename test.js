let drawCircles = function (data) {
    for (let i = 1; i < data.length; i++) {
        let row = data[i];
        // console.log(row[2],row[3]);
        let reg = `${row[0]} ${row[1]}`;
        let lat = row[2];
        let lng = row[3];
        let val = row[row.length - 1];
        // let mrk = L.marker([lat,lng]).addTo(map);
        // mrk.bindPopup(`${reg}: ${val}`);

        // A = r²*PI
        // r² = A/PI
        // r = WURZEL(A/PI)
        let s = 0.2
        let r = Math.sqrt(val * s / Math.PI);
        let circle = L.circleMarker([lat, lng], {
            radius: r
        }).addTo(circleGroup);
        circle.bindPopup(`${reg}: ${val}`);
    }
};