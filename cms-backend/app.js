const express = require('express')

// ---> use the "web modular api" segment <---
// we are essentially taking the "import" statements and converting them to "require" statements
// it's from the same docs
// https://firebase.google.com/docs/auth/web/password-auth#web_2

const { initializeApp } = require('firebase/app')
const { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth')
const { getDatabase, ref, child, get, set, push, update } = require('firebase/database')

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

  }).catch(error => {
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
    res.status(200).send('logged in')
  })
  .catch((error) => {
  });

  res.status(200).send('logged in')
})

app.get('/getPosts', (req, res) => {
  const dbRef = ref(getDatabase());

  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userId = user.uid;
      
      get(child(dbRef, `posts/${userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
    
          res.status(200).send(snapshot.val())
        } else {
          console.log("No data available");
        }
      })
    } else {
      // Handle case where user is not signed in
    }
  });

  

  // res.status(200).send('get request')
})

app.post('/post', (req, res) => {
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userId = user.uid;
      
      const database = getDatabase();

      // we are creating a unique key by "pushing" a new key into the database at the specified path
      const newPostKey = push(child(ref(database), `posts/${userId}`)).key;

      const updates = {}
      updates['posts/' + userId + `/${newPostKey}`] = {
        title: req.body.title,
        body: req.body.body
      };

      update(ref(database), updates)

      res.status(200).send('logged in')
    } else {
      // Handle case where user is not signed in
    }
  });

  
})

app.listen(port, () => console.log("App listening at https://localhost:${" + port + "}"))