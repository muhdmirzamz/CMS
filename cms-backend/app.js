const express = require('express')

// imported as documented from Firebase
// https://firebase.google.com/docs/web/alt-setup#node.js-apps
// const firebase = require('firebase/app')
// require('firebase/auth')
// require('firebase/database')


// the old method doesnt work anymore
// it only works for < firebase v8
// we are using firebase v10
// ---> use the "web modular api" segment <---
// we are essentially taking the "import" statements and converting them to "require" statements
// it's from the same docs
// https://firebase.google.com/docs/auth/web/password-auth#web_2

const { initializeApp } = require('firebase/app')
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth')

const { getDatabase, ref, set } = require('firebase/database')

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

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDO6HDVEAm33kuxMHELfXRgUgOBl8SRJwE",
  authDomain: "cms-project-ef63e.firebaseapp.com",
  projectId: "cms-project-ef63e",
  storageBucket: "cms-project-ef63e.appspot.com",
  messagingSenderId: "926190340917",
  appId: "1:926190340917:web:389002fe0930c8a7a51a7c"
};

initializeApp(firebaseConfig);

const port = 9000

app.get('/test', (req, res) => {
    res.send('hi')
})


app.post('/signup', (req, res) => {

  console.log(req.body.username)
  console.log(req.body.password)

  let email = req.body.username
  let password = req.body.password

  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password).then(userCredential => {
    // Signed in 
    // const user = userCredential.user;

    const userId = userCredential.user.uid
    const userEmail = userCredential.user.email

    const database = getDatabase();
    set(ref(database, 'users/' + userId), {
      email: userEmail
    });

  }).catch(error => {
    // const errorCode = error.code;
    // const errorMessage = error.message;  
    res.status(500).send(error.message)
  })

  res.status(200).send('signed up')
})

app.post('/login', (req, res) => {

  console.log(req.body.username)
  console.log(req.body.password)

  let email = req.body.username
  let password = req.body.password

  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
    // Signed in 
    // const user = userCredential.user;
    
  })
  .catch((error) => {
    // const errorCode = error.code;
    // const errorMessage = error.message;
  });

  res.send('logged in')
})

app.listen(port, () => console.log("App listening at https://localhost:${" + port + "}"))