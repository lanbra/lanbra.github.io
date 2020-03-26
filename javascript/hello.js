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