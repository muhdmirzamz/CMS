const express = require('express')

// ---> use the "web modular api" segment <---
// we are essentially taking the "import" statements and converting them to "require" statements
// it's from the same docs
// https://firebase.google.com/docs/auth/web/password-auth#web_2

const { initializeApp } = require('firebase/app')
const { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth')
const { getDatabase, ref, child, get, set, push, update } = require('firebase/database')

const { apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId, appId } = require('./const.js')

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
  apiKey: apiKey,
  authDomain: authDomain,
  databaseURL: databaseURL,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId
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
    res.status(200).send('signed up')
  }).catch(error => {
    res.status(500).send(error.message)
  })
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
    console.log(`printing errors`)

    // error codes are found in docs: 
    // https://firebase.google.com/docs/reference/js/auth#autherrorcodes
    res.status(500).send('Something went wrong');

  });
})

app.get('/getPosts', (req, res) => {
  const dbRef = ref(getDatabase());

  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userId = user.uid;
      
      get(child(dbRef, `posts/${userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log("[GET POST] data available");
          console.log(snapshot.val());
    
          res.status(200).send(snapshot.val())
        } else {
          console.log("[GET POST] No data available");

          res.status(200).send(snapshot.val())
        }
      })
    } else {
      // Handle case where user is not signed in
    }
  });
})

app.get('/getPostWithId', (req, res) => {
  const dbRef = ref(getDatabase());

  const auth = getAuth();

  const blogPostId = req.query.id

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userId = user.uid;
      
      get(child(dbRef, `posts/${userId}/${blogPostId}`)).then((snapshot) => {
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

      console.log("[POST] POST SUCCESSFUL");

      res.status(200).send('post successful')
    } else {
      // Handle case where user is not signed in
    }
  });
})

app.post('/updatePost', (req, res) => {
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userId = user.uid;
      
      const database = getDatabase();

      // we are creating a unique key by "pushing" a new key into the database at the specified path
      // const newPostKey = push(child(ref(database), `posts/${userId}`)).key;

      const updates = {}
      updates['posts/' + userId + `/${req.body.id}`] = {
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