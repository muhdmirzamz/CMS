const express = require('express')

// imported as documented from Firebase
// https://firebase.google.com/docs/web/alt-setup#node.js-apps
// const firebase = require('firebase/app')
// require('firebase/auth')
// require('firebase/database')


// the old method doesnt work anymore
// it only works for < firebase v8
// we are using firebase v10
// we are essentially taking the "import" statements and converting them to "require" statements
// it's from the same docs
// https://firebase.google.com/docs/auth/web/password-auth#web_2

const { initializeApp } = require('firebase/app')
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth')

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
  }).catch(error => {
    // const errorCode = error.code;
    // const errorMessage = error.message;  
  })

  res.send('signed up')
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