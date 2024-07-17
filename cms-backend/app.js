const express = require('express')

// imported as documented from Firebase
// https://firebase.google.com/docs/web/alt-setup#node.js-apps
const firebase = require('firebase/app')
require('firebase/auth')
require('firebase/database')

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use( (req, res, next) => {
    // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

firebase.initializeApp(firebaseConfig)

const port = 9000

app.listen(port, () => console.log("App listening at https://localhost:${" + port + "}"))