// alert("Hello World");
// let message = "Hello World";
// alert(message);
// message = "Hallo Welt";

const LINK_COLOR = "ff0000";
console.log("Link bitte in der Farbe ", LINK_COLOR);

let highscore = 520233;
console.log(highscore)

let firstname = "Laura";
let lastname = 'Brandstetter';
console.log("Name: ", firstname, lastname);

let fullname = 'Jeffrey "The Dude" Lebowski';
console.log(fullname);

let template = `Dein Highscore ist ${highscore} Punkte`;
console.log (template);

let isover18 = true;
console.log(isover18);

let age = 17;
console.log("über 18?", age > 18);

let participants = [ "John", "jane", "max"];
console.log(participants);
console.log("Einträge im Array: ", participants.length);
console.log(participants[2]);

let gameHighscores = [2099, 3948, 4889];
console.log(gameHighscores)

let user = {
    firstname: "John",
    lastname: "Smith",
    age: 25

};

console.log(user);
console.log(user.firstname);
user.highscore = 200; // hier wird der Wert hinzugefügt
console.log(user);
user["highscore ever"] = 400 // Schlüssel mit Leerzeichen kann console nicht schreiben, deshalb spez Schreibweise folgendermaßen
console.log(user);

let a = 2;
let b = 4;
console.log(a+b);
console.log(b/(a-1));

// let myAge = prompt("Wie alt bist du?"); 
// console.log(`Du bist ${myAge} Jahre alt`); // damit die Rechnung auch wirklich ausgeführt wird `${myAge} > 18` würde nicht gehen
// console.log(`über 18?`, myAge > 18);

// if (myAge > 18) {
//     console.log("Glückwunsch über 18");
// } else {
//     console.log("Leider unter 18")
// }

// Schleifen: for Schleife

for (let i=0; i<10; i++) {
    console.log(`Schleife ${i}`);
}

for(let j = 0; j< participants.length; j++) {
    const participant = participants [j];
    console.log(`Teilnehmer*in ${j} ${participant}`);
    
}

participants.forEach(participant => {
    console.log(`Teilnehmer*in ${participant}`);
});

// Funktionen

function showAge (birthyear) {
    console.log(`DU bist ca. ${2020- birthyear} Jahre alt.`);

}

showAge(1999);

function calcAge(birthyear) {
    return 2020 - birthyear;
}

console.log(`max ist ${calcAge(1999)} Jahre alt`)

let birthYears= [ 1995, 1939, 1563, 1536];
console.log(birthYears)

birthYears.forEach(year => {
    console.log(`Geboren ${year}, heue ca ${calcAge(year)}Jahre alt`)
});

let users = [
    { firstname: "John", lastname: "Smith", birthyear: 1993},
    { firstname: "Jane", lastname: "Smith", birthyear: 1983}
];
console.log(users);

users.forEach(user => {
    console.log(`${user.firstname} ist oder wird heuer ${calcAge(user.birthyear)} Jahre alt`);
});

let firstParagraph = document.querySelector("#pFirst")
console.log(firstParagraph);
// first paragraph remove
firstParagraph.innerHTML="Test";
firstParagraph.style.color = "red"

let indentParas = document.querySelector(".indent");
console.log(indentParas);
indentParas.innerHTML = "Test2";
indentParas.forEach((para, index => {
    console.log(`Data attribut ${para.dataset.lat}`)
    para.innerHTML = `Absatz ${index}`;
    if (index % 2 == 0) {
        para.style.color = "red";
    } else {
        para.style.color = "blue"
    }
}))